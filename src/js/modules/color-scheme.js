class ColorScheme {
	constructor(button) {
		this.STORAGE_KEY = "color-scheme"

		this.button = button
		this.buttonText = button.querySelector(".js-color-scheme-status")
		this.colorScheme = localStorage.getItem(this.STORAGE_KEY)

		this.init()
	}

	get prefersDark() {
		return window.matchMedia("(prefers-color-scheme: dark)").matches
	}

	get prefersLight() {
		return window.matchMedia("(prefers-color-scheme: light)").matches
	}

	get noPreference() {
		return window.matchMedia("(prefers-color-scheme: no-preference)").matches
	}

	get matchesLight() {
		if (this.colorScheme === "light") return true
		if (!this.colorScheme && this.prefersLight) return true
		if (!this.colorScheme && this.noPreference) return true
		return false
	}

	setPreference(preference) {
		const oppositePreference = preference === "dark" ? "light" : "dark"

		document.documentElement.setAttribute(`data-${this.STORAGE_KEY}`, preference)
		this.buttonText.innerText = `Enable ${oppositePreference} mode`
	}

	init() {
		this.button.addEventListener("click", this.onClick.bind(this))

		if (this.colorScheme) {
			this.setPreference(this.colorScheme)
		} else if (!this.matchesLight) {
			this.buttonText.innerText = `Enable light mode`
		}
	}

	onClick() {
		this.colorScheme = this.matchesLight ? "dark" : "light"

		this.setPreference(this.colorScheme)
		localStorage.setItem(this.STORAGE_KEY, this.colorScheme)
	}
}

export default ColorScheme
