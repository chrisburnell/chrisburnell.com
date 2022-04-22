const librarian = () => {
	const sorters = document.querySelectorAll("[data-sort]")
	const shelfItems = [...document.querySelectorAll(".shelf article")]
	const sortingMethods = {
		chronological: (a, b) => {
			if (a.querySelector(".dt-published") && b.querySelector(".dt-published")) {
				return b.querySelector(".dt-published").dateTime.localeCompare(a.querySelector(".dt-published").dateTime)
			}
			return false
		},
		alphabetical: (a, b) => {
			return a.innerText.trim().localeCompare(b.innerText.trim())
		},
		title: (a, b) => {
			return a.querySelector("h3").innerText.trim().localeCompare(b.querySelector("h3").innerText.trim())
		},
		release: (a, b) => {
			if (a.querySelector(".release") && b.querySelector(".release")) {
				return b.querySelector(".release").dateTime.localeCompare(a.querySelector(".release").dateTime)
			}
			return false
		},
		rating: (a, b) => {
			return (b.querySelector(".rating") ? b.querySelector(".rating").value : 0) - (a.querySelector(".rating") ? a.querySelector(".rating").value : 0)
		},
		author: (a, b) => {
			return (a.querySelector(".h-cite") ? a.querySelector(".h-cite").innerText : "").localeCompare(b.querySelector(".h-cite") ? b.querySelector(".h-cite").innerText : "")
		},
	}

	if (sorters.length > 0) {
		for (const button of sorters) {
			button.addEventListener("click", () => {
				const sort = button.getAttribute("aria-sort")
				let sorted = shelfItems.sort(sortingMethods[button.dataset.sort])

				if (sort === "none") {
					// if it's the first click, set the active sorted one to none
					document.querySelector('[data-sort]:not([aria-sort="none"])').setAttribute("aria-sort", "none")
				} else if (sort === "descending") {
					// reverse it when it's currently at descending
					sorted = sorted.reverse()
				}

				button.setAttribute("aria-sort", sort === "descending" ? "ascending" : "descending")

				for (const i in sorted) {
					sorted[i].style.order = i
				}
			})
		}
	}
}

export default librarian
