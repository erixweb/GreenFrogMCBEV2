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
        const { cancel_reason, form_id, data } = packet.data.params

        const form = FormManager.FORMS.filter(created_form => created_form.id === form_id && created_form.player.name === player.name)

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
