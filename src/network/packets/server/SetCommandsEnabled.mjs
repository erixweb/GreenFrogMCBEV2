import { Packet } from "../Packet.mjs"

class SetCommandsEnabled extends Packet {
	name = "set_commands_enabled"

	/** @type {boolean} */
	enabled = false

	/**
	 * @param {import("frog-protocol").Connection} connection 
	 */
	write(connection) {
		connection.queue(this.name, {
			enabled: this.enabled
		})
	}
}

export { SetCommandsEnabled }