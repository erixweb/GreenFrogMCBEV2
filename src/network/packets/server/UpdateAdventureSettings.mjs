import { Packet } from "../Packet.mjs"

class UpdateAdventureSettings extends Packet {
	name = "update_adventure_settings"

	/** @type {boolean} */
	no_pvm = false

	/** @type {boolean} */
	no_mvp = false

	/** @type {boolean} */
	immutable_world = false

	/** @type {boolean} */
	show_name_tags = true

	/** @type {boolean} */
	auto_jump = true

	/**
	 * @param {import("frog-protocol").Connection} connection 
	 */
	write(connection) {
		connection.queue(this.name, {
			no_pvm: this.no_mvp,
			no_mvp: this.no_mvp,
			immutable_world: this.immutable_world,
			show_name_tags: this.show_name_tags,
			auto_jump: this.auto_jump
		})
	}
}

export { UpdateAdventureSettings }