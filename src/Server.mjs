import { EventEmitter, Event } from '@kotinash/better-events'
import { EventType } from './events/EventType.mjs'
import { ServerConfig } from './config/Config.mjs'
import { bedrock } from './utils/ProtocolFix.mjs'
import { Language } from './config/Language.mjs'
import { Address } from './network/Address.mjs'
import { Logger } from './logger/Logger.mjs'

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
            this.tick()
        }, 1000)
    }

    start() {
        if (!this.internal) this.listen()

        this.#start_ticking()
    }

    /**
     * Ticks the server
     * Useful for scheduling things without using setInterval()
     */
    tick() {
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
     * @param {import("frog-protocol").Connection} connection 
     */
    #handle_connection(connection) {
        /** @param {import("frog-protocol").Player} player */
        connection.on("join", (player) => {
        })

        connection.on("close", () => {
            // TODO
        })
    }

    shutdown() {
        this._server?.close()
    }
}

export { Server }