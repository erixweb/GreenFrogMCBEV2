import { CameraPreset } from "../types/CameraPreset.mjs"
import { Packet } from "../Packet.mjs"

class CameraPresents extends Packet {
    name = "camera_presets"

    /** @type {CameraPreset[]}
    presets = []

    /**
     * @param {import("frog-protocol").Connection} connection
     */
    write(connection) {
        connection.queue(this.name, {
            presets: this.presets.filter((present) => present.to_json())
        })
    }
}

export { CameraPresents }
