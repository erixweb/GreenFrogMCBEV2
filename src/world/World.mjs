import { Seed } from "../network/packets/types/Seed.mjs"
import { Generator } from "./generators/Generator.mjs"
import { Language } from "../config/Language.mjs"
import { Logger } from "../logger/Logger.mjs"
import { Vec3 } from "vec3"

class World {
	/** @type {string} */
	name = "world"

	/** @type {Seed} */
	seed = new Seed()

	/** @type {Generator} */
	generator = new Generator()

	/** @type {Buffer[]} */
	chunks = []

	/**
	 * @param {string} name 
	 * @param {Generator} generator
	 */
	constructor(name = "world", generator = new Generator(), seed = new Seed()) {
		this.name = name
		this.seed = seed
		this.generator = generator

		this.#generate()
	}

	#generate() {
		Logger.info(Language.get_key("world.generating", [this.name]))

		this.chunks.push(this.generator.generate() || new Buffer(65565).fill(0))

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