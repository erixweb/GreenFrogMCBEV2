import { Packet } from "../Packet.mjs"

class UpdatePlayerGameType extends Packet {
    name = "update_player_game_type"

    /** @type {string | undefined} */
    gamemode

    /** @type {string | undefined} */
    player_unique_id

    /**
     * @param {import("frog-protocol").Connection} connection
     */
    write(connection) {
        connection.queue(this.name, {
            gamemode: this.gamemode,
            player_unique_id: this.player_unique_id
        })
    }
}

export { UpdatePlayerGameType }
