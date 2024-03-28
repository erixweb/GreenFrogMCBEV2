class Experiment {
	/** @type {string | undefined} */
	name

	/** @type {boolean | undefined} */
	enabled

	to_json() {
		return {
			name: this.name,
			enabled: this.enabled
		}
	}
}

export { Experiment }
