import { Generator } from "./Generator.mjs"

class Flat extends Generator {
	name = "flat"

	generate_chunk() {
		return Buffer.alloc(16 * 256 * 16).fill(2)
	}
}

export { Flat }
