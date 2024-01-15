/**
 * URL Input
 * @class
 */
class UrlInput {
	/**
	 * @connectedCallback
	 */
	connectedCallback() {
		this.inputs = document.querySelectorAll('input[type="url"]')

		this.inputs.forEach((input) => {
			input.addEventListener("blur", (event) => {
				this.addDefaultScheme(event.target)
			})
			input.addEventListener("keypress", (event) => {
				if (event.key === "Enter") {
					this.addDefaultScheme(event.target)
				}
			})
		})
	}

	/**
	 * Add `http://` to URL input fields on blur or when Enter is pressed
	 * @param {HTMLElement} input - A URL input element.
	 */
	addDefaultScheme(input) {
		if (input.value.match(/^(?!https?:).+\..+/)) {
			input.value = `https://${input.value}`
		}
	}
}

if ("HTMLElement" in window) {
	/**
	 * @type {UrlInput}
	 */
	window.UrlInput = new UrlInput()
}

/**
 * @type {UrlInput}
 */
export default UrlInput
