class GetYouTubeFeed {
	constructor() {
		this.form = document.querySelector(".get-youtube-feed")
		this.input = this.form.querySelector("input")

		this.form.addEventListener("submit", (event) => {
			event.preventDefault()
			this.convertURL()
			this.input.focus()
		})

		this.input.addEventListener("blur", (event) => {
			event.preventDefault()
			this.convertURL()
		})
	}

	convertURL() {
		const url = this.input.value

		if (url.includes("/channel/")) {
			const channel = url.split("/channel/")[1].replace(/\/$/, "")
			this.input.value = `https://www.youtube.com/feeds/videos.xml?channel_id=${channel}`
		}
	}
}

if ("HTMLElement" in window) {
	window.GetYouTubeFeed = new GetYouTubeFeed()
}

export default GetYouTubeFeed
