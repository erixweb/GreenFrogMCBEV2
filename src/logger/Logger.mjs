import { EventEmitter, Event } from '@kotinash/better-events'
import { EventType } from '../events/EventType.mjs'

class LogLevel {
	static Debug = "DEBUG"
	static Info = "INFO"
	static Warning = "WARNING"
	static Error = "ERROR"
}

class Logger {
	/** @type {string} */
	name

	constructor(/** @type {string} */ name) {
		this.name = name
	}

	log(/** @type {string} */ message) {
		function _log_level_to_str(/** @type {string} */ level) {
			// TODO
		}

		function _log_event_callback(/** @type {string} */ message) {
			// TODO
		}

		EventEmitter.emit(
			new Event(
				EventType.Log,
				{ message },
				(() => _log_event_callback(message))
			)
		)
	}
}

export { Logger }