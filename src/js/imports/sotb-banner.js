/**
 * SotB Banner
 * @class
 */
class sotbBanner {
	/**
	 * @constructor
	 */
	constructor() {
		this.HIDE_KEY = "hide-sotb-banner"
		this.OPEN_KEY = "open-sotb-banner"
		this.hide = localStorage.getItem(this.HIDE_KEY)
		this.open = localStorage.getItem(this.OPEN_KEY)

		this.banner = document.getElementById("sotb-banner")
		this.button = document.getElementById("sotb-banner-button")

		if (this.banner) {
			this.banner.addEventListener("toggle", this.toggleOpen.bind(this))
			if (this.open === "false") {
				this.banner.removeAttribute("open")
			}
			if (this.hide) {
				this.setHidden()
			} else if (this.button) {
				this.button.removeAttribute("hidden")
				this.button.addEventListener("click", this.setHidden.bind(this))
			}
		}
	}

	/**
	 * Hides the banner.
	 */
	setHidden() {
		localStorage.setItem(this.HIDE_KEY, true)
		this.banner.hidden = true
	}

	/**
	 * Opens/Closes the details element enclosing the banner contents.
	 */
	toggleOpen() {
		localStorage.setItem(this.OPEN_KEY, this.banner.open)
	}
}

if ("HTMLElement" in window) {
	/**
	 * @type {sotbBanner}
	 */
	window.sotbBanner = new sotbBanner()
}

/**
 * @type {sotbBanner}
 */
export default sotbBanner
