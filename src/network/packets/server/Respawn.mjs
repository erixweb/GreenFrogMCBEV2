import { Math } from "../../../utils/Math.mjs"
import { Packet } from "../Packet.mjs"
import { Vec3 } from "vec3"

class Respawn extends Packet {
	name = "respawn"

	/** @type {Vec3} */
	position = new Vec3(0, 0, 0)

	/** @type {number | undefined} */
	state

	/** @type {string | undefined} */
	runtime_entity_id

	/**
     * @param {import("frog-protocol").Connection} connection 
     */
	write(connection) {
		connection.queue(this.name, {
			position: Math.vec3_to_json(this.position),
			state: this.state,
			runtime_entity_id: this.runtime_entity_id 
		})
	}
}

export { Respawn }