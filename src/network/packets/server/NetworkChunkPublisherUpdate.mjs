import { Packet } from "../Packet.mjs"
import { Vec3 } from "vec3"
import Vec2 from "vec2"

class NetworkChunkPublisherUpdate extends Packet {
	name = "network_chunk_publisher_update"

	/** @type {Vec3} */
	coordinates = new Vec3(0, 0, 0)

	/** @type {number} */
	radius

	/** @type {Vec2[]} */
	saved_chunks = []

	/**
	 * @param {import("frog-protocol").Connection} connection
	 */
	write(connection) {
		connection.queue(this.name, {
			coordinates: this.coordinates,
			radius: this.radius,
			saved_chunks: this.saved_chunks
		})
	}
}

export { NetworkChunkPublisherUpdate }
