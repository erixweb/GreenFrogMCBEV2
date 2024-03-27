import { FormRequest } from "../network/packets/server/FormRequest.mjs"
import { FormButton } from "./types/FormButton.mjs"
import { FormManager } from "./FormManager.mjs"
import { FormType } from "./types/FormType.mjs"
import { Player } from "../player/Player.mjs"
import { Form } from "./Form.mjs"

class NormalForm extends Form {
    /** @type {string} */
    title = ""

    /** @type {FormButton[]} */
    buttons = []

    /** @type {number} */
    id = 0

    /** @type {string} */
    content = ""

    /** @type {Player | undefined} */
    player

    /**
     * @type {function}
     * @param {Player} player
     * @param {NormalForm} form
     */
    on_send = (player, form) => {}

    /**
     * @param {string} title
     * @param {string} content
     * @param {function} on_send
     * @param {FormButton[]} buttons
     * @param {number} id
     */
    constructor(title, content, buttons = [], on_send = () => {}, id = FormManager.LAST_FORM_ID++) {
        super()

        this.title = title
        this.content = content
        this.buttons = buttons
        this.id = id
        this.on_send = on_send
    }

    /**
     * @returns {FormRequest}
     */
    get_constructed_packet() {
        let buttons_sanitized = []

        this.buttons.forEach((button) => {
            buttons_sanitized.push(button.toJSON())
        })

        const form_request = new FormRequest()
        form_request.title = this.title
        form_request.content = this.content
        form_request.buttons = buttons_sanitized
        form_request.type = FormType.Form
        form_request.id = this.id
        return form_request
    }

    /**
     * @param {Player} player
     */
    send(player) {
        this.player = player

        FormManager.FORMS.push(this)

        this
            .get_constructed_packet()
            .write(player.connection)

        this.on_send(player, this)
    }
}

export { NormalForm }
