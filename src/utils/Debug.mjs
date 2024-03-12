class Debug {
	static is_debug() {
		return process.argv.includes("--debug")
	}
}

export { Debug }