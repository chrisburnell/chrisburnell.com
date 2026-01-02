[...document.querySelectorAll(".perching")].forEach((perching) => {
	const target = perching.parentNode;
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				perching.classList.add("visible");
				observer.disconnect();
			}
		});
	});
	observer.observe(target);
});
