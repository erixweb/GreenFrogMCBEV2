class Plugin {
	/** @type {string} */
	name = ""

	/** @type {string} */
	description = ""

	/** @type {string} */
	version = ""

	/** @type {string} */
	main_file = ""

	/**
	 * @param {string} name 
	 * @param {string} description 
	 * @param {string} version 
	 * @param {string} main_file 
	 */
	constructor(name, description, version, main_file) {
		this.name = name
		this.description = description
		this.version = version
		this.main_file = main_file
	}

	/** 
	 * @returns {Promise<any>} 
   	 */
	async get_main_class() {
		return new (Object.values(await import("file://" + this.main_file))[0])
	}

	async load() {
		const plugin = await this.get_main_class()

		if (typeof plugin.load != 'function') {
			throw new Error("Plugin does not have a .load() function")
		}

		plugin.load()
	}

	async shutdown() {
		const plugin = await this.get_main_class()

		if (typeof plugin.shutdown != 'function') {
			throw new Error("Plugin does not have a .shutdown() function")
		}

		plugin.shutdown()
	}
}

module.exports = Plugin