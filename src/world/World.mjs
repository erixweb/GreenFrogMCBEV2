import { UpdateBlock } from "../network/packets/server/UpdateBlock.mjs"
import { EventEmitter, Event } from "@kotinash/better-events"
import { Seed } from "../network/packets/types/Seed.mjs"
import { Generator } from "./generators/Generator.mjs"
import { EventType } from "../events/EventType.mjs"
import { Block, BlockType } from "./Block.mjs"
import { Player } from "../player/Player.mjs"
import { Vec3 } from "vec3"

class World {
	/** @type {string} */
	name = "world"

	/** @type {Seed} */
	seed = new Seed()

	/** @type {Generator} */
	generator = new Generator()

	/** @type {number} */
	chunk_radius = 16

	/** @type {Player[]} */
	players = []

	/**
	 * @param {string} [name]
	 * @param {Generator} [generator]
	 * @param {Seed} [seed]
	 * @param {number} [chunk_radius=16]
	 */
	constructor(name = "world", generator = new Generator(), seed = new Seed(), chunk_radius = 16) {
		this.name = name
		this.seed = seed
		this.generator = generator
		this.chunk_radius = chunk_radius

		setInterval(() => {
			this.#tick()
		}, 1000)
	}

	prepare_generator() {
		this.generator.prepare()
	}

	/**
	 * @returns {Buffer}
	 */
	generate_chunk() {
		return this.generator.generate_chunk()
	}

	/**
	 * @param {Block} block
	 */
	place_block(block) {
		EventEmitter.emit(
			new Event(
				EventType.WorldPlaceBlock,
				{
					block,
					world: this
				},
				(() => {
					for (const player of this.players) {
						const update_block = new UpdateBlock()
						update_block.block_runtime_id = block.get_runtime_id()
						update_block.position = block.position
						update_block.layer = 0
						update_block.flags = {
							neighbors: false,
							network: true,
							no_graphic: false,
							unused: false,
							priority: false
						}
						update_block.write(player.connection)
					}
				})
			)
		)
	}

	/** 
	 * @param {Vec3} position
	 */
	break_block(position) {
		EventEmitter.emit(
			new Event(
				EventType.WorldBreakBlock,
				{
					position,
					world: this
				},
				(() => {
					this.place_block(new Block(BlockType.Air, position))
				})
			)
		)
	}

	/** 
	 * @returns {Vec3}
	 */
	get_spawn_position() {
		/**
		 * @param {number} original 
		 * @returns {number}
		 * @private
		 */
		const get_spawn_offset = (original) => original + Math.floor(Math.random() * 10)

		return new Vec3(
			get_spawn_offset(0),
			10,
			get_spawn_offset(0)
		)
	}

	#tick() {
		EventEmitter.emit(
			new Event(
				EventType.WorldTick,
				{
					world: this
				}
			)
		)
	}
}

export { World }
