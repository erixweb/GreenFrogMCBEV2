import { Packet } from "../Packet.mjs"

class ChunkRadiusUpdate extends Packet {
	name = "chunk_radius_update"

	/** @type {number | undefined} */
	chunk_radius

	/**
	 * @param {import("frog-protocol").Connection} connection 
	 */
	write(connection) {
		connection.queue(this.name, {
			chunk_radius: this.chunk_radius
		})
	}
}

export { ChunkRadiusUpdate }