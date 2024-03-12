class ResourcePackInfos {
	/** @type {string | undefined} */
	uuid

	/** @type {string | undefined} */
	version

	/** @type {number | undefined} */
	size

	/** @type {string | undefined} */
	content_key

	/** @type {string | undefined} */
	sub_pack_name

	/** @type {string | undefined} */
	content_identity

	/** @type {boolean | undefined} */
	has_scripts

	/** @type {boolean | undefined} */
	rtx_enabled

	toJSON() {
		return {
			uuid: this.uuid,
			version: this.version,
			size: this.size,
			content_key: this.content_key,
			sub_pack_name: this.sub_pack_name,
			content_identity: this.content_identity,
			has_scripts: this.has_scripts,
			rtx_enabled: this.rtx_enabled
		}
	}
}

export { ResourcePackInfos }