if (navigator.serviceWorker && !/Headless/.test(navigator.userAgent)) {
	navigator.serviceWorker
		.register("/serviceworker.js")
		.then((registration) => {
			if (registration.installing) {
				console.log("Service Worker installing with scope", registration.scope)
			} else if (registration.waiting) {
				console.log("Service Worker installed with scope", registration.scope)
			} else if (registration.active) {
				console.log("Service Worker active with scope", registration.scope)
			}
		})
		.catch((error) => {
			console.error("Service Worker Registration failed", error)
		})
	window.addEventListener("load", () => {
		if (navigator.serviceWorker.controller) {
			navigator.serviceWorker.controller.postMessage({
				command: "trimCaches",
			})
		}
	})
} else {
	console.log("Service Workers are not supported in your browser.")
}
