import { Math } from "../../../utils/Math.mjs"
import { Vec3 } from "vec3"
import Vec2 from "vec2"

class CameraPreset {
    /** @type {string} */
    name = ""

    /** @type {string} */
    parent= ""

    /** @type {Vec2} */
    rotation = new Vec2(0, 0)

    /** @type {Vec3} */
    position = new Vec3(0, 0, 0)

    /**
     * @param {string} name
     * @param {string} [parent=""]
     * @param {Vec2} [rotation=new Vec2(0, 0)]
     * @param {Vec3} [position=new Vec3(0, 0, 0)]
     */
    constructor(name, parent = "", rotation = new Vec2(0, 0), position = new Vec3(0, 0, 0)) {
        this.name = name
        this.parent = parent
        this.rotation = rotation
        this.position = position
    }

    to_json() {
        return {
            name: this.name,
            parent: this.parent,
            rotation: Math.vec2_to_json(this.rotation),
            position: Math.vec3_to_json(this.position)
        }
    }
}

export { CameraPreset }
