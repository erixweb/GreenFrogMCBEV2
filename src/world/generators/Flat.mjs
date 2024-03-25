import { Generator } from "./Generator.mjs"
import { generatePerlinNoise } from "perlin-noise"

class Flat extends Generator {
	name = "flat"

	#WORLD_SIZE = 16 * 16 * 256

	#PERLIN_NOISE = []

	generate_chunk() {
//		this.prepare()

		let buffer = Buffer.alloc(this.#WORLD_SIZE)

		for (let i = 0; i < this.#WORLD_SIZE; i++) {
			let block = Math.floor(this.#PERLIN_NOISE[i] * 100)

			if (!block || block > 10) {
				block = 2
			}

			buffer[i] = block
		}

		return buffer
	}

	prepare() {
		// this.#TOTAL_BLOCKS = 0

		this.#PERLIN_NOISE = generatePerlinNoise(256, 256)
	}
}

export { Flat }
