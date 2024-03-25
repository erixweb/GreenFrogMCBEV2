import { Packet } from "../Packet.mjs"
import { Vec3 } from "vec3"

class MoveEntityDelta extends Packet {
    name = "move_entity_delta"

    /** @type {Vec3} */
    coordinates = new Vec3(0, 0, 0)

    /** @type {number | undefined} */
    runtime_entity_id

    /** @type {{force_move: boolean, has_z: boolean, has_y: boolean, has_x: boolean, teleport: boolean, has_rot_x: *, on_ground: boolean, has_rot_y: *, has_rot_z: boolean}} */
    flags = {
        has_x: false,
        has_y: false,
        has_z: false,
        has_rot_x: false,
        has_rot_y: false,
        has_rot_z: false,
        on_ground: false,
        teleport: false,
        force_move: false
    }

    /** @type {Vec3} */
    coordinates_rotation = new Vec3(0, 0, 0)

    /**
     * @param {import("frog-protocol").Connection} connection
     */
    write(connection) {
        connection.queue(this.name, {
            runtime_entity_id: this.runtime_entity_id,
            flags: this.flags,
            x: this.coordinates.x,
            y: this.coordinates.y,
            z: this.coordinates.z,
            rotation_x: this.coordinates_rotation.x,
            rotation_y: this.coordinates_rotation.y,
            rotation_z: this.coordinates_rotation.z,
        })
    }
}

export { MoveEntityDelta }
