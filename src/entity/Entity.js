import { Event, EventEmitter } from "@kotinash/better-events"
import { EventType } from "../events/EventType.mjs"

class EntityType {
	static Player = "minecraft:player"
}

class Entity {
	/** @type {string | undefined} */
	type

	/** @type {number} */
	ticks_alive = 0

	/**
	 * @param {string} type 
	 */
	constructor(type) {
		this.type = type

		setInterval(() => {
			this.#tick()
		}, 1000)
	}

	#tick() {
		EventEmitter.emit(
			new Event(
				EventType.EntityTick,
				{
					entity: this
				},
				(() => {
					this.ticks_alive++
				})
			)
		)
	}
}

export { Entity, EntityType }