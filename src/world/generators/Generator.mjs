class Generator {
	/** @type {string | undefined} */
	name

	/**
	 * @returns {Buffer} 
	 */
	generate_chunk() {
		throw new Error("This should be implemented by sub-classes")
	}

	prepare() {}
}

export { Generator }
