import { ResourcePackStack } from "../network/packets/server/ResourcePackStack.mjs"
import { ResourcePackInfo } from "../network/packets/server/ResourcePackInfo.mjs"
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

			this.#send_packets(connection)
		}

		setInterval(() => {
			this.#tick()
		}, ServerConfig.get("tick_delay"))
	}

	/**
	 * @param {import("frog-protocol").Connection} connection
	 */
	#send_packets(connection) {
		const resource_pack_info = new ResourcePackInfo()
		resource_pack_info.has_scripts = false
		resource_pack_info.must_accept = false
		resource_pack_info.texture_packs = []
		resource_pack_info.behavior_packs = []
		resource_pack_info.resource_pack_links = []
		resource_pack_info.write(connection)

		const resource_pack_stack = new ResourcePackStack()
		resource_pack_stack.must_accept = false
		resource_pack_stack.resource_packs = []
		resource_pack_stack.behavior_packs = []
		resource_pack_stack.experiments = []
		resource_pack_stack.game_version = "*"
		resource_pack_stack.experiments_previously_used = false
		resource_pack_stack.write(connection)		
	}

	#tick() {
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