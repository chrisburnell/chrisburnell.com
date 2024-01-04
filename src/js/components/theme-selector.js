/**
 * Theme Selector
 * @class
 */
class ThemeSelector extends HTMLElement {
	static register(tagName) {
		if ("customElements" in window) {
			customElements.define(tagName || "theme-selector", ThemeSelector)
		}
	}

	connectedCallback() {
		this.STORAGE_KEY = this.dataset.key || "theme"
		this.DARK_THEME_KEY = this.dataset.darkThemeKey || "dark"
		this.ROOT_ELEMENT = document.querySelector(this.dataset.rootElement) || document.documentElement

		this.theme = localStorage.getItem(this.STORAGE_KEY)

		this.select.addEventListener("change", this.onChange.bind(this))

		if (this.theme) {
			this.setDataAttribute(this.theme)
			this.setSelectedOption(this.theme)
		} else if (this.prefersDark) {
			this.setDataAttribute(this.DARK_THEME_KEY)
			this.setSelectedOption(this.DARK_THEME_KEY)
		}
	}

	/**
	 * Grabs the select element.
	 * @returns {Array}
	 */
	get select() {
		return this.querySelector("select")
	}

	/**
	 * Grabs the options available within the select element.
	 * @returns {Array}
	 */
	get options() {
		return [...this.select.options]
	}

	/**
	 * Checks if the user prefers a dark color scheme.
	 * @returns {Boolean} True if the user prefers dark color scheme, false otherwise.
	 */
	get prefersDark() {
		return window.matchMedia("(prefers-color-scheme: dark)").matches
	}

	/**
	 * Sets the theme as a data attribute on the root element.
	 * @param {string} value - The option element’s value for the desired theme.
	 */
	setDataAttribute(value) {
		this.ROOT_ELEMENT.setAttribute(`data-${this.STORAGE_KEY}`, value)
	}

	/**
	 * Sets the selected theme option in the select element.
	 * @param {string} value - The option element’s value for the desired theme.
	 */
	setSelectedOption(value) {
		this.options.forEach((option) => {
			if (option.value === value) {
				option.selected = true
			}
		})
	}

	/**
	 * Event handler for the selecting a new theme in the select element.
	 */
	onChange() {
		this.theme = this.options
			.filter((option) => option.selected)
			.map((option) => option.value)[0]

		this.ROOT_ELEMENT.classList.add("transition")

		this.setDataAttribute(this.theme)
		localStorage.setItem(this.STORAGE_KEY, this.theme)

		setTimeout(() => {
			this.ROOT_ELEMENT.classList.remove("transition")
		}, 1000)
	}
}

ThemeSelector.register()
