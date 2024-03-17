import { TrimMaterial } from "../types/TrimMaterial.mjs"
import { TrimPattern } from "../types/TrimPattern.mjs"
import { Packet } from "../Packet.mjs"

class TrimData extends Packet {
	name = "trim_data"

	/** @type {TrimPattern[]} */
	patterns = []

	/** @type {TrimMaterial[]} */
	materials = []

	/**
	 * @param {import("frog-protocol").Connection} connection 
	 */
	write(connection) {
		let patterns_converted = []

		if (this.patterns[0] instanceof TrimPattern) {
			patterns_converted = this.patterns.map(pattern => pattern.toJSON())
		}

		let materials_converted = []

		if (this.materials[0] instanceof TrimMaterial) {
			materials_converted = this.materials.map(material => material.toJSON())
		}

		connection.queue(this.name, {
			patterns: patterns_converted,
			materials: materials_converted
		})
	}
}

export { TrimData }