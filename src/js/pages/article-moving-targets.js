;(function () {
	"use strict"

	const endButton = document.querySelector(".js-end-adventure")

	if (endButton) {
		endButton.addEventListener("click", (event) => {
			event.preventDefault()

			if (window.confirm("Are you sure you wish to end this chapter?")) {
				window.open("", "_self", "")
				window.close()
				history.back(-1)
			}
		})
	}
})()
