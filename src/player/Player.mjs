import { AvailableEntityIdentifiers } from "../network/packets/server/AvailableEntityIdentifiers.mjs"
import { NetworkChunkPublisherUpdate } from "../network/packets/server/NetworkChunkPublisherUpdate.mjs"
import creative_content_data from "../../resources/json/creative_content.json" with { type: "json" }
import { UpdateAdventureSettings } from "../network/packets/server/UpdateAdventureSettings.mjs"
import trim_materials from "../../resources/json/trim_materials.json" with { type: "json" }
import trim_patterns from "../../resources/json/trim_patterns.json" with { type: "json" }
import { ChatRestrictionLevel } from "../network/packets/types/ChatRestrictionLevel.mjs"
import { NetworkStackLatency } from "../network/packets/server/NetworkStackLatency.mjs"
import { BiomeDefinitionList } from "../network/packets/server/BiomeDefinitionList.mjs"
import { SetCommandsEnabled } from "../network/packets/server/SetCommandsEnabled.mjs"
import { ChunkRadiusUpdate } from "../network/packets/server/ChunkRadiusUpdate.mjs"
import { ResourcePackStack } from "../network/packets/server/ResourcePackStack.mjs"
import { SetPlayerGameType } from "../network/packets/server/SetPlayerGameType.mjs"
import { ClientCacheStatus } from "../network/packets/server/ClientCacheStatus.mjs"
import { MovementAuthority } from "../network/packets/types/MovementAuthority.mjs"
import { ResourcePackInfo } from "../network/packets/server/ResourcePackInfo.mjs"
import entities from "../../resources/json/entities.json" with { type: "json" }
import { CreativeContent } from "../network/packets/server/CreativeContent.mjs"
import { MoveEntityDelta } from "../network/packets/server/MoveEntityDelta.mjs"
import { EditorWorldType } from "../network/packets/types/EditorWorldType.mjs"
import { ChatMessageType } from "../network/packets/types/ChatMessageType.mjs"
import { EduResourceUri } from "../network/packets/types/EduResourceUri.mjs"
import { SetDifficulty } from "../network/packets/server/SetDifficulty.mjs"
import biomes from "../../resources/json/biomes.json" with { type: "json" }
import itemstates from "../../world/itemstates.json" with { type: "json" }
import gamerules from "../../world/gamerules.json" with { type: "json" }
import { PropertyData } from "../network/packets/types/PropertyData.mjs"
import { PlayStatus } from "../network/packets/server/PlayStatus.mjs"
import { LevelChunk } from "../network/packets/server/LevelChunk.mjs"
import { Difficulty } from "../network/packets/types/Difficulty.mjs"
import { PermissionLevel } from "../permissions/PermissionLevel.mjs"
import { StartGame } from "../network/packets/server/StartGame.mjs"
import { PlayerFog } from "../network/packets/server/PlayerFog.mjs"
import { RainLevel } from "../network/packets/types/RainLevel.mjs"
import { TrimData } from "../network/packets/server/TrimData.mjs"
import { Transfer } from "../network/packets/server/Transfer.mjs"
import { Respawn } from "../network/packets/server/Respawn.mjs"
import { SetTime } from "../network/packets/server/SetTime.mjs"
import { Event, EventEmitter } from "@kotinash/better-events"
import { ServerConfig } from "../server/ServerConfig.mjs"
import { Text } from "../network/packets/server/Text.mjs"
import { Entity, EntityType } from "../entity/Entity.js"
import { Dimension } from "../world/types/Dimension.mjs"
import { Generator } from "../world/types/Generator.mjs"
import { EventType } from "../events/EventType.mjs"
import { Language } from "../config/Language.mjs"
import { ChatColor } from "../chat/ChatColor.mjs"
import { Biome } from "../world/types/Biome.mjs"
import { Logger } from "../logger/Logger.mjs"
import { World } from "../world/World.mjs"
import { Gamemode } from "./Gamemode.mjs"
import { UUID } from "../utils/UUID.mjs"
import { Toast } from "./Toast.mjs"
import { Vec3 } from "vec3"
import Vec2 from "vec2"
import { TeleportReason } from "./TeleportReason.mjs";
import { CustomForm } from "../forms/CustomForm.mjs"

class Player extends Entity {
	/** @type {string} */
	name

	/** @type {import("frog-protocol").Connection} */
	connection

	/** @type {import("../Server.mjs").Server} server */
	server

