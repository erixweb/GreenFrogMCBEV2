import { Packet } from "../Packet.mjs"

class ToastRequest extends Packet {
	name = "toast_request"

	/** @type {string | undefined} */
	title

	/** @type {string | undefined} */
	message

	/**
	 * @param {import("frog-protocol").Connection} connection 
	 */
	write(connection) {
		connection.queue(this.name, {
			title: this.title,
			message: this.message
		})
	}
}

export { ToastRequest }