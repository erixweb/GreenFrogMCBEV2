class GameruleValue {
	static Int = "int"
	static Bool = "bool"
}

class Gamerule {
	/** @type {string | undefined} */
	name

	/** @type {boolean | undefined} */
	editable

	/** @type {keyof GameruleValue | undefined} */
	type

	/** @type {boolean | number | undefined} */
	value

	/**
	 * @param {string} name 
	 * @param {boolean} editable 
	 * @param {keyof GameruleValue} type 
	 * @param {boolean | number | undefined} value 
	 */
	constructor(name, editable, type, value) {
		this.name = name
		this.editable = editable
		this.type = type
		this.value = value
	}

	toJSON() {
		return {
			name: this.name,
			editable: this.editable,
			type: this.type,
			value: this.value
		}
	}
}

export { Gamerule, GameruleValue }