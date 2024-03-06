import { Seed } from "../network/packets/types/Seed.mjs"
import { Language } from "../config/Language.mjs"
import { Logger } from "../logger/Logger.mjs"
import { Vec3 } from "vec3"

class World {
	/** @type {string} */
	name = "world"

	/** @type {Seed} */
	seed = new Seed()

	/**
	 * @param {string} name 
	 */
	constructor(name = "world", seed = new Seed()) {
		this.name = name
		
		this.seed = seed

		this.#generate()
	}

	#generate() {
		Logger.info(Language.get_key("world.generating", [this.name]))

		Logger.info(Language.get_key("world.generated"))
	}

	/** 
	 * @returns {Vec3}
	 */
	get_spawn_position() {
		/**
		 * @param {number} original 
		 * @returns {number}
		 * @private
		 */
		const get_spawn_offset = (original) => original + Math.floor(Math.random() * 10)

		const result = new Vec3(
			get_spawn_offset(0),
			10,
			get_spawn_offset(0)
		)

		return result
	}
}

export { World }