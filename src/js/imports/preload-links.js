class PreloadLinks {
	constructor() {
		if ("connection" in navigator) {
			if (navigator.connection.saveData === true) {
				return
			}
			if (navigator.connection.effectiveType && navigator.connection.effectiveType !== "4g") {
				return
			}
		}

		this.head = document.querySelector("head")
		this.anchors = document.querySelectorAll("[href]:not([href^='#'])")
		this.preloadedLinks = []
		this.preloadTimeout

		this.init()
	}

	static preloadWait = 150

	init() {
		this.anchors.forEach((anchor) => {
			const href = anchor.getAttribute("href").split("#")[0]
			anchor.addEventListener("mouseover", () => {
				if (!this.preloadedLinks.includes(href)) {
				this.preloadTimeout = setTimeout(() => {
					this.preloadedLinks.push(href)

					const preloadedLink = document.createElement("link")
					preloadedLink.href = href
					preloadedLink.rel = "preload"
					preloadedLink.as = "fetch"

					this.head.appendChild(preloadedLink)
				}, PreloadLinks.preloadWait)
				}
			})

			anchor.addEventListener("mouseout", () => {
				clearTimeout(this.preloadTimeout)
			})
		})
	}
}

if ("HTMLElement" in window) {
	window.PreloadLinks = new PreloadLinks()
}

export default PreloadLinks
