import assert from "assert"

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
		assert(port > 0)
		
		this.host = host
		this.port = port
	}
}

export { Address }
