class TrimMaterial {
	/** @type {string} */
	material = ""

	/** @type {string} */
	color = ""

	/** @type {string} */
	item_name = ""

	/**
	 * @param {string} material 
	 * @param {string} color 
	 * @param {string} item_name 
	 */
	constructor(material, color, item_name) {
		this.material = material
		this.color = color
		this.item_name = item_name
	}

	toJSON() {
		return {
			material: this.material,
			color: this.color,
			item_name: this.item_name
		}
	}
}

export { TrimMaterial }