import { Packet } from "../Packet.mjs"

class AvailableEntityIdentifiers extends Packet {
	name = "available_entity_identifiers"

	/** @type {any} */
	nbt

	/**
	 * @param {import("frog-protocol").Connection} connection 
	 */
	write(connection) {
		connection.queue(this.name, {
			nbt: this.nbt
		})
	}
}

export { AvailableEntityIdentifiers }