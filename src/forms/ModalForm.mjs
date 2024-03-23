import { FormRequest } from "../network/packets/server/FormRequest.mjs"
import { FormButton } from "./types/FormButton.mjs"
import { FormManager } from "./FormManager.mjs"
import { FormType } from "./types/FormType.mjs"
import { Player } from "../player/Player.mjs"
import { Form } from "./Form.mjs"

class ModalForm extends Form {
    /** @type {string} */
    title = ""

    /** @type {FormButton | undefined} */
    button1

    /** @type {FormButton | undefined} */
    button2

    /** @type {number} */
    id = 0

    /** @type {string} */
    text = ""

    /**
     * @type {function}
     * @param {Player} player
     * @param {Form} form
     */
    on_send = (player, form) => {}

    /**
     * @param {string} title
     * @param {string} text
     * @param {FormButton} button1
     * @param {FormButton} button2
     * @param {function} on_send
     * @param {number} id
     */
    constructor(title, text, button1, button2, on_send = () => {}, id = FormManager.LAST_FORM_ID++) {
        super()

        this.title = title
        this.text = text
        this.button1 = button1
        this.button2 = button2
        this.id = id
        this.on_send = on_send
    }

    /**
     * @returns {FormRequest}
     */
    get_constructed_packet() {
        const form_request = new FormRequest()
        form_request.title = this.title
        form_request.text = this.text
        form_request.button1 = this.button1
        form_request.button2 = this.button2
        form_request.type = FormType.ModalForm
        form_request.id = this.id
        return form_request
    }

    /**
     * @param {Player} player
     */
    send(player) {
        this
            .get_constructed_packet()
            .write(player.connection)

        this.on_send(player, this)
    }
}

export { ModalForm }
