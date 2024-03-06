import { __dirname } from '../utils/Directory.mjs'

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

	/**
	 * @param {string} key 
	 */
    static get(key) {
        throw new Error('This should be implemented by sub-classess')
    }
}

export {
    Config
}