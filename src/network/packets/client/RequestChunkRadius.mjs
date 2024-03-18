import { Event, EventEmitter } from "@kotinash/better-events"
import { EventType } from "../../../events/EventType.mjs"
import { Player } from "../../../player/Player.mjs"
import { Packet } from "../Packet.mjs"

class RequestChunkRadius extends Packet {
	name = "chunk_radius_update"

	/**
     * @param {Player} player
	 * @param {object} packet
	 */
	read(player, packet) {
		const { chunk_radius, max_radius } = packet.data

		EventEmitter.emit(
			new Event(
				EventType.PlayerRequestChunkRadius,
				{
					player,
					chunk_radius,
					max_radius
				},
				(() => {
					player.render_distance = chunk_radius
				})
			)
		)
	}
}

export { RequestChunkRadius }
