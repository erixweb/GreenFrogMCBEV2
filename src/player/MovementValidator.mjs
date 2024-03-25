import { ServerConfig } from "../server/ServerConfig.mjs"
import { Player } from "./Player.mjs"
import { Vec3 } from "vec3"

class MovementValidator {
    /**
     * @param {Player} player
     * @param {any} packet
     * @param {Vec3} delta
     * @return {boolean}
     */
    static is_movement_valid(player, packet, delta) {
        const { pitch, yaw, tick, input_data } = packet.data.params

        const current_tick = player.movement_tick

        if (!ServerConfig.get_boolean("validate_movements")) {
            return true
        }

        if (tick <= current_tick) {
            return false
        }

        if (!player.can_fly()) {
            if (!input_data.up && delta.y < 0) {
                return false
            }

            if (!input_data.down && delta.y > 0) {
                return false
            }
        }

        if (Math.abs(pitch) < 0 || Math.abs(yaw) < 0) {
            return false
        }

        if (delta.x >= 10 || delta.y >= 10 || delta.z >= 10) {
            return false
        }

        return true
    }
}

export { MovementValidator }
