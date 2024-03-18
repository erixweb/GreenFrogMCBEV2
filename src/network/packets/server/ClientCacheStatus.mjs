import { Packet } from "../Packet.mjs"

class ClientCacheStatus extends Packet {
	name = "client_cache_status"

	/** @type {boolean | undefined} */
	enabled

	/**
	 * @param {import("frog-protocol").Connection} connection
	 */
	write(connection) {
		connection.queue(this.name, {
			enabled: this.enabled,
		})
	}
}

export { ClientCacheStatus }