	/** @type {number} */
	permission_level = PermissionLevel.Member

	/** @type {boolean} */
	offline = false

	/** @type {string} */
	gamemode = Gamemode.Creative;

	/** @type {World | undefined} */
	world

	/** @type {number} */
	render_distance = 0

	/** @type {bigint} */
	movement_tick = 0n

	/**
	 * @param {string} name 
	 * @param {import("frog-protocol").Connection} connection
	 * @param {import("../Server.mjs").Server} server
	 * @param {boolean} [internal=false] Set this to true if you want to create fake players
	 */
	constructor(name, connection, server, internal = false) {
		super(EntityType.Player)

		this.name = name
		this.connection = connection
		this.server = server

		this.world = server.worlds[0]

		this.server.players.push(this)

		EventEmitter.emit(
			new Event(
				EventType.PlayerCreated,
				{
					name,
					connection,
					server,
					internal
				}
			)
		)

		if (!internal) {
			Logger.info(Language.get_key("player.connected", [this.name, this.get_ip()]))

			this.#send_packets()
			this.#send_chunks()
			this.set_difficulty(this.server.difficulty)
			this.set_commands_enabled(true)
			this.#spawn()

			setTimeout(() => {
				this.send_play_status("player_spawn")
			}, 1000)

			setInterval(() => {
				const form = new CustomForm("yes")
				form.add_text("meow")
				form.send(this)
			}, 1000)
		}

		const ticking_interval = setInterval(() => {
			if (this.offline) {
				clearInterval(ticking_interval)
			}

			this.#tick()
		}, ServerConfig.get_number("tick_delay"))
	}

	#send_packets() {
		EventEmitter.emit(
			new Event(
				EventType.PlayerInitialized,
				{
					player: this
				}
			)
		)

		const resource_pack_info = new ResourcePackInfo()
		resource_pack_info.has_scripts = false
		resource_pack_info.must_accept = false
		resource_pack_info.texture_packs = []
		resource_pack_info.behavior_packs = []
		resource_pack_info.resource_pack_links = []
		resource_pack_info.write(this.connection)

		const resource_pack_stack = new ResourcePackStack()
		resource_pack_stack.must_accept = false
		resource_pack_stack.resource_packs = []
		resource_pack_stack.behavior_packs = []
		resource_pack_stack.experiments = []
		resource_pack_stack.game_version = "*"
		resource_pack_stack.experiments_previously_used = false
		resource_pack_stack.write(this.connection)

		const available_entity_identifiers = new AvailableEntityIdentifiers()
		available_entity_identifiers.nbt = entities.nbt
		available_entity_identifiers.write(this.connection)

		const biome_definition_list = new BiomeDefinitionList()
		biome_definition_list.nbt = biomes.nbt
		biome_definition_list.write(this.connection)

		const creative_content = new CreativeContent()
		creative_content.items = creative_content_data
		creative_content.write(this.connection)

		const client_cache_status = new ClientCacheStatus()
		client_cache_status.enabled = true
		client_cache_status.write(this.connection)

		const trim_data = new TrimData()
		trim_data.materials = trim_materials
		trim_data.patterns = trim_patterns
		trim_data.write(this.connection)

		this.location = new Vec3(
			this.world?.get_spawn_position().x,
			100,
			this.world?.get_spawn_position().z
		)

