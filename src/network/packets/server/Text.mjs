import { Packet } from "../Packet.mjs"

class Text extends Packet {
	name = "text"

	/** @type {string | undefined} */
	type

	/** @type {boolean | undefined} */
	needs_translation

	/** @type {string | undefined} */
	source_name = undefined

	/** @type {string | undefined} */
	message = undefined

	/** @type {string[] | undefined} */
	parameters = undefined

	/** @type {string | undefined} */
	xuid

	/** @type {string | undefined} */
	platform_chat_id

	/**
	 * @param {import("frog-protocol").Connection} connection 
	 */
	write(connection) {
		connection.queue(this.name, {
			type: this.type,
			needs_translation: this.needs_translation,
			source_name: this.source_name,
			message: this.message,
			parameters: this.parameters,
			xuid: this.xuid,
			platform_chat_id: this.platform_chat_id
		})
	}
}

export { Text }