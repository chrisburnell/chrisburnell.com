if (navigator.serviceWorker) {
	navigator.serviceWorker
		.register("/serviceworker.js")
		.then((registration) => {
			let serviceWorker
			if (registration.installing) {
				serviceWorker = registration.installing
			} else if (registration.waiting) {
				serviceWorker = registration.waiting
			} else if (registration.active) {
				serviceWorker = registration.active
			}
		})
		.catch((error) => {
			console.log("ServiceWorker Registration failed", error)
		})
	window.addEventListener("load", () => {
		if (navigator.serviceWorker.controller) {
			navigator.serviceWorker.controller.postMessage({
				command: "trimCaches",
			})
		}
	})
} else {
	console.log("ServiceWorkers are not supported in your browser.")
}
