import { FormRequest } from "../network/packets/server/FormRequest.mjs"
import { FormActionType } from "./types/FormActionType.mjs"
import { FormButton } from "./types/FormButton.mjs"
import { FormManager } from "./FormManager.mjs"
import { FormType } from "./types/FormType.mjs"
import { Player } from "../player/Player.mjs"

class CustomForm {
	/** @type {string} */
	title = ""

	/** @type {any[]} */
	actions = []

	/** @type {FormButton[]} */
	buttons = []

	/** @type {number} */
	id = FormManager.LAST_FORM_ID

	/**
	 * @type {function}
	 * @param {Player} player
	 * @param {CustomForm} form
	 */
	on_send = (player, form) => { }

	/**
	 * @param {string} title 
	 * @param {FormActionType[]} actions 
	 * @param {FormButton[]} buttons 
	 * @param {number} id 
	 * @param {function} on_send 
	 */
	constructor(title, actions, buttons, id, on_send) {
		this.title = title
		this.actions = actions
		this.buttons = buttons
		this.id = id
		this.on_send = on_send
	}

	/**
	 * @param {any} action
	 */
	add_action(action) {
		this.actions.push(action)
	}

	/**
	 * @param {string} text
	 * @param {string} [placeholder]
	 */
	add_input(text, placeholder = "") {
		this.add_action({ type: FormActionType.Input, text, placeholder })
	}

	/**
	 * @param {string} text
	 */
	add_text(text) {
		this.add_action({ type: FormActionType.Label, text })
	}

	/**
	 * @param {string} text
	 * @param {string[]} options
	 */
	add_dropdown(text, options) {
		this.add_action({ type: FormActionType.Dropdown, text, options })
	}

	/**
	 * @param {string} text
	 */
	add_toggle(text) {
		this.add_action({ type: FormActionType.Toggle, text })
	}

	/**
	 * @param {string} text
	 * @param {number} min
	 * @param {number} max
	 * @param {number} [step]
	 */
	add_slider(text, min, max, step = -1) {
		this.add_action({ type: FormActionType.Slider, text, min, max, step })
	}

	/**
	 * @returns {FormRequest}
	 */
	get_constructed_packet() {	
		const form_request = new FormRequest()
		form_request.id = this.id
		form_request.title = this.title
		form_request.content = this.actions
		form_request.buttons = this.buttons
		form_request.type = FormType.CustomForm
		return form_request
	}

	/**
	 * @param {Player} player
	 */
	send(player) {
		this
			.get_constructed_packet()
			.write(player.connection)

		this.on_send(this, player)
	}
}

module.exports = CustomForm