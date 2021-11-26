(() => {
	"use strict";

	const button = document.getElementById("palette-toggler");
	const list = document.getElementById("palette-list");

	button.removeAttribute("hidden");
	button.setAttribute("aria-expanded", "true");
	list.setAttribute("aria-expanded", "true");

	button.addEventListener("click", () => {
		const isExpanded = list.getAttribute("aria-expanded") === "true";

		button.setAttribute("aria-expanded", isExpanded ? "false" : "true");
		list.setAttribute("aria-expanded", isExpanded ? "false" : "true");
	});
})();
