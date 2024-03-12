class Experiment {
	/** @type {string | undefined} */
	name

	/** @type {boolean | undefined} */
	enabled

	toJSON() {
		return {
			name: this.name,
			enabled: this.enabled
		}
	}
}

export { Experiment }