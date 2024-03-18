import { Packet } from "../Packet.mjs"

class LevelChunk extends Packet {
    name = "level_chunk"

    /** @type {number | undefined} */
    x

    /** @type {number | undefined} */
    z

    /** @type {number | undefined} */
    sub_chunk_count

    /** @type {boolean | undefined} */
    cache_enabled

    /** @type {Buffer | undefined} */
    payload

    /**
     * @param {import("frog-protocol").Connection} connection
     */
    write(connection) {
        connection.queue(this.name, {
            x: this.x,
            z: this.z,
            sub_chunk_count: this.sub_chunk_count,
            cache_enabled: this.cache_enabled,
            payload: this.payload
        })
    }
}

export { LevelChunk }
