import { Config } from '../config/Config.mjs'
import properties from 'properties-parser'
import * as node_path from 'node:path'
import fs from 'fs'

class ServerConfig extends Config {
    /** @type {import('Config').ConfigCache} */
    static cache = []

    /** @type {string} */
    static path = node_path.join(
        __dirname,
        "..",
        "..",
        "server.properties"
    )

    /** @type {string} */
    static original_path = node_path.join(
        __dirname,
        "..",
        "..",
        "resources",
        "properties",
        "server.properties"
    )

    static parse() {
        return properties.parse(fs.readFileSync(this.path).toString())
    }

    static create() {
        const exists = fs.existsSync(this.path)

        if (!exists) {
            fs.copyFileSync(this.original_path, this.path)
        }
    }

    static init() {
        this.create()

        this.cache = this.parse()
    }

	/**
	 * @param {string} key 
	 */
    static get(key) {
        return this.cache[key]
    }
}

export { ServerConfig }