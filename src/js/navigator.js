if (
	navigator.serviceWorker &&
	!/Headless/.test(navigator.userAgent) &&
	!new URLSearchParams(window.location.search).has("nosw")
) {
	navigator.serviceWorker
		.register("/serviceworker.js")
		.then((registration) => {
			if (registration.installing) {
				console.log(
					"Service Worker installing with scope",
					registration.scope,
				);
			} else if (registration.waiting) {
				console.log(
					"Service Worker installed with scope",
					registration.scope,
				);
			} else if (registration.active) {
				console.log(
					"Service Worker active with scope",
					registration.scope,
				);
			}
		})
		.catch((error) => {
			console.error("Service Worker Registration failed", error);
		});
	navigator.serviceWorker.ready.then((registration) => {
		registration.active.postMessage({
			command: "trimCaches",
		});
	});
}
