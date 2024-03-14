import { ToastRequest } from "../network/packets/server/ToastRequest.mjs"
import { EventEmitter, Event } from "@kotinash/better-events"
import { EventType } from "../events/EventType.mjs"
import { Player } from "../player/Player.mjs"

class Toast {
	/** @type {string} */
	title = ""

	/** @type {string} */
	message = ""

	/**
	 * @param {string | undefined} title 
	 * @param {string | undefined} message 
	 */
	constructor(title = "", message = "") {
		this.title = title
		this.message = message
	}

	/**
	 * @param {Toast} another
	 */
	from(another) {
		this.message = another.message
		this.title = another.title
	}

	/**
	 * @param {Player} player 
	 */
	send(player) {
		EventEmitter.emit(
			new Event(
				EventType.ServerToast,
				{
					player,
					toast: this
				},
				(() => {
					const toast_request = new ToastRequest()
					toast_request.title = this.title
					toast_request.message = this.message
					toast_request.write(player.connection)
				})
			)
		)
	}
}

export { Toast }