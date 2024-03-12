import { Packet } from "../Packet.mjs"

class PlayStatus extends Packet {
	name = "play_status"

	/** @type {import("frog-protocol").PlayStatus | undefined} */
	status

	/**
	 * @param {import("frog-protocol").Connection} connection 
	 */
	write(connection) {
		connection.queue(this.name, {
			status: this.status
		})
	}
}

export { PlayStatus }