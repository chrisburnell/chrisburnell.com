/**
 * Theme Selector
 * @class
 */
class ThemeSelector extends HTMLElement {
	static register(tagName) {
		if ("customElements" in window) {
			customElements.define(tagName || "theme-selector", ThemeSelector);
		}
	}

	/**
	 * @constructor
	 */
	connectedCallback() {
		this.STORAGE_KEY = "theme"
		this.theme = localStorage.getItem(this.STORAGE_KEY)

		this.select.addEventListener("change", this.onChange.bind(this))

		if (this.theme) {
			this.setTheme(this.theme)
			this.setSelected(this.theme)
		} else if (this.prefersDark) {
			this.setTheme("dark")
			this.setSelected("dark")
		}
	}

	get root() {
		return document.documentElement
	}

	/**
	 * Grabs the select element associated with the Theme Selector.
	 * @returns {HTMLSelectElement}
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
	 * Sets the theme for the website.
	 * @param {string} id - The ID of the selected theme.
	 */
	setTheme(id) {
		this.root.setAttribute(`data-${this.STORAGE_KEY}`, id)
	}

	/**
	 * Sets the selected theme option in the <select>.
	 * @param {string} id - The ID of the selected theme.
	 */
	setSelected(id) {
		this.options.forEach((option) => {
			if (option.value === id) {
				option.selected = true
			}
		})
	}

	/**
	 * Event handler for the theme change.
	 */
	onChange() {
		this.theme = this.options
			.filter((option) => option.selected)
			.map((option) => option.getAttribute("value"))[0]

		this.root.classList.add("transition")
		this.setTheme(this.theme)
		localStorage.setItem(this.STORAGE_KEY, this.theme)
		setTimeout(() => {
			this.root.classList.remove("transition")
		}, 1000)
	}
}

ThemeSelector.register()
