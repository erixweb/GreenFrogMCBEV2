class EventType {
	static PlayerConnectionInitialized = "playerConnectionInitialized"
	static PlayerSetAdventureSettings = "playerSetAdventureSettings"
	static PlayerSetCommandsEnabled = "playerSetCommandsEnabled"
	static PlayerPlayStatusChange = "playerPlayStatusChange"
	static PlayerInitialized = "playerInitialized"
	static PlayerSetTime = "playerSetTime"
	static PlayerRespawn = "playerRespawn"
	static PlayerSetFog = "playerSetFog"
	static PlayerLeave = "playerLeave"
	static PlayerKick = "playerKick"
	static PlayerJoin = "playerJoin"
	static PlayerTick = "playerTick"

	static EntityTick = "entityTick"

	static PacketHandled = "packetHandled"
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