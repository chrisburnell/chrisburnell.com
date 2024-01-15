/**
 * Share Button
 * @class
 */
class ShareButton {
	/**
	 * @connectedCallback
	 */
	connectedCallback() {
		this.test = document.createElement("button")
		this.test.setAttribute("type", "share")

		this.button = document.querySelector("button[type=share]")

		if (this.test.type !== "share" && this.button) {
			this.button.addEventListener("click", (event) => {
				event.preventDefault()

				const title = document.querySelector("title").innerText
				const url = window.location.href

				if (navigator.share) {
					navigator
						.share({
							title: title,
							url: url,
						})
						.catch((error) => console.error("Error Sharing", error))
				} else {
					window.location.href = "mailto:?subject=" + title + "&body=" + url
				}
			})
		}
	}
}

if ("HTMLElement" in window) {
	/**
	 * @type {ShareButton}
	 */
	window.ShareButton = new ShareButton()
}

/**
 * @type {ShareButton}
 */
export default ShareButton
