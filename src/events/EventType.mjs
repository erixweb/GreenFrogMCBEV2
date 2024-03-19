class EventType {
	static PlayerConnectionInitialized = "playerConnectionInitialized"
	static PlayerSetAdventureSettings = "playerSetAdventureSettings"
	static PlayerRequestChunkRadius = "playerRequestChunkRadius"
	static PlayerSetCommandsEnabled = "playerSetCommandsEnabled"
	static PlayerChunkRadiusUpdate = "playerChunkRadiusUpdate"
	static PlayerPlayStatusChange = "playerPlayStatusChange"
	static PlayerGamemodeChange = "playerGamemodeChange"
	static PlayerSetDifficulty = "playerSetDifficulty"
	static PlayerInitialized = "playerInitialized"
	static PlayerTransfer = "playerTransfer"
	static PlayerCreated = "playerCreated"
	static PlayerSetTime = "playerSetTime"
	static PlayerRespawn = "playerRespawn"
	static PlayerSetFog = "playerSetFog"
	static PlayerLeave = "playerLeave"
	static PlayerChat = "playerChat"
	static PlayerKick = "playerKick"
	static PlayerJoin = "playerJoin"
	static PlayerTick = "playerTick"

	static EntityTick = "entityTick"

	static PacketReceived = "packetReceived"
	static PacketNetworkStackLatencyResponse = "packetNetworkStackLatencyResponse"

	static WorldGenerate = "worldGenerate"

	static ServerBroadcast = "serverBroadcast"
	static ServerToast = "serverToast"
	static ServerChat = "serverChat"
	static ServerTick = "serverTick"
	static ServerLog = "serverLog"
}

export { EventType }
