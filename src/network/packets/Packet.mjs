class PacketDirection {
	static Server = "server"
	static Client = "client"
}

class Packet {
	/** @type {string | undefined} */
	name

	/** @type {PacketDirection | undefined} */
	direction

	/**
	 * @param {import("frog-protocol").Connection} connection 
	 */
	write(connection) {
		throw new Error("This should be implemented by sub-classes")
	}

	/**
	 * @param {import("frog-protocol").Connection} connection 
	 * @param {*} packet
	 */
	read(connection, packet) {
		throw new Error("This should be implemented by sub-classes")
	}
}

export { Packet, PacketDirection }