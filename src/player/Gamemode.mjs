class Gamemode {
	static Survival = "survival"
	static Creative = "creative"
	static Adventure = "adventure"
	static SurvivalSpectator = "survival_spectator"
	static CreativeSpectator = "creative_spectator"
	static Fallback = "fallback"
	static Spectator = "spectator"


	/**
	 * @param {Gamemode} gamemode 
	 * @returns {number | undefined} 
	 */
	static to_number(gamemode) {
		const gamemodes = {
			"survival": 0,
			"creative": 1,
			"adventure": 2,
			"survival_spectator": 3,
			"creative_spectator": 4,
			"fallback": 5,
			"spectator": 6
		}
		

		return gamemodes[gamemode]
	}
}

export { Gamemode }