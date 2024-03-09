import { Packet } from "../Packet.mjs"

class PlayerFog extends Packet {
	name = "player_fog"

	/** @type {string[]} */
	stack = []

	/**
	 * @param {import("frog-protocol").Connection} connection 
	 */
	write(connection) {
		connection.queue(this.name, {
			stack: this.stack
		})
	}
}

export { PlayerFog }