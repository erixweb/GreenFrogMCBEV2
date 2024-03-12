class EduResourceUri {
	/** @type {string | undefined} */
	button_name

	/** @type {string | undefined} */
	link_uri

	/**
	 * @param {string} button_name 
	 * @param {string} link_uri 
	 */
	constructor(button_name, link_uri) {
		this.button_name = button_name
		this.link_uri = link_uri
	}

	toJSON() {
		return {
			button_name: this.button_name,
			link_uri: this.link_uri
		}
	}
}

export { EduResourceUri }