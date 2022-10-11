class UrlInput {
	constructor() {
		this.inputs = document.querySelectorAll('input[type="url"]')

		this.init()
	}

	/**
	 * Add `http://` to URL input fields on blur or when Enter is pressed
	 */
	addDefaultScheme(target) {
		if (target.value.match(/^(?!https?:).+\..+/)) {
			target.value = `https://${target.value}`
		}
	}

	init() {
		this.inputs.forEach((input) => {
			input.addEventListener("blur", (event) => {
				addDefaultScheme(event.target)
			})
			input.addEventListener("keydown", (event) => {
				if (event.keyCode == 13) {
					addDefaultScheme(event.target)
				}
			})
		})
	}
}

if ("HTMLElement" in window) {
	window.UrlInput = new UrlInput()
}

export default UrlInput
