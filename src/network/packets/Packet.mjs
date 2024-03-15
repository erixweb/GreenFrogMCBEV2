import { Player } from "../../player/Player.mjs"

class Packet {
	/** @type {string | undefined} */
	name

	/**
	 * @param {import("frog-protocol").Connection} connection 
	 */
	write(connection) {
		throw new Error("This should be implemented by sub-classes")
	}

	/**
	 * @param {Player} player
	 * @param {any} packet
	 */
	read(player, packet) {
		throw new Error("This should be implemented by sub-classes")
	}
}

export { Packet }