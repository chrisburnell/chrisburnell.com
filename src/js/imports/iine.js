const iineURL = "https://iine.chrisburnell.com";
const maxClicks = 10;
const iconDefault = "raven";
const labelDefault = "I appreciate you too!";

const labels = {
	raven: "Send an upvote",
};

const icons = {
	raven: '<img width="20" height="20" src="/images/raven.svg" alt="chrisburnell.com logo of a blue raven" role="presentation">',
};

const getClicks = (key) => Number(localStorage.getItem(key) || 0);
const isMaxed = (key) => getClicks(key) >= maxClicks;
const getID = (element) =>
	element.dataset.id ||
	element.id ||
	window.location.origin + window.location.pathname;

document.addEventListener("DOMContentLoaded", () => {
	const buttons = document.querySelectorAll(".iine-button");
	if (!buttons.length) return;

	const ids = Array.from(buttons).map((button) => getID(button));
	const uniqueIDs = [...new Set(ids)];
	const counts = new Map();

	(async () => {
		try {
			const res = await fetch(iineURL + "/hits/get", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ids: uniqueIDs }),
			});
			if (!res.ok) throw new Error("Failed to fetch counts");
			const data = await res.json();
			if (data && typeof data === "object" && !data.error) {
				for (const id in data) {
					counts.set(id, typeof data[id] === "number" ? data[id] : 0);
				}
			}
		} catch (err) {
			console.error("Error fetching iine counts:", err);
		}

		buttons.forEach((button) => {
			const id = getID(button);
			const storageKey = "iine-clicked-" + id;

			let iconElement = button.querySelector(".icon");
			if (!iconElement) {
				button.textContent = "";
				iconElement = document.createElement("span");
				iconElement.className = "icon";
				button.appendChild(iconElement);
			}

			let counterElement = button.querySelector(".counter");
			if (!counterElement) {
				counterElement = document.createElement("span");
				counterElement.className = "counter";
				button.appendChild(counterElement);
			}

			let count = counts.get(id) || 0;
			counterElement.textContent = " " + count;

			const icon = button.dataset.icon || iconDefault;

			if (!button.getAttribute("aria-label")) {
				const label =
					button.dataset.ariaLabel ||
					button.dataset.label ||
					labels[icon] ||
					labelDefault;
				button.setAttribute("aria-label", label);
				button.setAttribute("title", label);
			}
			button.removeAttribute("aria-hidden");

			const descriptionID = "iine-description-" + id.replace(/\W/g, "-");
			let descriptionElement = document.getElementById(descriptionID);
			if (!descriptionElement) {
				descriptionElement = document.createElement("span");
				descriptionElement.id = descriptionID;
				descriptionElement.style.display = "none";
				descriptionElement.textContent = "Already clicked.";
				document.body.appendChild(descriptionElement);
			}

			if (icons[icon]) {
				iconElement.innerHTML = icons[icon];
			} else {
				iconElement.textContent = icon;
			}

			const clicks = getClicks(storageKey);
			button.setAttribute("aria-pressed", (clicks > 0).toString());
			if (isMaxed(storageKey)) {
				button.classList.add("exhausted");
				button.setAttribute("aria-disabled", "true");
				button.setAttribute("aria-describedby", descriptionID);
			}

			const handleClick = async (e) => {
				if (
					isMaxed(storageKey) ||
					button.getAttribute("aria-disabled") === "true"
				) {
					return;
				}
				e?.preventDefault();

				const newClicks = getClicks(storageKey) + 1;
				localStorage.setItem(storageKey, String(newClicks));
				count++;
				counterElement.textContent = " " + count;
				button.setAttribute("aria-pressed", "true");
				button.setAttribute("aria-describedby", descriptionID);

				if (newClicks >= maxClicks) {
					button.classList.add("exhausted");
					button.setAttribute("aria-disabled", "true");
				}

				fetch(iineURL + "/hits/increment", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ id: id }),
				}).catch((err) =>
					console.error("Failed to increment page hits:", err),
				);
			};

			const form = button.closest("form");
			if (form) {
				form.addEventListener("submit", (e) => {
					e.preventDefault();
					handleClick(e);
				});
			} else {
				button.addEventListener("click", handleClick);
			}
			button.addEventListener("keydown", (e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					handleClick(e);
				}
			});
		});
	})();
});
