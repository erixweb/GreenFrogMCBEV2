import { Packet } from "../Packet.mjs"

class SetDifficulty extends Packet {
    name = "set_difficulty"

    /** @type {number | undefined} */
    difficulty

    /**
     * @param {import("frog-protocol").Connection} connection
     */
    write(connection) {
        connection.queue(this.name, {
            difficulty: this.difficulty
        })
    }
}

export { SetDifficulty }
