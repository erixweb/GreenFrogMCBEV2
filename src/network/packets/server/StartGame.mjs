import { PermissionLevel } from "../../../permissions/PermissionLevel.mjs"
import { ChatRestrictionLevel } from "../types/ChatRestrictionLevel.mjs"
import { MovementAuthority } from "../types/MovementAuthority.mjs"
import { EduResourceUri } from "../types/EduResourceUri.mjs"
import { PropertyData } from "../types/PropertyData.mjs"
import { Gamemode } from "../../../player/Gamemode.mjs"
import { Gamerule } from "../../../world/Gamerule.mjs"
import { Experiment } from "../types/Experiment.mjs"
import { ItemState } from "../types/ItemState.mjs"
import { Math } from "../../../utils/Math.mjs"
import { UUID } from "../../../utils/UUID.mjs"
import { Seed } from "../types/Seed.mjs"
import { Packet } from "../Packet.mjs"
import { Vec3 } from "vec3"
import Vec2 from "vec2"

class StartGame extends Packet {
	name = "start_game"

	/** @type {number} */
	entity_id = 0

	/** @type {string} */
	gamemode = Gamemode.Fallback

	/** @type {Vec3} */
	player_position = new Vec3(0, 0, 0)

	/** @type {Vec2} */
	rotation = new Vec2(0, 0)

	/** @type {Seed} */
	seed = new Seed(0, 0)

	/** @type {number | undefined} */
	biome_type

	/** @type {string | undefined} */
	biome_name

	/** @type {number | undefined} */
	generator

	/** @type {string | undefined} */
	dimension

	/** @type {string} */
	world_gamemode = Gamemode.Survival

	/** @type {number | undefined} */
	difficulty

	/** @type {Vec3} */
	spawn_position = new Vec3(0, 0, 0)

	/** 
	 * @type {boolean}
	 * 
	 * Only set this to false if you want to spawn the player in survival mode + with commands disabled, otherwise the client will crash
	 */
	achievements_disabled = true

	/** @type {string | undefined} */
	editor_world_type

	/** @type {boolean | undefined} */
	created_in_editor

	/** @type {boolean | undefined} */
	exported_from_editor

	/** @type {number | undefined} */
	day_cycle_stop_time = 20

	/** @type {number | undefined} */
	edu_offer = 0

	/** @type {boolean | undefined} */
	edu_features_enabled = false

	/** @type {string | undefined} */
	edu_product_uuid = ""

	/** @type {number | undefined} */
	rain_level

	/** @type {number | undefined} */
	lightning_level // ???

	/** @type {boolean | undefined} */
	has_confirmed_platform_locked_content = false

	/** @type {boolean | undefined} */
	is_multiplayer = true

	/** @type {boolean | undefined} */
	broadcast_to_lan = true

	/** @type {number | undefined} */
	xbox_live_broadcast_mode = 6

	/** @type {number | undefined} */
	platform_broadcast_mode = 6

	/** @type {boolean | undefined} */
	enable_commands = true

	/** @type {boolean | undefined} */
	is_texturepacks_required = true

	/** @type {Gamerule[]} */
	gamerules = []

	/** @type {Experiment[]} */
	experiments = []

	/** @type {boolean} */
	experiments_previously_used = false

	/** @type {boolean} */
	bonus_chest = false

	/** @type {boolean} */
	map_enabled = false

	/** @type {number} */
	permission_level = PermissionLevel.Visitor

	/** @type {number} */
	server_chunk_tick_range = 4

	/** @type {boolean} */
	has_locked_behavior_pack = false

	/** @type {boolean} */
	has_locked_resource_pack = false

	/** @type {boolean} */
	is_from_locked_world_template = false

	/** @type {boolean} */
	msa_gamertags_only = true

	/** @type {boolean} */
	is_from_world_template = false

	/** @type {boolean} */
	is_world_template_option_locked = false

	/** @type {boolean} */
	only_spawn_v1_villagers = false

	/** @type {boolean} */
	persona_disabled = false

	/** @type {boolean} */
	custom_skins_disabled = false

	/** @type {boolean} */
	emote_chat_muted = false

	/** @type {import("frog-protocol").Version | "*"} */
	game_version = "*"

	/** @type {number} */
	limited_world_width = 16

	/** @type {number} */
	limited_world_length = 16

	/** @type {boolean} */
	is_new_nether = false

	/** @type {EduResourceUri} */
	edu_resource_uri = new EduResourceUri("", "")

	/** @type {boolean} */
	experimental_gameplay_override = false

	/** @type {string} */
	chat_restriction_level = ChatRestrictionLevel.None

	/** @type {boolean} */
	disable_player_interactions = false

	/** @type {string} */
	level_id = ""

	/** @type {string} */
	world_name = ""

	/** @type {string} */
	premium_world_template_id = UUID.DEFAULT_UUID

	/** @type {boolean} */
	is_trial = false

	/** @type {string} */
	movement_authority = MovementAuthority.Server

	/** @type {number} */
	rewind_history_size = 40

	/** @type {boolean} */
	server_authoritative_block_breaking = false

	/** @type {number[]} */
	current_tick = [0, 0]

