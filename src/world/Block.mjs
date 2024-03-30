import creative_content from "../../resources/json/creative_content.json" with { type: "json" }
import { Vec3 } from "vec3"

class BlockType {
    static Air = 0
}

class Block {
    /** @type {number | undefined} */
    id

    /** @type {Vec3 | undefined} */
    position

    /**
     * @param {number} [id=0]
     * @param {Vec3} [position = new Vec3(0, 0, 0)]
     */
    constructor(id= BlockType.Air, position = new Vec3(0, 0, 0)) {
        this.id = id
        this.position = position.round()
    }

    get_runtime_id() {
        for (const item of creative_content) {
            const { network_id, block_runtime_id } = item.item

            if (block_runtime_id === undefined) {
                throw new Error("Not a block")
            }

            if (network_id === this.id) {
                return block_runtime_id
            }
        }

        throw new Error("Invalid block")
    }

    /**
     * @returns {boolean}
     */
    is_air() {
        return this.id === BlockType.Air
    }
}

export { Block, BlockType }
