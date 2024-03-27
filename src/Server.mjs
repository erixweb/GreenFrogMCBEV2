import { NetworkStackLatency } from './network/packets/client/NetworkStackLatency.mjs'
import { RequestChunkRadius } from './network/packets/client/RequestChunkRadius.mjs'
import { ModalFormResponse } from "./network/packets/client/ModalFormResponse.mjs"
import { PlayerAuthInput } from "./network/packets/client/PlayerAuthInput.mjs"
import { ChatMessageType } from './network/packets/types/ChatMessageType.mjs'
import { EventEmitter, Event } from '@kotinash/better-events'
import { PluginLoader } from './plugins/PluginLoader.mjs'
import { ServerConfig } from './server/ServerConfig.mjs'
import { Text } from './network/packets/client/Text.mjs'
import { Seed } from './network/packets/types/Seed.mjs'
import { Packet } from './network/packets/Packet.mjs'
import { Flat } from "./world/generators/Flat.mjs"
import { EventType } from './events/EventType.mjs'
import { bedrock } from './utils/ProtocolFix.mjs'
import { Language } from './config/Language.mjs'
import { Address } from './network/Address.mjs'
import { Logger } from './logger/Logger.mjs'
import { Player } from './player/Player.mjs'
import { World } from './world/World.mjs'
import { Debug } from './utils/Debug.mjs'

class Server {
    /** @type {Address} */
    address

    /** @type {string} */
    motd

    /** @type {string} */
    name

    /** @type {string} */
    version

    /** @type {import("frog-protocol").Server | undefined} */
    _server

    /** @type {number} */
    max_players

    /** @type {boolean} */
    internal = false

    /** @type {Generator[]} */
    generators = [
        new Flat()
    ]

    /** @type {World[]} */
    worlds = [
        new World(
            "world",
            this.generators[0],
            new Seed(0, 0),
            16
        )
    ]

    /** @type {World} */
    default_world = this.worlds[0]

    /** @type {Player[]} */
    players = []

    /** @type {number} */
    current_tick = 0

    /** @type {string | undefined} */
    gamemode

    /** @type {number | undefined} */
    difficulty

    /** @type {boolean} */
    enable_world = true

