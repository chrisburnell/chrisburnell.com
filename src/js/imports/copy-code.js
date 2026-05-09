[...document.querySelectorAll(".copy-code")].forEach((button) => {
	if (!navigator.clipboard) {
		button.remove();
		return;
	}

	const textElement = button.querySelector("span:not(.icon)");
	const pre = button.nextElementSibling;
	let timeout;

	button.addEventListener("click", () => {
		const clone = pre.cloneNode(true);
		clone
			.querySelectorAll(".token.deleted, .token.inserted.prefix")
			.forEach((element) => {
				element.remove();
			});
		const text = clone.innerText;
		navigator.clipboard.writeText(text);
		textElement.textContent = "Copied!";
		// always happens
		setTimeout(() => {
			textElement.textContent = "Copy";
		}, 1000);
		// can be stopped by mousing out
		timeout = setTimeout(() => {
			textElement.textContent = "Copy";
		}, 3000);
	});

	button.addEventListener("mouseout", () => {
		clearTimeout(timeout);
	});
});
