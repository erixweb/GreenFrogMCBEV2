import { Packet } from "../Packet.mjs"

class Transfer extends Packet {
    name = "transfer"

    /** @type {string | undefined} */
    server_address

    /** @type {number | undefined} */
    port

    write(connection) {
        connection.queue(this.name, {
            server_address: this.server_address,
            port: this.port
        })
    }
}

export { Transfer }
