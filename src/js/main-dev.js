import colorScheme from "./modules/color-scheme.js";
colorScheme();

import neofetch from "./modules/neofetch.js";
neofetch();

import librarian from "./modules/librarian.js";
librarian();

import urlInput from "./modules/url-input.js";
urlInput();

import sparkline from "@chrisburnell/spark-line";
sparkline();

import pentatonic from "@chrisburnell/pentatonic";
for (let target of document.querySelectorAll(".pentatonic")) {
	target.addEventListener("click", () => {
		let values = target.values || target.dataset.values;
		let duration = parseFloat(target.getAttribute("duration")) || 4000;
		let keyStart = parseFloat(target.getAttribute("key-start")) || 29;
		let keyIntervals = target.getAttribute("key-intervals")
			? target
					.getAttribute("key-intervals")
					.split(",")
					.map((interval) => parseFloat(interval))
			: [2, 2, 3, 2, 3];
		let keyLimit = parseFloat(target.getAttribute("key-limit")) || 12;
		if (values) {
			pentatonic(values.split(","), duration, 0.5, keyStart, keyIntervals, keyLimit);
		}
	});
}

import shareButton from "./modules/share-button.js";
shareButton();
