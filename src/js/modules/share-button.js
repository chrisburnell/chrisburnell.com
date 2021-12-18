const shareButton = () => {
	const testButton = document.createElement("button")
	testButton.setAttribute("type", "share")
	if (testButton.type !== "share") {
		const button = document.querySelector("button[type=share]")
		if (button) {
			button.addEventListener("click", (event) => {
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
}

export default shareButton
