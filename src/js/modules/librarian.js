const Librarian = {
	chronological: (a, b) => {
		console.log("chronological")
		if (a.querySelector(".dt-published") && b.querySelector(".dt-published")) {
			return b.querySelector(".dt-published").dateTime.localeCompare(a.querySelector(".dt-published").dateTime)
		}
		return false
	},

	alphabetical: (a, b) => {
		console.log("alphabetical")
		return a.innerText.trim().localeCompare(b.innerText.trim())
	},

	title: (a, b) => {
		console.log("title")
		return a.querySelector("h1").innerText.trim().localeCompare(b.querySelector("h1").innerText.trim())
	},

	release: (a, b) => {
		console.log("release")
		if (a.querySelector(".release") && b.querySelector(".release")) {
			return b.querySelector(".release").dateTime.localeCompare(a.querySelector(".release").dateTime)
		}
		return false
	},

	author: (a, b) => {
		console.log("author")
		if (a.querySelector(".h-cite")?.innerText === b.querySelector(".h-cite")?.innerText) {
			return a.querySelector("h1").innerText.trim().localeCompare(b.querySelector("h1").innerText.trim())
		}
		return (a.querySelector(".h-cite")?.innerText || "").localeCompare(b.querySelector(".h-cite")?.innerText || "")
	},

	rating: (a, b) => {
		console.log("rating")
		if (a.querySelector(".rating")?.value === b.querySelector(".rating")?.value) {
			if (a.querySelector(".h-cite")?.innerText === b.querySelector(".h-cite")?.innerText) {
				return a.querySelector("h1").innerText.trim().localeCompare(b.querySelector("h1").innerText.trim())
			}
			return (a.querySelector(".h-cite")?.innerText || "").localeCompare(b.querySelector(".h-cite")?.innerText || "")
		}
		return (b.querySelector(".rating")?.value || 0) - (a.querySelector(".rating")?.value || 0)
	}
}

const buttons = document.querySelectorAll("[data-sort]")
const shelf = document.querySelector(".shelf")

buttons.forEach(button => {
	button.setAttribute("aria-sort", button.getAttribute("aria-sort") || "none")
	button.addEventListener("click", () => {
		// Set the current sorting direction
		const sort = button.getAttribute("aria-sort")

		// If the button state is "none", set all button states to "none"
		if (sort === "none") {
			buttons.forEach(other => other.setAttribute("aria-sort", "none"))
		}

		// Sort the items according to the button
		const sorted = [...shelf.querySelectorAll(":scope > *")].sort(Librarian[button.dataset.sort])
		// Loop through items and set their order property with inline CSS
		if (sort === "descending") {
			sorted.reverse().forEach((item, i) => item.style.order = i)
		} else {
			sorted.forEach((item, i) => item.style.order = i)
		}

		// Toggle the sorting direction (or set to "descending" if "none")
		button.setAttribute("aria-sort", sort === "descending" ? "ascending" : "descending")

		window.scrollTo(0, shelf.offsetTop)
	})
})
