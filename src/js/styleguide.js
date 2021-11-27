(() => {
	"use strict";

	const button = document.getElementById("palette-toggler");
	const list = document.getElementById("palette-list");

	const togglePalette = () => {
		const isExpanded = list.getAttribute("aria-expanded") === "true";

		button.innerText = isExpanded ? "Show opacity variants" : "Hide opacity variants";
		button.setAttribute("aria-expanded", isExpanded ? "false" : "true");
		list.setAttribute("aria-expanded", isExpanded ? "false" : "true");
	};

	button.addEventListener("click", togglePalette);
})();
