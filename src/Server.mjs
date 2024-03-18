import { NetworkStackLatency } from './network/packets/client/NetworkStackLatency.mjs'
import { RequestChunkRadius } from './network/packets/client/RequestChunkRadius.mjs'
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
import { Gamemode } from './player/Gamemode.mjs'
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

    /** @type {Logger} */
    logger = new Logger()

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

    /** @type {Player[]} */
    players = []

    /** @type {number} */
    current_tick = 0

    /** @type {string} */
    gamemode = Gamemode.Fallback

    /** @type {Packet[]} */
    #packet_handlers = [
        new NetworkStackLatency(),
        new RequestChunkRadius(),
        new Text()
    ]

    /** @type {PluginLoader} */
    plugin_loader = new PluginLoader()

    /**
     * @param {Address} address 
     * @param {string} [motd=ServerConfig.get("motd")]
     * @param {string} [name=ServerConfig.get("server_name")]
     * @param {string} [version=ServerConfig.get("version")]
     * @param {number} [max_players=ServerConfig.get("max_players")] 
     * @param {boolean} [internal=false] 
     */
    constructor(
        address,
        motd = ServerConfig.get("motd"),
        name = ServerConfig.get("server_name"),
        version = ServerConfig.get("version"),
        max_players = Number(ServerConfig.get("max_players")),
        internal = false
    ) {
        this.address = address
        this.motd = motd
        this.name = name
        this.version = version
        this.max_players = max_players
        this.internal = internal
    }

    listen() {
        Logger.info(Language.get_key("server.starting", [this.name]))

        this._server = bedrock.createServer({
            host: this.address.host,
            port: Number(this.address.port),
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
    }

    #start_ticking() {
        setInterval(() => {
            this.#tick()
        }, ServerConfig.get("tick_delay"))
    }

    start() {
        if (!this.internal) this.listen()

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

            if (Debug.is_debug()) {
                connection._queue = connection.queue

                /**
                 * @param {string} name 
                 * @param {object} params 
                 */
                connection.queue = (name, params) => {
                    Logger.debug(`Sent to client ${player.name}: ${name} - ${JSON.stringify(params)}`)

                    connection._queue(name, params)
                }
            }

            EventEmitter.emit(
                new Event(
                    EventType.PlayerJoin,
                    {
                        player
                    }
                ),
                false
            )

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
     * @param  {...any} params 
     */
    broadcast_message(...params) {
        const [message, type = ChatMessageType.Raw, sender = "", parameters = []] = params

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

    shutdown() {
        this._server?.close()
    }
}

export { Server }
