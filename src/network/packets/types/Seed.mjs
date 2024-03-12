class Seed {
	/** @type {number[]} */
	parts = []

	constructor(part_1 = 0, part_2 = 0) {
		this.parts.push(part_1, part_2)
	}

	/**
	 * @returns {number} 
	 */
	get_first_part() {
		return this.parts[0]
	}
}

export { Seed }