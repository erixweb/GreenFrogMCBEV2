import { Packet } from "../Packet.mjs"

class SetTime extends Packet {
	name = "set_time"

	/** @type {number | undefined} */
	time

	/**
	 * @param {import("frog-protocol").Connection} connection 
	 */
	write(connection) {
		connection.queue(this.name, {
			time: this.time
		})
	}
}

export { SetTime }