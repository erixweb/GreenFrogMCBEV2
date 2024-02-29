import { LanguageParser } from '@greenfrog/lang-parser'
import path from 'path'
import fs from 'fs'
import { ServerConfig } from './Config.mjs'

class Language {
	/**
	 * @type {import('Config').ConfigCache}
	 */
	static #cache = []

	/**
	 * @type {string}
	 */
	static #cached_lang_name = ""

	/**
	 * @param {string} lang 
	 * @returns {string} 
	 */
	static get_language(lang) {
		const lang_path = path.resolve(__dirname, "..", "..", "resources", "lang", lang)
		const lang_file = path.join(lang_path, `${lang}.lang`)

		if (!fs.existsSync(lang_file)) {
			throw new Error("Language file doesn't exist")
		}

		const lang_content = fs.readFileSync(lang_file, "utf8")

		return lang_content
	}

	static init() {
		const language = ServerConfig.get("lang")

		this.#cache = LanguageParser.parse_raw(this.get_language(language))
	}

	/**
	 * @param {string} key 
	 * @returns {string | undefined}
	 */
	static get_key(key) {
		return this.#cache[key]
	}
}

export { Language }