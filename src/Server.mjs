import { Address } from './network/Address.mjs'
import { Logger } from './logger/Logger.mjs'
import bedrock from 'frog-protocol'

class Server {
    /** @type {Address} */
    address

    /** @type {string} */
    motd

    /** @type {Logger} */
    logger = new Logger("")

    /** @type {import("frog-protocol").Server | undefined} */
    _server

    /**
     * @param {Address} address 
     * @param {string} motd 
     */
    constructor(
        address,
        motd = "A GreenFrog Server"
    ) {
        this.address = address
        this.motd = motd
    }

    listen() {
        Logger.info("Loading...")

        this._server = bedrock.createServer({
            host: this.address.host,
            port: Number(this.address.port),
            motd: {
                motd: this.motd,
                levelName: "GreenFrog"
            }
        })
    }

    shutdown() {
        this._server?.close()
    }
}

export { Server }