import { fileURLToPath } from 'node:url'
import path from 'node:path'

/** @type {string} */ 
// @ts-ignore
const __filename = fileURLToPath(import.meta.url);

/** @type {string} */ 
const __dirname = path.dirname(__filename);

export { __filename, __dirname }