class ResourcePackLink {
	/** @type {string} */
	id

	/** @type {string} */
	url

	/**
	 * @param {string} id 
	 * @param {string} url 
	 */
	constructor(id, url) {
		this.id = id
		this.url = url
	}

	toJSON() {
		return { 
			id: this.id, 
			url: this.url 
		}
	}
}

export { ResourcePackLink }