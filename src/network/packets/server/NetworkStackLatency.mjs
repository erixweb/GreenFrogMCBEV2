import { Packet } from "../Packet.mjs"

class NetworkStackLatency extends Packet {
	name = "network_stack_latency"

	/** @type {number | undefined} */
	timestamp

	/** @type {boolean | undefined} */
	needs_response

	/**
 	 * @param {import("frog-protocol").Connection} connection 
	 */
	write(connection) {
		connection.queue(this.name, {
			timestamp: this.timestamp,
			needs_response: Number(this.needs_response)
		})
	}
}

export { NetworkStackLatency }