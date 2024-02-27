import { __dirname } from '../utils/Directory.mjs'
import properties from 'properties-parser'
import * as node_path from 'node:path'
import fs from 'fs'

class Config {
    /** @type {import('Config').ConfigCache} */
    static cache

    /** @type {string} */
    static path

    /** @type {string} */
    static original_path

    static parse() {
        throw new Error('This should be implemented by sub-classes')
    }

    static init() {
        throw new Error('This should be implemented by sub-classes')
    }

    static create() {
        throw new Error('This should be implemented by sub-classess')
    }

    static get() {
        throw new Error('This should be implemented by sub-classess')
    }
}

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

    static get(/** @type {string} */ key) {
        return this.cache[key]
    }
}

export {
    Config,
    ServerConfig
}