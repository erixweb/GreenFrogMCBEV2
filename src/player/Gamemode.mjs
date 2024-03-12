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
		switch (gamemode) {
			case this.Survival:
				return 0
			case this.Creative:
				return 1
			case this.Adventure:
				return 2
			case this.SurvivalSpectator:
				return 3
			case this.CreativeSpectator:
				return 4
			case this.Fallback:
				return 5
			case this.Spectator:
				return 6
			default:
				return undefined
		}
	}
}

export { Gamemode }