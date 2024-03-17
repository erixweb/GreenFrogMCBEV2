import { __dirname } from "../utils/Directory.mjs"
import { Language } from "../config/Language.mjs"
import { Logger } from "../logger/Logger.mjs"
import Plugin from "./Plugin.cjs"
import path from "path"
import fs from "fs"

class PluginLoader {
	/** @type {Plugin[]} */
	plugins = []

	/** @type {string} */
	plugins_directory = "plugins"

	/** @type {string} */
	plugin_data_directory = "plugin_data"

	constructor(plugins_directory = "plugins", plugin_data_directory = "plugin_data") {
		this.plugins_directory = plugins_directory
		this.plugin_data_directory = plugin_data_directory
	}

	#create_plugins_directory() {
		fs.mkdirSync(this.plugins_directory, { recursive: true })
		fs.mkdirSync(this.plugin_data_directory, { recursive: true })
	}

	/**
	 * @returns {string[]}
	 */
	get_plugin_directory_files() {
		return fs.readdirSync(this.plugins_directory)
	}

	/**
	 * @param {string} plugin_name 
	 * @returns {Promise<Plugin>}
	 */
	async get_plugin_from_path(plugin_name) {
		const plugin_path = path.join(__dirname, "..", "..", this.plugins_directory, plugin_name, "index.mjs");
		const package_path = path.join(this.plugins_directory, plugin_name, "package.json");

		const package_json = JSON.parse(await fs.promises.readFile(package_path, "utf-8"));

		return new Plugin(
			package_json.displayName,
			package_json.description,
			package_json.version,
			plugin_path,
		)
	}

	async load_plugins() {
		this
			.get_plugin_directory_files()
			.forEach(async (plugin_path) => {
				const plugin = await this.get_plugin_from_path(plugin_path)

				Logger.info(Language.get_key("plugin.loading", [plugin.name]))

				try {
					await plugin.load()

					Logger.info(Language.get_key("plugin.loaded", [plugin.name]))
				} catch (error) {
					Logger.error(Language.get_key("plugin.loading.failed", [plugin.name, error.stack]))
				}
			})
	}

	async unload_plugins() {
		this
			.get_plugin_directory_files()
			.forEach(async (plugin_path) => {
				const plugin = await this.get_plugin_from_path(plugin_path)

				Logger.info(Language.get_key("plugin.unloading", [plugin.name]))

				try {
					await plugin.shutdown()

					Logger.info(Language.get_key("plugin.unloaded", [plugin.name]))
				} catch (error) {
					Logger.error(Language.get_key("plugin.unloading.failed", [plugin.name, error.stack]))
				}
			})
	}

	async load() {
		this.#create_plugins_directory()

		await this.load_plugins()
	}
}

export { PluginLoader }