    /** @type {Packet[]} */
    #packet_handlers = [
        new NetworkStackLatency(),
        new RequestChunkRadius(),
        new ModalFormResponse(),
        new PlayerAuthInput(),
        new Text()
    ]

    /** @type {PluginLoader} */
    plugin_loader = new PluginLoader()

    /** @type {string} */
    raknet_backend = "raknet-native"

    /**
     * @param {Address} address
     * @param {string} [motd=ServerConfig.get("motd")]
     * @param {string} [name=ServerConfig.get("server_name")]
     * @param {string} [version=ServerConfig.get("version")]
     * @param {string} [gamemode=ServerConfig.get("gamemode")]
     * @param {number} [difficulty=ServerConfig.get_number("difficulty")]
     * @param {number} [max_players=ServerConfig.get_number("max_players")]
     * @param {boolean} [enable_world=ServerConfig.get_boolean("enable_world")]
     * @param {string} [raknet_backend=ServerConfig.get("raknet_backend")]
     * @param {boolean} [internal=false]
     */
    constructor(
        address,
        motd = ServerConfig.get("motd"),
        name = ServerConfig.get("server_name"),
        version = ServerConfig.get("version"),
        gamemode = ServerConfig.get("gamemode"),
        difficulty = ServerConfig.get_number("difficulty"),
        max_players = ServerConfig.get_number("max_players"),
        enable_world = ServerConfig.get_boolean("enable_world"),
        raknet_backend = ServerConfig.get("raknet_backend"),
        internal = false
    ) {
        this.address = address
        this.motd = motd
        this.name = name
        this.version = version
        this.gamemode = gamemode
        this.difficulty = difficulty
        this.max_players = max_players
        this.enable_world = enable_world
        this.raknet_backend = raknet_backend
        this.internal = internal
    }

    listen() {
        Logger.info(Language.get_key("server.starting", [this.name]))

        this._server = bedrock.createServer({
            host: this.address.host,
            port: Number(this.address.port),
            raknetBackend: this.raknet_backend,
            maxPlayers: this.max_players,
            version: this.version,
            motd: {
                motd: this.motd,
                levelName: "GreenFrog"
            }
        })

        this._server.on("connect", (connection) => {
            EventEmitter.emit(
                new Event(
                    EventType.PlayerConnectionInitialized,
                    {
                        connection
                    },
                    (() => {
                        this.#handle_connection(connection)
                    })
                )
            )
        })

        Logger.info(Language.get_key("server.listening", [this.name, this.address.toString()]))
        Logger.info(Language.get_key("server.started", [this.name]))
    }

    #start_ticking() {
        setInterval(() => {
            this.#tick()
        }, ServerConfig.get_number("tick_delay"))
    }

    start() {
        if (!this.internal) this.listen()

        this.default_world.prepare_generator()

        this.plugin_loader.load()

        this.#start_ticking()
    }

    /**
     * Ticks the server
     * Useful for scheduling things without using setInterval()
     */
    #tick() {
        EventEmitter.emit(
            new Event(
                EventType.ServerTick,
                {
                    server: this,
                }
            )
        )
    }

    /**
     * @param {import("frog-protocol").Player} connection 
     */
    #handle_connection(connection) {
        connection.on("join", () => {
            const user_data = connection.getUserData()
            const player = new Player(user_data.displayName, connection, this)

            EventEmitter.emit(
                new Event(
                    EventType.PlayerJoin,
                    {
                        player
                    }
                ),
                false
            )

            if (Debug.is_debug()) {
                connection._queue = connection.queue

                /**
                 * @param {string} name 
                 * @param {object} params 
                 */
                connection.queue = (name, params) => {
                    Logger.debug(`Sent to client ${player.name}: ${name} - ${this.serialize_packet_params(params)}`)

                    connection._queue(name, params)
                }
            }

            connection.on("close", () => {
                player.on_leave()
            })

            connection.on("packet", (packet) => {
                for (const handler of this.#packet_handlers) {
                    if (packet.data.name === handler.name) {
                        EventEmitter.emit(
                            new Event(
                                EventType.PacketReceived,
                                {
                                    connection,
                                    packet
                                }
                            )
                        )

                        handler.read(player, packet)
                    }
                }
            })
        })
    }

    /**
     * @param {string} message
     * @param {string} [type=ChatMessageType.Raw]
     * @param {string} [sender=""]
     * @param {any[]} [parameters=[]]
     */
    broadcast_message(message, type = ChatMessageType.Raw, sender = "", parameters = []) {
        EventEmitter.emit(
            new Event(
                EventType.ServerBroadcast,
                {
                    message,
                    type,
                    sender,
                    parameters
                },
                (() => {
                    Logger.info(message)

                    for (const player of this.players) {
                        player.send_message(message, type, sender, parameters)
                    }
                })
            )
        )
    }

    /**
     * @param {number} time 
     */
    set_time(time) {
        for (const player of this.players) {
            player.set_time(time)
        }
    }

    /**
     * @param {number} difficulty
     */
    set_difficulty(difficulty) {
        for (const player of this.players) {
            player.set_difficulty(difficulty)
        }
    }

    /**
     * @returns {Promise<void>}
     */
    async shutdown() {
        await this._server?.close()
    }

    /**
     * https://github.com/GreenFrogMCBE/Protocol/blob/master/src/datatypes/util.js#L34C21-L34C34
     *
     * @param {object} obj
     * @param {any} fmt
     * @return {string}
     */
    serialize_packet_params(obj = {}, fmt) {
        return JSON.stringify(obj, (k, v) => typeof v === 'bigint' ? v.toString() : v, fmt)
    }
}

export { Server }
