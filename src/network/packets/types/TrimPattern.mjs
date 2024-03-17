class TrimPattern {
	/** @type {string} */
	item_name = ""

	/** @type {string} */
	pattern = ""

	/**
	 * @param {string} item_name 
	 * @param {string} pattern 
	 */
	constructor(item_name, pattern) {
		this.item_name = item_name
		this.pattern = pattern
	}

	toJSON() {
		return {
			item_name: this.item_name,
			pattern: this.pattern
		}
	}
}

export { TrimPattern }