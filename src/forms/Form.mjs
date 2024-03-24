import { FormRequest } from "../network/packets/server/FormRequest.mjs"
import { Player } from "../player/Player.mjs"

class Form {
	/**
	 * @returns {FormRequest}
	 */
	get_constructed_packet() {
		throw new Error("Should be implemented by sub-classes")
	}

	/**
	 * @param {Player} player
	 */
	send(player) {
		throw new Error("Should be implemented by sub-classes")
	}
}

export { Form }