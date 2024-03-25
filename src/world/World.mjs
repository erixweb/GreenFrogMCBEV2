import {Seed} from "../network/packets/types/Seed.mjs"
import {Generator} from "./generators/Generator.mjs"
import {Vec3} from "vec3"

class World {
	/** @type {string} */
	name = "world"

	/** @type {Seed} */
	seed = new Seed()

	/** @type {Generator} */
	generator = new Generator()

	/** @type {number} */
	chunk_radius = 16

	/**
	 * @param {string} [name]
	 * @param {Generator} [generator]
	 * @param {Seed} [seed]
	 * @param {number} [chunk_radius=16]
	 */
	constructor(name = "world", generator = new Generator(), seed = new Seed(), chunk_radius = 16) {
		this.name = name
		this.seed = seed
		this.generator = generator
		this.chunk_radius = chunk_radius
	}

	prepare_generator() {
		this.generator.prepare()
	}

	/**
	 * @returns {Buffer}
	 */
	generate_chunk() {
		return this.generator.generate_chunk()
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

		return new Vec3(
			get_spawn_offset(0),
			10,
			get_spawn_offset(0)
		)
	}
}

export { World }
