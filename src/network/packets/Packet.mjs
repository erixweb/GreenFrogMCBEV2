class Packet {
	/** @type {string | undefined} */
	name

	/**
	 * @param {import("frog-protocol").Connection} connection 
	 */
	write(connection) {
		throw new Error("This should be implemented by sub-classes")
	}

	/**
	 * @param {import("frog-protocol").Connection} connection 
	 * @param {any} packet
	 */
	read(connection, packet) {
		throw new Error("This should be implemented by sub-classes")
	}
}

export { Packet }