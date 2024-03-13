class EventType {
	static PlayerConnectionInitialized = "playerConnectionInitialized"
	static PlayerSetAdventureSettings = "playerSetAdventureSettings"
	static PlayerSetCommandsEnabled = "playerSetCommandsEnabled"
	static PlayerPlayStatusChange = "playerPlayStatusChange"
	static PlayerInitialized = "playerInitialized"
	static PlayerSetTime = "playerSetTime"
	static PlayerRespawn = "playerRespawn"
	static PlayerSetFog = "playerSetFog"
	static PlayerJoin = "playerJoin"
	static PlayerTick = "playerTick"

	static EntityTick = "entityTick"

	static ServerLog = "serverLog"
	static ServerChat = "serverChat"
	static ServerTick = "serverTick"
	static ServerBroadcast = "serverBroadcast"
}

export { EventType }