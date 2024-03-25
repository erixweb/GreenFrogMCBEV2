import { Event, EventEmitter } from "@kotinash/better-events"
import { EventType } from "../events/EventType.mjs"
import { Vec3 } from "vec3"

class EntityType {
	static Player = "minecraft:player"
}

class Entity {
	/** @type {string | undefined} */
	type

	/** @type {number} */
	ticks_alive = 0

	/** @type {number} */
	runtime_id = 0

	/** @type {Vec3} */
	location = new Vec3(0, 0, 0)

	/**
	 * @param {string} type 
	 * @param {number} [runtime_id=Math.floor(Math.random() * 1000000)]
	 */
	constructor(type, runtime_id = Math.floor(Math.random() * 1000000)) {
		this.type = type

		this.runtime_id = runtime_id

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
