class DetailsExclusivePolyfill {
	constructor() {
		this.details = [...document.querySelectorAll("details[name]")]
		this.summaries = [...document.querySelectorAll("details[name] > summary")]

		this.init()
	}

	init() {
		this.summaries.forEach((summary) => {
			const details = summary.closest("details")
			const name = details.getAttribute("name")
			summary.addEventListener("click", () => {
				this.details
					.filter((d) => {
						return d.getAttribute("name") === name && d !== details
					}).forEach((d) => {
						d.removeAttribute("open")
					})
			})
		})
	}
}

if ("HTMLElement" in window) {
	window.DetailsExclusivePolyfill = new DetailsExclusivePolyfill()
}

export default DetailsExclusivePolyfill
