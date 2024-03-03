import { LanguageParser } from '@greenfrog/lang-parser'
import { __dirname } from '../utils/Directory.mjs'
import { ServerConfig } from './Config.mjs'
import path from 'path'
import fs from 'fs'

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
		const lang_path = path.resolve(__dirname, "..", "..", "resources", "lang")
		const lang_file = path.join(lang_path, `${lang}.lang`)

		if (!fs.existsSync(lang_file)) {
			throw new Error("Language file doesn't exist")
		}

		const lang_content = fs.readFileSync(lang_file, "utf8")

		return lang_content
	}

	static init() {
		const language = ServerConfig.get("language")

		this.#cache = LanguageParser.parse_raw(this.get_language(language))
	}

	/**
	 * @param {string} key 
	 * @param {string[]} placeholders
	 * @returns {string}
	 */
	static get_key(key, placeholders = []) {
		const result = LanguageParser.get_key(key, this.#cache, placeholders)

		if (!result) {
			return `lang error (invalid key): get_key(${key}, ${placeholders})`
		}

		return result
	}
}

export { Language }