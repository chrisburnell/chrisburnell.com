/*!
 * Navigator
 * @author Chris Burnell <me@chrisburnell.com>
 */

(() => {
    "use strict";

    const notification = document.querySelector(".notification");

    let updateNotification = (text, type = "positive") => {
        notification.innerHTML = text;
        notification.classList.add(`notification--${type}`);
        notification.hidden = false;
        setTimeout(() => {
            notification.hidden = true;
            notification.classList.remove(`notification--${type}`);
        }, 1000);
    };

    let updateNetwork = () => {
        if (navigator.onLine) {
            console.log("You have regained your network connection.");
            notification.innerHTML = "👍 You have regained your network connection.";
            notification.classList.add("notification--positive");
        } else {
            console.log("You have lost your network connection.");
            notification.innerHTML = "👎 You have lost your network connection.";
            notification.classList.add("notification--negative");
        }
        notification.hidden = false;
        setTimeout(() => {
            notification.hidden = true;
            notification.classList.remove("notification--positive", "notification--negative");
        }, 1000);
    };

    if (!!navigator.serviceWorker) {
        navigator.serviceWorker
            .register("/serviceworker.js")
            .then(registration => {
                console.log("ServiceWorker registration successful with scope:", registration.scope);
                let serviceWorker;
                if (registration.installing) {
                    serviceWorker = registration.installing;
                } else if (registration.waiting) {
                    serviceWorker = registration.waiting;
                } else if (registration.active) {
                    serviceWorker = registration.active;
                }
                if (serviceWorker) {
                    serviceWorker.addEventListener("statechange", () => {
                        if (registration.active && !navigator.serviceWorker.controller) {
                            updateNotification("🤩 All cached and ready to go offline!", "positive");
                        }
                    });
                }
            })
            .catch(err => {
                console.log("ServiceWorker registration failed:", err);
            });
        window.addEventListener("load", () => {
            window.addEventListener("online", updateNetwork);
            window.addEventListener("offline", updateNetwork);
            if (!!navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({
                    command: "trimCaches"
                });
            }
        });
    } else {
        console.log("ServiceWorkers are not supported in your browser.");
    }

    if (!!navigator.share) {
        navigator
            .share({
                title: document.querySelector("title").textContent,
                url: document.querySelector("link[rel='canonical']").getAttribute("href")
                // breaks in iOS, copies text to clipboard instead of URL
                // text: document.querySelector("meta[name='description']").getAttribute("content")
            })
            .then(() => {
                console.log("Successfully shared the page");
            })
            .catch(error => {
                console.log("Error sharing the page", error);
            });
    }
})();
