/**
 * @typedef TVec3
 * @property {number} x
 * @property {number} y
 * @property {number} z
 */

/**
 * @typedef TVec2
 * @property {number} x
 * @property {number} y
 */

class Math {
	/**
	 * @param {import("vec3").Vec3} vec 
	 * @returns {TVec3}
	 */
	static vec3_to_json(vec) {
		return {
			x: vec.x,
			y: vec.y,
			z: vec.z
		}
	}

	/**
	 * @param {import("vec2")} vec 
	 * @returns {TVec2}
	 */
	static vec2_to_json(vec) {
		return {
			x: vec.x,
			y: vec.y
		}
	}
}

export { Math }