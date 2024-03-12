import { Packet } from "../Packet.mjs"

class BiomeDefinitionList extends Packet {
	name = "biome_definition_list"

	/** @type {any} TODO: Types for this */
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

export { BiomeDefinitionList }