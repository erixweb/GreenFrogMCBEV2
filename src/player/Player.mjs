import { Event, EventEmitter } from "@kotinash/better-events"
import { EventType } from "../events/EventType.mjs"
import { ServerConfig } from "../config/Config.mjs"
import { Language } from "../config/Language.mjs"
import { Logger } from "../logger/Logger.mjs"

class Player {
	/**
	 * @param {string} name 
	 * @param {import("frog-protocol").Connection} connection
	 * @param {boolean} [internal=false] Set this to true if you want to create fake players
	 */
	constructor(name, connection, internal = false) {
		this.name = name
		this.connection = connection

		if (!internal) {
			Logger.info(Language.get_key("player.connected", [this.name]))
		}

		setInterval(() => {
			this.tick()
		}, ServerConfig.get("tick_delay"))
	}

	tick() {
		EventEmitter.emit(
			new Event(
				EventType.PlayerTick,
				{
					player: this
				}
			),
			false
		)
	}
}

export { Player }