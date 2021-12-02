(function () {
	"use strict";

	const form = document.getElementById("search");
	const input = form.querySelector("input");

	input.value = "";

	form.addEventListener("submit", (event) => {
		event.preventDefault();
		input.value = "site:chrisburnell.com " + input.value;
		form.submit();
	});
})();
