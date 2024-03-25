import { MovementValidator } from "../../../player/MovementValidator.mjs"
import { TeleportReason } from "../../../player/TeleportReason.mjs"
import { EventEmitter, Event } from "@kotinash/better-events"
import { EventType } from "../../../events/EventType.mjs"
import { Packet } from "../Packet.mjs"
import { Vec3 } from "vec3"
import Vec2 from "vec2"

class PlayerAuthInput extends Packet {
    name = "player_auth_input"

    /**
     * @param {Player} player
     * @param {object} packet
     */
    read(player, packet) {
        const { position, tick, yaw, pitch } = packet.data.params

        const delta = new Vec3(
            position.x - player.location.x,
            position.y - player.location.y,
            position.z - player.location.z
        )

        const params = {
            player,
            packet,
            position,
            delta,
            tick
        }

        EventEmitter.emit(
            new Event(
                EventType.PlayerMove,
                params,
                () => {
                    if (!MovementValidator.is_movement_valid(player, packet, delta.abs())) {
                        return EventEmitter.emit(
                            new Event(
                                EventType.PlayerMovementValidationFail,
                                params,
                                (() => {
                                    player.teleport(player.location, new Vec3(0, 0, 0), TeleportReason.MovementValidation)
                                })
                            )
                        )
                    }

                    player.location = new Vec3(position.x, position.y, position.z)
                    player.rotation = new Vec2(yaw, pitch)
                    player.movement_tick = tick
                }
            )
        )
    }
}

export { PlayerAuthInput }
