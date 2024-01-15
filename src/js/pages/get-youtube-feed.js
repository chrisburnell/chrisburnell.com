/**
 * Get YouTube RSS Feed
 * @class
 */
class GetYouTubeFeed {
	/**
	 * @connectedCallback
	 */
	connectedCallback() {
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

	/**
	 * Figures out how to extract the channel from the input URL and then
	 * injects the input to hold the URL of the respective feed.
	 */
	convertURL() {
		const url = this.input.value

		if (url.includes("/channel/")) {
			const channel = url.split("/channel/")[1].replace(/\/$/, "")
			this.input.value = `https://www.youtube.com/feeds/videos.xml?channel_id=${channel}`
		}
	}
}

if ("HTMLElement" in window) {
	/**
	 * @type {GetYouTubeFeed}
	 */
	window.GetYouTubeFeed = new GetYouTubeFeed()
}

/**
 * @type {GetYouTubeFeed}
 */
export default GetYouTubeFeed
