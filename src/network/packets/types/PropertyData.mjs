class PropertyData {
	/** @type {string} */
	type = ""

	/** @type {string} */
	name = ""

	/** @type {any} */
	value = {}

	/**
	 * @param {string} type 
	 * @param {string} name 
	 * @param {any} value 
	 */
	constructor(type, name, value) {
		this.type = type
		this.name = name
		this.value = value
	}

	toJSON() {
		return {
			type: this.type,
			name: this.name,
			value: this.value
		}
	}
}

export { PropertyData }