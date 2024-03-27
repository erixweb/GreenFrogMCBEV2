import { EventEmitter, Event } from "@kotinash/better-events"
import { FormManager } from "../../../forms/FormManager.mjs"
import { EventType } from "../../../events/EventType.mjs"
import { Packet } from "../Packet.mjs"

class ModalFormResponse extends Packet {
    name = "modal_form_response"

    /**
     * @param {Player} player
     * @param {object} packet
     */
    read(player, packet) {
        const params = { packet }

        const { cancel_reason, form_id, data } = params

        let form = null

        FormManager.FORMS.forEach((f) => {
            if (f.id === form_id) {
                form = f
            }
        })

        if (!form) {
            return
        }

        EventEmitter.emit(
            new Event(
                EventType.FormResponse,
                {
                    player,
                    cancel_reason,
                    form_id,
                    form,
                    data
                }
            )
        )
    }
}

export { ModalFormResponse }
