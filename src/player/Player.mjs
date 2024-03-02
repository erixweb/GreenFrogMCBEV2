import { Language } from "../config/Language.mjs"
import { Logger } from "../logger/Logger.mjs"
import { Connection } from "frog-protocol"

class Player {
	/**
	 * @param {string} name 
	 * @param {Connection} connection
	 * @param {boolean} [internal=false] Set this to true if you want to create fake players
	 */
	constructor(name, connection, internal = false) {
		this.name = name
		this.connection = connection

		if (!internal) {
			Logger.info(Language.get_key("player.connected", [this.name]))
		}
	}
}

export { Player }