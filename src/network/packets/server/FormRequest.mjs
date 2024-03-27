import { FormButton } from "../../../forms/types/FormButton.mjs"
import { FormType } from "../../../forms/types/FormType.mjs"
import { Packet } from "../Packet.mjs"

class FormRequest extends Packet {
    name = "modal_form_request"

    /** @type {number | undefined} */
    id

    /** @type {string | undefined} */
    content

    /** @type {FormButton | undefined} */
    buttons

    /** @type {any[] | undefined} */
    actions = []

    /** @type {string | undefined} */
    title

    /** @type {string | undefined} */
    type

    /** @type {string[] | undefined} */
    text

    /** @type {string | undefined} */
    button1

    /** @type {string | undefined} */
    button2

    /**
     * @param {import("frog-protocol").Connection} connection
     */
    write(connection) {
        connection.queue(this.name, {
            form_id: this.id,
            data: JSON.stringify({
                title: this.title,
                content: this.actions,
                type: this.type,
                ...(this.type === FormType.ModalForm
                        ? { button1: this.button1, button2: this.button2 }
                        : { buttons: this.buttons }
                ),
            }),
        })
    }
}

export { FormRequest }