	/** @type {number} */
	enchantment_seed = 0

	/** @type {any} TEMP */
	block_properties = []

	/** @type {ItemState[]} */
	itemstates = []

	/** @type {string} */
	multiplayer_correlation_id = ""

	/** @type {boolean} */
	server_authoritative_inventory = true

	/** @type {string} */
	engine = ""

	/** @type {PropertyData} */
	property_data = new PropertyData("", "", {})

	/** @type {number[]} */
	block_pallette_checksum = [0, 0]

	/** @type {string} */
	world_template_id = UUID.DEFAULT_UUID

	/** @type {boolean} */
	client_side_generation = false

	/** @type {boolean} */
	block_network_ids_are_hashes = true

	/** @type {boolean} */
	server_controlled_sound = false

	/**
	 * @param {import("frog-protocol").Connection} connection 
	 */
	write(connection) {
		let gamerules_sanitized = this.gamerules || []

		if (this.gamerules[0] instanceof Gamerule) {
			gamerules_sanitized = this.gamerules.map(gamerule => gamerule.toJSON())
		}

		const expirements_sanitized = this.experiments.map(expirement => expirement.toJSON())

		let itemstates_sanitized = this.itemstates || []

		if (this.gamerules[0] instanceof ItemState) {
			itemstates_sanitized = this.itemstates.map(itemstate => itemstate.toJSON())
		}

		connection.queue(this.name, {
			entity_id: String(this.entity_id),
			runtime_entity_id: String(this.entity_id),
			player_gamemode: this.gamemode,
			player_position: Math.vec3_to_json(this.player_position),
			rotation: { x: this.rotation.x, z: this.rotation.y },
			seed: this.seed.parts,
			biome_type: this.biome_type,
			biome_name: this.biome_name,
			dimension: this.dimension,
			generator: this.generator,
			world_gamemode: this.world_gamemode,
			difficulty: this.difficulty,
			spawn_position: Math.vec3_to_json(this.spawn_position),
			achievements_disabled: this.achievements_disabled,
			editor_world_type: this.editor_world_type,
			created_in_editor: this.created_in_editor,
			exported_from_editor: this.exported_from_editor,
			day_cycle_stop_time: this.day_cycle_stop_time,
			edu_offer: this.edu_offer,
			edu_features_enabled: this.edu_features_enabled,
			edu_product_uuid: this.edu_product_uuid,
			rain_level: this.rain_level,
			lightning_level: this.lightning_level,
			has_confirmed_platform_locked_content: this.has_confirmed_platform_locked_content,
			is_multiplayer: this.is_multiplayer,
			broadcast_to_lan: this.broadcast_to_lan,
			xbox_live_broadcast_mode: this.xbox_live_broadcast_mode,
			platform_broadcast_mode: this.platform_broadcast_mode,
			enable_commands: this.enable_commands,
			is_texturepacks_required: this.is_texturepacks_required,
			gamerules: gamerules_sanitized,
			experiments: expirements_sanitized,
			experiments_previously_used: this.experiments_previously_used,
			bonus_chest: this.bonus_chest,
			map_enabled: this.map_enabled,
			permission_level: this.permission_level,
			server_chunk_tick_range: this.server_chunk_tick_range,
			has_locked_behavior_pack: this.has_locked_behavior_pack,
			has_locked_resource_pack: this.has_locked_resource_pack,
			is_from_locked_world_template: this.is_from_locked_world_template,
			msa_gamertags_only: this.msa_gamertags_only,
			is_from_world_template: this.is_from_world_template,
			is_world_template_option_locked: this.is_world_template_option_locked,
			only_spawn_v1_villagers: this.only_spawn_v1_villagers,
			persona_disabled: this.persona_disabled,
			custom_skins_disabled: this.custom_skins_disabled,
			emote_chat_muted: this.emote_chat_muted,
			game_version: this.game_version,
			limited_world_width: this.limited_world_width,
			limited_world_length: this.limited_world_length,
			is_new_nether: this.is_new_nether,
			edu_resource_uri: this.edu_resource_uri.toJSON(),
			chat_restriction_level: this.chat_restriction_level,
			disable_player_interactions: this.disable_player_interactions,
			level_id: this.level_id,
			world_name: this.world_name,
			premium_world_template_id: this.premium_world_template_id,
			is_trial: this.is_trial,
			movement_authority: this.movement_authority,
			rewind_history_size: this.rewind_history_size,
			server_authoritative_block_breaking: this.server_authoritative_block_breaking,
			current_tick: this.current_tick,
			enchantment_seed: this.enchantment_seed,
			block_properties: this.block_properties,
			itemstates: itemstates_sanitized,
			multiplayer_correlation_id: this.multiplayer_correlation_id,
			server_authoritative_inventory: this.server_authoritative_inventory,
			engine: this.engine,
			property_data: this.property_data.toJSON(),
			block_pallette_checksum: this.block_pallette_checksum,
			world_template_id: this.world_template_id,
			client_side_generation: this.client_side_generation,
			block_network_ids_are_hashes: this.block_network_ids_are_hashes,
			server_controlled_sound: this.server_controlled_sound
		})
	}
}

export { StartGame }