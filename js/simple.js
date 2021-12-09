(function () {
	'use strict';

	const colorScheme = () => {
		const STORAGE_KEY = "user-color-scheme";
		const COLOR_SCHEME_KEY = "--color-scheme";

		const schemeToggleButton = document.querySelector(".js-color-scheme-toggle");
		const schemeStatusText = document.querySelector(".js-color-scheme-status");

		const getCSSCustomProp = (propKey) => {
			let response = getComputedStyle(document.documentElement).getPropertyValue(propKey);

			if (response.length) {
				response = response.replace(/\"/g, "").trim();
			}

			return response;
		};

		const applySetting = (passedSetting) => {
			let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);

			if (currentSetting) {
				document.documentElement.setAttribute("data-user-color-scheme", currentSetting);
				schemeStatusText.innerText = `Enable ${currentSetting === "dark" ? "light" : "dark"} mode`;
			} else {
				schemeStatusText.innerText = `Enable ${getCSSCustomProp(COLOR_SCHEME_KEY) === "dark" ? "light" : "dark"} mode`;
			}
		};

		const toggleSetting = () => {
			let currentSetting = localStorage.getItem(STORAGE_KEY);

			switch (currentSetting) {
				case null:
					currentSetting = getCSSCustomProp(COLOR_SCHEME_KEY) === "dark" ? "light" : "dark";
					break;
				case "light":
					currentSetting = "dark";
					break;
				case "dark":
					currentSetting = "light";
					break;
			}

			localStorage.setItem(STORAGE_KEY, currentSetting);

			return currentSetting;
		};

		schemeToggleButton.addEventListener("click", (event) => {
			event.preventDefault();

			applySetting(toggleSetting());
		});

		applySetting();
	};

	const shareButton = () => {
		const testButton = document.createElement("button");
		testButton.setAttribute("type", "share");
		if (testButton.type !== "share") {
			const button = document.querySelector("button[type=share]");
			if (button) {
				button.addEventListener("click", (event) => {
					event.preventDefault();

					const title = document.querySelector("title").innerText;
					const url = window.location.href;

					if (navigator.share) {
						navigator.share({
							title: title,
							url: url,
						});
					} else {
						window.location.href = "mailto:?subject=" + title + "&body=" + url;
					}
				});
			}
		}
	};

	colorScheme();
	shareButton();

})();
