import { Math } from "../../../utils/Math.mjs"
import { Packet } from "../Packet.mjs"
import { Vec3 } from "vec3"

class UpdateBlock extends Packet {
    name = "update_block"

    /** @type {Vec3} */
    position = new Vec3(0, 0, 0)

    /** @type {number | undefined} */
    block_runtime_id

    /**
     * @type {{neighbors: boolean, no_graphic: boolean, unused: boolean, priority: boolean, network: boolean}}
     */
    flags = {
        neighbors: false,
        network: true,
        no_graphic: false,
        unused: false,
        priority: false
    }

    /** @type {number | undefined} */
    layer

    /**
     * @param {import("frog-protocol").Connection} connection
     */
    write(connection) {
        connection.queue(this.name, {
            position: Math.vec3_to_json(this.position),
            block_runtime_id: this.block_runtime_id,
            flags: this.flags,
            layer: this.layer
        })
    }
}

export { UpdateBlock }
