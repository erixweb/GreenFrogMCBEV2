import { EventEmitter, Event } from "@kotinash/better-events"
import { EventType } from "../../../events/EventType.mjs"
import { Packet } from "../Packet.mjs"

class NetworkStackLatency extends Packet {
	name = "network_stack_latency"

	/**
 	 * @param {import("frog-protocol").Connection} connection 
	 * @param {object} packet
	 */
	read(connection, packet) {
		EventEmitter.emit(
			new Event(
				EventType.PacketNetworkStackLatencyResponse,
				{
					connection,
					packet
				}
			)
		)
	}
}

export { NetworkStackLatency }