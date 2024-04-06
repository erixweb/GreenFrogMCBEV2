class EventType {
	static PlayerMovementValidationFail = "playerMovementValidationFail"
	static PlayerConnectionInitialized = "playerConnectionInitialized"
	static PlayerSetAdventureSettings = "playerSetAdventureSettings"
	static PlayerCameraPresetsUpdate = "playerCameraPresetsUpdate"
	static PlayerRequestChunkRadius = "playerRequestChunkRadius"
	static PlayerSetCommandsEnabled = "playerSetCommandsEnabled"
	static PlayerChunkRadiusUpdate = "playerChunkRadiusUpdate"
	static PlayerPlayStatusChange = "playerPlayStatusChange"
	static PlayerGamemodeChange = "playerGamemodeChange"
	static PlayerSetDifficulty = "playerSetDifficulty"
	static PlayerInitialized = "playerInitialized"
	static PlayerTeleport = "playerTeleport"
	static PlayerTransfer = "playerTransfer"
	static PlayerCreated = "playerCreated"
	static PlayerSetTime = "playerSetTime"
	static PlayerRespawn = "playerRespawn"
	static PlayerSetFog = "playerSetFog"
	static PlayerLeave = "playerLeave"
	static PlayerMove = "playerMove"
	static PlayerChat = "playerChat"
	static PlayerKick = "playerKick"
	static PlayerJoin = "playerJoin"
	static PlayerTick = "playerTick"

	static FormResponse = "formResponse"

	static WorldTick = "worldTick"
	static WorldPlaceBlock = "worldPlaceBlock"
	static WorldBreakBlock = "worldBreakBlock"

	static EntityTick = "entityTick"

	static PacketReceived = "packetReceived"
	static PacketNetworkStackLatencyResponse = "packetNetworkStackLatencyResponse"
	static ServerBroadcast = "serverBroadcast"
	static ServerToast = "serverToast"
	static ServerChat = "serverChat"
	static ServerTick = "serverTick"
	static ServerLog = "serverLog"
}

export { EventType }
