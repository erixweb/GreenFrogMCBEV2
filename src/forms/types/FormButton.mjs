import { FormButtonImage } from "./FormButtonImage.mjs"

class FormButton {
    /** @type {string} */
    text

    /** @type {FormButtonImage} */
    image

    constructor(text, image = new FormButtonImage("", "")) {
        this.text = text
        this.image = image
    }

    toJSON() {
        return {
            text: this.text,
            image: this.image.toJSON()
        }
    }
}

export { FormButton }
