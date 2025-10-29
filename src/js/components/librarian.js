/**
 * Librarian
 */
class Librarian {
	/**
	 * @param {string} buttonsSelector - The selector for sorting buttons.
	 * @param {string} shelfSelector - The selector for the shelf.
	 * @class
	 */
	constructor(buttonsSelector, shelfSelector) {
		this.buttonsSelector = buttonsSelector || "[data-sort]";
		this.shelfSelector = shelfSelector || ".shelf";

		this.init();
	}

	/**
	 * Initialises the Librarian.
	 */
	init() {
		this.buttons = document.querySelectorAll(this.buttonsSelector);
		this.shelf = document.querySelector(this.shelfSelector);
		this.content = document.getElementById("content");

		this.buttons.forEach((button) => {
			button.setAttribute(
				"aria-sort",
				button.getAttribute("aria-sort") || "none",
			);
			button.addEventListener("click", () =>
				this.handleButtonClick(button),
			);
		});
	}

	/**
	 * Methods of sorting used by the librarian.
	 * @type {object}
	 */
	sortingMethods = {
		alphabetical: (a, b) =>
			a.innerText.localeCompare(b.innerText, {
				numeric: true,
				ignorePunctuation: true,
				sensitivity: "base",
			}),
		author: (a, b) => this.compareBy(b, a, ".h-cite"),
		chronological: (a, b) =>
			this.compareBy(a, b, ".dt-published", "dateTime"),
		rating: (a, b) => this.compareBy(a, b, ".rating", "value"),
		release: (a, b) => this.compareBy(a, b, ".release", "dateTime"),
		title: (a, b) => this.compareBy(b, a, "h1"),
	};

	/**
	 * Grabs the appropriate value from a given shelf item.
	 * @param {HTMLElement} element - A given shelf item.
	 * @param {string} selector - A selector to query a subElement of the shelf item.
	 * @param {string} property - A property of the subElement.
	 * @returns {string|null} The value obtained from the subElement.
	 */
	getValue(element, selector, property) {
		const subElement = element.querySelector(selector);
		return subElement
			? property
				? subElement[property]
				: subElement.innerText.trim()
			: null;
	}

	/**
	 * Compares specific values between items on the shelf.
	 * @param {HTMLElement} a
	 * @param {HTMLElement} b
	 * @param {string} selector - A selector to query a subElement of the shelf item.
	 * @param {string} property - A property of the subElement.
	 * @returns {number} The comparison result.
	 */
	compareBy(a, b, selector, property) {
		const valueA = this.getValue(a, selector, property) || "";
		const valueB = this.getValue(b, selector, property) || "";

		if (selector !== "h1" && valueA === valueB) {
			return this.sortingMethods.title(a, b);
		}

		return valueB.localeCompare(valueA, undefined, {
			numeric: true,
			ignorePunctuation: true,
			sensitivity: "base",
		});
	}

	/**
	 * Alter the sorting of the shelf based on a button’s corresponding sorting
	 * method.
	 * @param {HTMLElement} button
	 */
	handleButtonClick(button) {
		const sort = button.getAttribute("aria-sort");
		const isNone = sort === "none";

		if (isNone) {
			this.buttons.forEach((other) =>
				other.setAttribute("aria-sort", "none"),
			);
		}

		const sorted = [...this.shelf.children].sort(
			this.sortingMethods[button.dataset.sort],
		);
		sorted.forEach(
			(item, i) =>
				(item.style.order =
					sort === "descending" ? sorted.length - i - 1 : i),
		);

		button.setAttribute(
			"aria-sort",
			isNone
				? "descending"
				: sort === "descending"
					? "ascending"
					: "descending",
		);
		this.content.scrollIntoView();
	}
}

if ("HTMLElement" in window) {
	/**
	 * @type {Librarian}
	 */
	window.Librarian = new Librarian();
}

/**
 * @type {Librarian}
 */
export default Librarian;
