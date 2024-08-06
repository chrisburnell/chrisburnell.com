const threshold = 0.333;
const observer = new IntersectionObserver(
	(entries, observer) => {
		if (entries[0].intersectionRatio > threshold) {
			entries[0].target.classList.add("visible");
			observer.unobserve(entries[0].target);
		}
	},
	{ threshold: threshold },
);
const instantPhotos = document.querySelectorAll(
	".instant-photo.should-develop",
);
for (let instantPhoto of instantPhotos) {
	instantPhoto.classList.add("will-develop");
	instantPhoto.classList.remove("should-develop");
	observer.observe(instantPhoto);
}
