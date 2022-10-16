class ShareButton {
	constructor() {
		this.test = document.createElement("button")
		this.test.setAttribute("type", "share")

		this.button = document.querySelector("button[type=share]")

		if (this.test.type !== "share" && this.button) {
			this.init()
		}
	}

	init() {
		this.button.addEventListener("click", (event) => {
			event.preventDefault()

			const title = document.querySelector("title").innerText
			const url = window.location.href

			if (navigator.share) {
				navigator.share({
					title: title,
					url: url,
				})
			} else {
				window.location.href = "mailto:?subject=" + title + "&body=" + url
			}
		})
	}
}

if ("HTMLElement" in window) {
	window.ShareButton = new ShareButton()
}

export default ShareButton
