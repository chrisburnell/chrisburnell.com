(() => {
	"use strict";

	const button = document.getElementById("palette-toggler");
	const list = document.getElementById("palette-list");

	button.removeAttribute("hidden");
	button.setAttribute("aria-expanded", "true");
	list.setAttribute("aria-expanded", "true");

	const togglePalette = () => {
		const isExpanded = list.getAttribute("aria-expanded") === "true";

		button.innerText = isExpanded ? "Show opacity variants" : "Hide opacity variants";
		button.setAttribute("aria-expanded", isExpanded ? "false" : "true");
		list.setAttribute("aria-expanded", isExpanded ? "false" : "true");
	};

	togglePalette();
	button.addEventListener("click", togglePalette);
})();
