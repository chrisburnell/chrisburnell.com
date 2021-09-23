/*!
 * Navigator
 * @author Chris Burnell <me@chrisburnell.com>
 */
if (navigator.serviceWorker) {
    navigator.serviceWorker
        .register("/serviceworker.js")
        .then((registration) => {
            console.log("ServiceWorker registration successful with scope:", registration.scope);
            let serviceWorker;
            if (registration.installing) {
                serviceWorker = registration.installing;
            }
            else if (registration.waiting) {
                serviceWorker = registration.waiting;
            }
            else if (registration.active) {
                serviceWorker = registration.active;
            }
        })
        .catch((err) => {
            console.log("ServiceWorker registration failed:", err);
        });
    window.addEventListener("load", () => {
        window.addEventListener("online", updateNetwork);
        window.addEventListener("offline", updateNetwork);
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                command: "trimCaches",
            });
        }
    });
}
else {
    console.log("ServiceWorkers are not supported in your browser.");
}
if (navigator.share) {
    navigator
        .share({
            title: document.querySelector("title").textContent,
            url: document.querySelector("link[rel='canonical']").getAttribute("href"),
            // breaks in iOS, copies text to clipboard instead of URL
            // text: document.querySelector("meta[name='description']").getAttribute("content")
        })
        .then(() => {
            console.log("Successfully shared the page");
        })
        .catch((error) => {
            console.log("Error sharing the page", error);
        });
}
