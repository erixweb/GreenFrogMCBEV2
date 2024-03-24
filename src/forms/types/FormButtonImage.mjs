class FormButtonImage {
    /** @type {string} */
    type = ""

    /** @type {string} */
    data = ""

    /**
     * @param {string} type
     * @param {string} data
     */
    constructor(type, data) {
        this.data = data
        this.type = type
    }

    toJSON() {
        return {
            data: this.data,
            type: this.type
        }
    }
}

export { FormButtonImage }
