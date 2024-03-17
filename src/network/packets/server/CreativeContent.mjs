import { Packet } from "../Packet.mjs"

class CreativeContent extends Packet {
	name = "creative_content"

	/** @type {any} */
	items

	/**
	 * @param {import("frog-protocol").Connection} connection 
	 */
	write(connection) {
		connection.queue(this.name, {
			items: this.items
		})
	}
}

export { CreativeContent }