		const start_game = new StartGame()
		start_game.entity_id = this.runtime_id
		start_game.gamemode = this.server.gamemode
		start_game.player_position = this.location
		start_game.rotation = new Vec2(0, 0)
		start_game.seed = this.world.seed
		start_game.biome_type = 0
		start_game.biome_name = Biome.Plains
		start_game.generator = Generator.Infinite
		start_game.dimension = Dimension.Overworld
		start_game.world_gamemode = Gamemode.Survival
		start_game.difficulty = Difficulty.Easy
		start_game.spawn_position = this.location
		start_game.achievements_disabled = true
		start_game.editor_world_type = EditorWorldType.NotEditor
		start_game.created_in_editor = false
		start_game.exported_from_editor = false
		start_game.day_cycle_stop_time = 20
		start_game.edu_offer = 0
		start_game.edu_features_enabled = false
		start_game.edu_product_uuid = ""
		start_game.rain_level = RainLevel.Clear
		start_game.lightning_level = 0
		start_game.has_confirmed_platform_locked_content = false
		start_game.is_multiplayer = true
		start_game.broadcast_to_lan = true
		start_game.xbox_live_broadcast_mode = 6
		start_game.platform_broadcast_mode = 6
		start_game.enable_commands = true
		start_game.is_texturepacks_required = false
		start_game.gamerules = gamerules
		start_game.experiments = []
		start_game.experiments_previously_used = false
		start_game.bonus_chest = false
		start_game.map_enabled = false
		start_game.permission_level = this.permission_level
		start_game.server_chunk_tick_range = 4
		start_game.has_locked_behavior_pack = false
		start_game.has_locked_resource_pack = false
		start_game.is_from_locked_world_template = false
		start_game.msa_gamertags_only = false
		start_game.is_from_locked_world_template = false
		start_game.is_world_template_option_locked = false
		start_game.only_spawn_v1_villagers = false
		start_game.persona_disabled = false
		start_game.custom_skins_disabled = false
		start_game.emote_chat_muted = false
		start_game.game_version = "*"
		start_game.limited_world_length = 16
		start_game.limited_world_width = 16
		start_game.is_new_nether = false
		start_game.edu_resource_uri = new EduResourceUri("", "")
		start_game.experimental_gameplay_override = false
		start_game.chat_restriction_level = ChatRestrictionLevel.None
		start_game.disable_player_interactions = false
		start_game.level_id = this.world.name
		start_game.world_name = this.world.name
		start_game.premium_world_template_id = UUID.DEFAULT_UUID
		start_game.is_trial = false
		start_game.movement_authority = MovementAuthority.Server
		start_game.rewind_history_size = 40
		start_game.server_authoritative_block_breaking = true
		start_game.current_tick = [0, 20]
		start_game.enchantment_seed = Math.floor(Math.random() * 1000000)
		start_game.block_properties = []
		start_game.itemstates = itemstates
		start_game.multiplayer_correlation_id = "<raknet>90ee-29c6-b529-b8b9"
		start_game.server_authoritative_inventory = true
		start_game.engine = "GreenFrog"
		start_game.property_data = new PropertyData("compound", "", {})
		start_game.block_pallette_checksum = [3943060809, 601212266]
		start_game.world_template_id = UUID.DEFAULT_UUID
		start_game.client_side_generation = false
		start_game.block_network_ids_are_hashes = true
		start_game.server_controlled_sound = false
		start_game.write(this.connection)
	}

	#send_chunks() {
		if (!this.server.enable_world) return

		const render_distance = this.world.chunk_radius;

		this.set_chunk_radius(render_distance)

		for (let x = this.location.x - render_distance; x <= this.location.x + render_distance; x++) {
			for (let z = this.location.z - render_distance; z <= this.location.z + render_distance; z++) {
				const level_chunk = new LevelChunk()
				level_chunk.x = x
				level_chunk.z = z
				level_chunk.sub_chunk_count = 1
				level_chunk.cache_enabled = false
				level_chunk.payload = this.world.generate_chunk()
				level_chunk.write(this.connection)
			}
		}
	}

	#spawn() {
		Logger.info(Language.get_key("player.spawned", [this.name]))

		this.set_adventure_settings(
			false,
			false,
			false,
			true,
			true
		)
		this.set_commands_enabled(true)
		this.respawn(this.location)
		this.#send_join_message()
		this.set_fog([])
	}

	#send_join_message() {
		if (Boolean(ServerConfig.get("enable_join_messages"))) {
			this.server.broadcast_message(
				ChatColor.Yellow + Language.get_key("vanilla.multiplayer.player.joined"),
				ChatMessageType.Translation,
				undefined,
				[this.name]
			)
		}
	}

	/**
	 * Ticks the player.
	 * Useful for scheduling things without using setInterval()
	 */
	#tick() {
		EventEmitter.emit(
			new Event(
				EventType.PlayerTick,
				{
					player: this
				},
				(() => {
					if (this.server.enable_world) {
						const network_chunk_publisher_update = new NetworkChunkPublisherUpdate()
						network_chunk_publisher_update.coordinates = this.location
						network_chunk_publisher_update.radius = this.world.chunk_radius * 16
						network_chunk_publisher_update.saved_chunks = []
						network_chunk_publisher_update.write(this.connection)
					}
				})
			),
			false
		)
	}

	/**
	 * @param {import("frog-protocol").PlayStatus} status 
	 */
	send_play_status(status) {
		EventEmitter.emit(
			new Event(
				EventType.PlayerPlayStatusChange,
				{
					status,
					player: this
				},
				(() => {
					const play_status_packet = new PlayStatus()
					play_status_packet.status = status
					play_status_packet.write(this.connection)
				})
			)
		)
	}

	/**
	 * @param {boolean} no_pvm 
	 * @param {boolean} no_mvp 
	 * @param {boolean} immutable_world 
	 * @param {boolean} show_name_tags 
	 * @param {boolean} auto_jump 
	 */
	set_adventure_settings(
		no_pvm = false,
		no_mvp = false,
		immutable_world = false,
		show_name_tags = false,
		auto_jump = false
	) {
		EventEmitter.emit(
			new Event(
				EventType.PlayerSetAdventureSettings,
				{
					no_mvp,
					no_pvm,
					immutable_world,
					show_name_tags,
					auto_jump
				},
				(() => {
					const update_adventure_settings = new UpdateAdventureSettings()
					update_adventure_settings.no_mvp = no_mvp
					update_adventure_settings.no_pvm = no_pvm
					update_adventure_settings.immutable_world = immutable_world
					update_adventure_settings.auto_jump = auto_jump
				})
			)
		)
	}

	/**
	 * @param {string[]} stack 
	 */
	set_fog(stack) {
		EventEmitter.emit(
			new Event(
				EventType.PlayerSetFog,
				{
					player: this,
					stack
				},
				(() => {
					const player_fog = new PlayerFog()
					player_fog.stack = stack
					player_fog.write(this.connection)
				})
			)
		)
	}

	/**
	 * This is only handled client-side!
	 * 
	 * @param {boolean} enabled
	 */
	set_commands_enabled(enabled) {
		EventEmitter.emit(
			new Event(
				EventType.PlayerSetCommandsEnabled,
				{
					player: this,
					enabled
				},
				(() => {
					const set_commands_enabled = new SetCommandsEnabled()
					set_commands_enabled.enabled = enabled
					set_commands_enabled.write(this.connection)
				})
			)
		)
	}

	/**
	 * @param {Vec3} position 
	 */
	respawn(position) {
		EventEmitter.emit(
			new Event(
				EventType.PlayerRespawn,
				{
					player: this
				},
				(() => {
					const respawn = new Respawn()
					respawn.position = position
					respawn.runtime_entity_id = String(this.runtime_id)
					respawn.state = 0
					respawn.write(this.connection)
				})
			)
		)
	}

	/**
	 * @param {string} message 
	 * @param {string} [type=ChatMessageType.Raw] 
	 * @param {string} [sender=""] Only if type = ChatMessageType.Chat or ChatMessageType.Translation
	 * @param {string[]} parameters Only if type = ChatMessageType.Translation or ChatMessageType.Popup or ChatMessageType.JukeboxPopup
	 */
	send_message(message, type = ChatMessageType.Raw, sender = "", parameters = []) {
		EventEmitter.emit(
			new Event(
				EventType.ServerChat,
				{
					player: this,
					message,
					type,
					sender,
					parameters
				},
				(() => {
					const text_packet = new Text()
					text_packet.type = type
					text_packet.needs_translation = (type == ChatMessageType.Translation)
					text_packet.message = message
					text_packet.source_name = sender
					text_packet.platform_chat_id = String(this.runtime_id)
					text_packet.xuid = ""
					text_packet.parameters = parameters
					text_packet.write(this.connection)
				})
			)
		)
	}

	/**
	 * @param {number} time 
	 */
	set_time(time) {
		EventEmitter.emit(
			new Event(
				EventType.PlayerSetTime,
				{
					time
				},
				(() => {
					const time_packet = new SetTime()
					time_packet.time = time
					time_packet.write(this.connection)
				})
			)
		)
	}

	/**
	 * @param {Toast} toast 
	 */
	send_toast(toast) {
		const new_toast = new Toast()
		new_toast.from(toast)
		new_toast.send(this)
	}

	/**
	 * @param {string} address
	 * @param {number} port
	 */
	transfer(address, port) {
		EventEmitter.emit(
			new Event(
				EventType.PlayerTransfer,
				{
					player: this,
					address,
					port
				},
				(() => {
					const transfer = new Transfer()
					transfer.server_address = address
					transfer.port = port
					transfer.write(this.connection)
				})
			)
		)
	}

	/**
	 * @param {boolean} secure Should GreenFrog do extra checks to prevent ping spoofing? 
	 * @throws {Error} If the player is offline
	 * @returns {Promise<number>}
	 */
	async get_latency(secure = true) {
		let ms_without_reply = 0

		const interval = setInterval(() => {
			ms_without_reply++
		}, 1)

		const promise = new Promise((resolve, reject) => {
			EventEmitter.on(EventType.PacketReceived, (event) => {
				if (event.connection.profile.xuid === this.connection.profile.xuid) {
					if (!(event.packet.data.name === new NetworkStackLatency().name) && secure) {
						reject("Packets are out of order!")
					}
				}
			})

			EventEmitter.once(EventType.PacketNetworkStackLatencyResponse, (event) => {
				if (event.connection.profile.xuid === this.connection.profile.xuid) {
					clearInterval(interval)

					resolve(ms_without_reply)
				}
			})
		})

		if (this.offline) {
			clearInterval(interval)

			throw new Error("Player is offline")
		}

		const network_stack_latency = new NetworkStackLatency()
		network_stack_latency.timestamp = this.server.current_tick
		network_stack_latency.needs_response = true
		network_stack_latency.write(this.connection)

		const latency = await promise

		return latency
	}

	/**
	 * @param {string} [reason="You were disconnected"] 
	 */
	kick(reason = "You were disconnected") {
		EventEmitter.emit(
			new Event(
				EventType.PlayerKick,
				{
					player: this,
					reason
				},
				(() => {
					this.connection.disconnect(reason)
				})
			)
		)
	}

	on_leave() {
		EventEmitter.emit(
			new Event(
				EventType.PlayerLeave,
				{
					player: this
				}
			)
		)

		this.offline = true

		this.kick("Player disconnected")
	}

	/**
	 * @param {string} gamemode
	 */
	set_gamemode(gamemode) {
		EventEmitter.emit(
			new Event(
				EventType.PlayerGamemodeChange,
				{
					player: this,
					gamemode
				},
				(() => {
					this.gamemode = gamemode

					const set_player_game_type = new SetPlayerGameType()
					set_player_game_type.gamemode = gamemode
					set_player_game_type.write(this.connection)
				})
			)
		)
	}

	/**
	 * @param {number} radius 
	 */
	set_chunk_radius(radius) {
		EventEmitter.emit(
			new Event(
				EventType.PlayerChunkRadiusUpdate,
				{
					player: this,
					radius
				},
				(() => {
					const chunk_radius_update = new ChunkRadiusUpdate()
					chunk_radius_update.chunk_radius = radius
					chunk_radius_update.write(this.connection)
				})
			)
		)
	}

	/**
	 * @param {Vec3} position
	 * @param {Vec3} [rotation=new Vec3(0, 0, 0)]
	 * @param {string} [reason=TeleportReason.Unknown]
	 */
	teleport(position, rotation = new Vec3(0, 0, 0), reason = TeleportReason.Unknown) {
		EventEmitter.emit(
			new Event(
				EventType.PlayerTeleport,
				{
					player: this,
					position,
					rotation,
					reason
				},
				(() => {
					const move_entity_delta = new MoveEntityDelta()
					move_entity_delta.coordinates = position
					move_entity_delta.coordinates_rotation = rotation
					move_entity_delta.runtime_entity_id = this.runtime_id
					move_entity_delta.flags = {
						has_x: true,
						has_y: true,
						has_z: true,
						has_rot_x: undefined,
						has_rot_y: undefined,
						has_rot_z: true,
						on_ground: false,
						teleport: true,
						force_move: true
					}
					move_entity_delta.write(this.connection)
				})
			)
		)
	}

	/**
	 * @param {number} difficulty
	 */
	set_difficulty(difficulty) {
		EventEmitter.emit(
			new Event(
				EventType.PlayerSetDifficulty,
				{
					player: this,
					difficulty
				},
				(() => {
					const set_difficulty = new SetDifficulty()
					set_difficulty.difficulty = difficulty
					set_difficulty.write(this.connection)
				})
			)
		)
	}

	/**
	 * @returns {InetAddress}
	 */
	get_ip() {
		return this.connection.connection.address
	}

	/**
	 * @return {boolean}
	 */
	can_fly() {
		return this.gamemode === Gamemode.Creative
			|| this.gamemode === Gamemode.Spectator
			|| this.gamemode === Gamemode.CreativeSpectator
			|| this.gamemode === Gamemode.SurvivalSpectator
	}
}

export { Player }
