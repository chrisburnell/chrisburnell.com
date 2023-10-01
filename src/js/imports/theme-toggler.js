/**
 * Theme Toggler
 * @class
 */
class ThemeToggler {
	/**
	 * @constructor
	 */
	constructor() {
		this.STORAGE_KEY = "theme"
		this.theme = localStorage.getItem(this.STORAGE_KEY)

		this.select = document.getElementById("theme-toggler")
		this.options = [...this.select.options]

		this.init()
	}

	/**
	 * Initialises the Theme Toggler.
	 */
	init() {
		this.select.addEventListener("change", this.onChange.bind(this))

		if (this.theme) {
			this.setTheme(this.theme)
			this.setSelected(this.theme)
		} else if (this.prefersDark) {
			this.setTheme("dark")
			this.setSelected("dark")
		}
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
		document.documentElement.setAttribute(`data-${this.STORAGE_KEY}`, id)
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
		this.theme = [...this.options].filter((option) => option.selected).map((option) => option.getAttribute("value"))[0]

		document.documentElement.classList.add("toggling")
		this.setTheme(this.theme)
		localStorage.setItem(this.STORAGE_KEY, this.theme)
		setTimeout(() => {
			document.documentElement.classList.remove("toggling")
		}, 1000)
	}
}

if ("HTMLElement" in window) {
	/**
	 * @type {ThemeToggler}
	 */
	window.ThemeToggler = new ThemeToggler()
}

/**
 * @type {ThemeToggler}
 */
export default ThemeToggler
