(() => {
	"use strict";

	const input = document.querySelector("input");

	input.value = "";

	function prepend() {
		input.value = "site:chrisburnell.com " + input.value;
	}
})();
