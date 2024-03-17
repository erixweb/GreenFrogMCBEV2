import { BehaviourPackInfos } from "../types/BehaviourPackInfos.mjs"
import { ResourcePackInfos } from "../types/ResourcePackInfos.mjs"
import { Experiment } from "../types/Experiment.mjs"
import { Packet } from "../Packet.mjs"

class ResourcePackStack extends Packet {
	name = "resource_pack_stack"

	/** @type {BehaviourPackInfos[]} */
	behavior_packs = []

	/** @type {ResourcePackInfos[]} */
	resource_packs = []

	/** @type {string | undefined} */
	game_version

	/** @type {boolean | undefined} */
	must_accept

	/** @type {Experiment[]} */
	experiments = []

	/** @type {boolean | undefined} */
	experiments_previously_used

	/**
	 * @param {import("frog-protocol").Connection} connection 
	 */
	write(connection) {
		const experiments_converted = []

		for (const experiment of this.experiments) {
			experiments_converted.push(experiment.toJSON())
		}

		const behaviour_packs_converted = []

		for (const pack of this.behavior_packs) {
			behaviour_packs_converted.push(pack.toJSON())
		}

		const resource_packs_converted = []

		for (const pack of this.resource_packs) {
			resource_packs_converted.push(pack.toJSON())
		}

		connection.queue(this.name, {
			must_accept: this.must_accept,
			behavior_packs: behaviour_packs_converted,
			resource_packs: resource_packs_converted,
			game_version: this.game_version,
			experiments: experiments_converted,
			experiments_previously_used: this.experiments_previously_used,
		})
	}
}

export { ResourcePackStack }