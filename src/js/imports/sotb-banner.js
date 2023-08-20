class sotbBanner {
	constructor() {
		this.STORAGE_KEY = "hide-sotb-banner"
		this.state = localStorage.getItem(this.STORAGE_KEY)

		this.banner = document.getElementById("sotb-banner")
		this.button = document.getElementById("sotb-banner-button")

		if (this.state) {
			this.setHidden()
		} else {
			this.banner.removeAttribute("hidden")
			this.button.addEventListener("click", this.setHidden.bind(this))
		}
	}

	setHidden() {
		localStorage.setItem(this.STORAGE_KEY, true)
		this.banner.hidden = true
	}
}

if ("HTMLElement" in window) {
	window.sotbBanner = new sotbBanner()
}

export default sotbBanner
