import { Event, EventEmitter } from "@kotinash/better-events"
import { Language } from "../../../config/Language.mjs"
import { Player } from "../../../player/Player.mjs"
import { Packet } from "../Packet.mjs"
import { EventType } from "../../../events/EventType.mjs"

class Text extends Packet {
	name = "text"

	/**
     * @param {Player} player 
	 * @param {object} packet
	 */
	read(player, packet) {
		const message = packet.data.params.message

		if (!message || message.length > 256) return

		EventEmitter.emit(
			new Event(
				EventType.PlayerChat,
				{
					player,
					message,
					packet
				},
				(() => {
					player.server.broadcast_message(`${Language.get_key("chat.format", [ player.name, message ])}`)
				})
			)
		)
	}
}

export { Text }