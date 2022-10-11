class Librarian {
	constructor(buttonsSelector, shelfSelector) {
		buttonsSelector = buttonsSelector || "[data-sort]"
		shelfSelector = shelfSelector || ".shelf"

		this.buttons = document.querySelectorAll(buttonsSelector)
		this.shelf = document.querySelector(shelfSelector)

		this.init()
	}

	sortingMethods = {
		title: (a, b) => {
			return a.querySelector("h1").innerText.trim().localeCompare(b.querySelector("h1").innerText.trim())
		},

		author: (a, b) => {
			if (a.querySelector(".h-cite")?.innerText === b.querySelector(".h-cite")?.innerText) {
				return a.querySelector("h1").innerText.trim().localeCompare(b.querySelector("h1").innerText.trim())
			}
			return (a.querySelector(".h-cite")?.innerText || "").localeCompare(b.querySelector(".h-cite")?.innerText || "")
		},

		release: (a, b) => {
			if (a.querySelector(".release") && b.querySelector(".release")) {
				return b.querySelector(".release").dateTime.localeCompare(a.querySelector(".release").dateTime)
			}
			return false
		},

		chronological: (a, b) => {
			if (a.querySelector(".dt-published") && b.querySelector(".dt-published")) {
				return b.querySelector(".dt-published").dateTime.localeCompare(a.querySelector(".dt-published").dateTime)
			}
			return false
		},

		alphabetical: (a, b) => {
			return a.innerText.trim().localeCompare(b.innerText.trim())
		},

		rating: (a, b) => {
			if (a.querySelector(".rating")?.value === b.querySelector(".rating")?.value) {
				if (a.querySelector(".h-cite")?.innerText === b.querySelector(".h-cite")?.innerText) {
					return a.querySelector("h1").innerText.trim().localeCompare(b.querySelector("h1").innerText.trim())
				}
				return (a.querySelector(".h-cite")?.innerText || "").localeCompare(b.querySelector(".h-cite")?.innerText || "")
			}
			return (b.querySelector(".rating")?.value || 0) - (a.querySelector(".rating")?.value || 0)
		},
	}

	init() {
		this.buttons.forEach((button) => {
			button.setAttribute("aria-sort", button.getAttribute("aria-sort") || "none")
			button.addEventListener("click", () => {
				// Set the current sorting direction
				const sort = button.getAttribute("aria-sort")

				// If the button state is "none", set all button states to "none"
				if (sort === "none") {
					this.buttons.forEach((other) => other.setAttribute("aria-sort", "none"))
				}

				// Sort the items according to the button
				const sorted = [...this.shelf.querySelectorAll(":scope > *")].sort(this.sortingMethods[button.dataset.sort])

				// Loop through items and set their order property with inline CSS
				if (sort === "descending") {
					sorted.reverse().forEach((item, i) => (item.style.order = i))
				} else {
					sorted.forEach((item, i) => (item.style.order = i))
				}

				// Toggle the sorting direction (default to "descending")
				button.setAttribute("aria-sort", sort === "descending" ? "ascending" : "descending")

				// Scroll to the top of the shelf
				window.scrollTo(0, this.shelf.offsetTop)
			})
		})
	}
}

if ("HTMLElement" in window) {
	window.Librarian = new Librarian()
}

export default Librarian
