[...document.querySelectorAll(".copy-code")].forEach((button) => {
	button.addEventListener("click", () => {
		if (navigator.clipboard) {
			const pre = button.nextElementSibling;
			const clone = pre.cloneNode(true);
			clone
				.querySelectorAll(".token.deleted, .token.inserted.prefix")
				.forEach((element) => {
					element.remove();
				});
			const text = clone.innerText;
			navigator.clipboard.writeText(text);
			button.textContent = "Copied!";
			setTimeout(() => {
				button.textContent = "Copy";
			}, 1000);
		}
	});
});
