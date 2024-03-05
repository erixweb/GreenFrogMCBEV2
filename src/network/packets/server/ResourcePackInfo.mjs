import { ResourcePackLink } from "../types/ResourcePackLink.mjs"
import { Packet } from "../Packet.mjs"

class ResourcePackInfo extends Packet {
	name = "resource_packs_info"

	/** @type {boolean | undefined} */
	must_accept

	/** @type {boolean | undefined} */
	has_scripts

	/** @type {any[] | undefined} */
	behavior_packs

	/** @type {any[] | undefined} */
	texture_packs

	/** @type {ResourcePackLink[] | []} */
	resource_pack_links = []

	/**
	 * @param {import("frog-protocol").Connection} connection 
	 */
	write(connection) {
		const resource_pack_links_sanitized = []

		for (const link of this.resource_pack_links) {
			resource_pack_links_sanitized.push(link.toJSON())
		}

		connection.queue(this.name, {
			must_accept: this.must_accept,
			has_scripts: this.has_scripts,
			behaviour_packs: this.behavior_packs,
			texture_packs: this.texture_packs,
			resource_pack_links: resource_pack_links_sanitized,
		})
	}
}

export { ResourcePackInfo }