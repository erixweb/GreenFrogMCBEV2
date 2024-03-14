import { EventEmitter, Event } from "@kotinash/better-events"
import { EventType } from "../../events/EventType.mjs"

class Generator {
	/** @type {string | undefined} */
	name

	/**
	 * @returns {Buffer} 
	 */
	generate_chunk() {
		return Buffer.alloc(0)
	}

	/**
	 * @returns {Buffer | undefined} 
	 */
	generate() {
		/** @type {Buffer | undefined} */
		let result;

		EventEmitter.emit(
			new Event(
				EventType.WorldGenerate,
				{
					generator: this
				},
				(() => {
					result = this.generate_chunk()
				})
			)
		)

		return result
	}
}

export { Generator }