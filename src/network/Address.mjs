class Address {
	/** @type {string} */
	host

	/** @type {number} */
	port

	constructor(
		/** @type {string} */ host,
		/** @type {number} */ port
	) {
		this.host = host
		this.port = port
	}
}

export { Address }