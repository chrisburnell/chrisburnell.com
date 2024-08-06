/**
 * URL Input
 * @class
 */
class UrlInput {
	/**
	 * @constructor
	 */
	constructor() {
		this.inputs.forEach((input) => {
			input.addEventListener("blur", (event) => {
				this.addDefaultScheme(event.target);
			});
			input.addEventListener("keypress", (event) => {
				if (event.key === "Enter") {
					this.addDefaultScheme(event.target);
				}
			});
		});
	}

	get inputs() {
		return document.querySelectorAll(`input[type="url"]`);
	}

	/**
	 * Add `http://` to URL input fields on blur or when Enter is pressed
	 * @param {HTMLElement} input - A URL input element.
	 */
	addDefaultScheme(input) {
		if (input.value.match(/^(?!https?:).+\..+/)) {
			input.value = `https://${input.value}`;
		}
	}
}

if ("HTMLElement" in window) {
	/**
	 * @type {UrlInput}
	 */
	window.UrlInput = new UrlInput();
}

/**
 * @type {UrlInput}
 */
export default UrlInput;
