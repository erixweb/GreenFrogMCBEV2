import { EventEmitter, Event } from "@kotinash/better-events"
import { EventType } from "../../../events/EventType.mjs"
import { Player } from "../../../player/Player.mjs"
import { Packet } from "../Packet.mjs"

class NetworkStackLatency extends Packet {
	name = "network_stack_latency"

	/**
     * @param {Player} player
	 * @param {object} packet
	 */
	read(player, packet) {
		EventEmitter.emit(
			new Event(
				EventType.PacketNetworkStackLatencyResponse,
				{
					player,
					packet
				}
			)
		)
	}
}

export { NetworkStackLatency }