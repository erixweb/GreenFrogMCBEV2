class Address {
	/** @type {string} */
	host

	/** @type {number} */
	port

	/**
	 * @param {string} host
	 * @param {number} port
	 */
	constructor(
		host,
		port
	) {
		this.host = host
		this.port = port
	}
}

export { Address }