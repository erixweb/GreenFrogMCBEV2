import { EventEmitter, Event } from '@kotinash/better-events'
import { EventType } from '../events/EventType.mjs'
import chalk from 'chalk'

class LogLevel {
	static Debug = "DEBUG"
	static Info = "INFO"
	static Warning = "WARNING"
	static Error = "ERROR"
}

class Logger {
	/** @type {string} */
	name

	/**
	 * @param {string} name 
	 */
	constructor(name) {
		this.name = name
	}

	/**
	 * @param {LogLevel} level 
	 * @param {string} text
	 */
	static #_log_level_to_color(level, text) {
		switch (level) {
			case LogLevel.Debug:
				return chalk.magenta(text)
			case LogLevel.Info:
				return chalk.green(text)
			case LogLevel.Warning:
				return chalk.yellow(text)
			case LogLevel.Error:
				return chalk.red(text)
		}

		return undefined
	}

	/**
	 * @param {LogLevel} level
	 * @param {string} message 
	 */
	static #_log_event_callback(level, message) {
		console.log(`${new Date()} ${this.#_log_level_to_color(level, level.toString())} | ${message}`)
	}

	/**
	 * @param {LogLevel} level
	 * @param {string} message 
	 */
	static log(level, message) {
		EventEmitter.emit(
			new Event(
				EventType.Log,
				{ message },
				(() => this.#_log_event_callback(level, message))
			)
		)
	}

	/**
	 * @param {string} message 
	 */
	static debug(message) {
		this.log(LogLevel.Debug, message)
	}

	/**
	 * @param {string} message 
	 */
	static info(message) {
		this.log(LogLevel.Info, message)
	}

	/**
	 * @param {string} message 
	 */
	static warning(message) {
		this.log(LogLevel.Warning, message)
	}

	/**
	 * @param {string} message 
	 */
	static error(message) {
		this.log(LogLevel.Error, message)
	}
}

export { Logger, LogLevel }