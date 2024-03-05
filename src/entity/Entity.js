class EntityType {
	static Player = "minecraft:player"
}

class Entity {
	/** @type {string | undefined} */
	type

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

	}
}

export { Entity }