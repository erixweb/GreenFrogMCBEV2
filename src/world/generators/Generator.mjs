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
}

export { Generator }
