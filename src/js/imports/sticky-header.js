class StickyHeader {
	constructor() {
		this.header = document.querySelector("header")

		this.scrollPosition = 0

		this.adjustHeader()
		window.addEventListener("scroll", () => {
			this.adjustHeader()
		})
	}

	adjustHeader() {
		const scrolled = window.scrollY
		if (scrolled > this.header.clientHeight) {
			if (scrolled > this.scrollPosition) {
				this.header.classList.add("hiding")
			} else {
				this.header.classList.remove("hiding")
			}
		}
		this.scrollPosition = scrolled
	}
}

if ("HTMLElement" in window) {
	window.StickyHeader = new StickyHeader()
}

export default StickyHeader
