/**
 * Navigator
 * @author Chris Burnell <me@chrisburnell.com>
 */
if (navigator.serviceWorker) {
	navigator.serviceWorker
		.register("/serviceworker.js")
		.then((registration) => {
			console.log("ServiceWorker registration successful with scope:", registration.scope)
			let serviceWorker
			if (registration.installing) {
				serviceWorker = registration.installing
			} else if (registration.waiting) {
				serviceWorker = registration.waiting
			} else if (registration.active) {
				serviceWorker = registration.active
			}
		})
		.catch((err) => {
			console.log("ServiceWorker registration failed:", err)
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
