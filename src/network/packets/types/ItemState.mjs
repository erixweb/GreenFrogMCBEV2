class ItemState {
	/** @type {string} */
	name = ""

	/** @type {number} */
	runtime_id = 0

	/** @type {boolean} */
	compontent_based = false

	/**
	 * @param {string} name 
	 * @param {number} runtime_id 
	 * @param {boolean} compontent_based 
	 */
	constructor(name, runtime_id, compontent_based) {
		this.name = name
		this.runtime_id = runtime_id
		this.compontent_based = compontent_based
	}

	toJSON() {
		return {
			name: this.name,
			runtime_id: this.runtime_id,
			compontent_based: this.compontent_based
		}
	}
}

export { ItemState }