import { Generator } from "./Generator.mjs"

class Flat extends Generator {
	name = "flat"

	generate_chunk() {
		return new Buffer(16 * 16 * 256).fill(0)
	}
}

export { Flat }