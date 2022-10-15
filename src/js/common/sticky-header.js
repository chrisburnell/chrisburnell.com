class StickyHeader {
	constructor() {
		this.header = document.querySelector("header")

		this.init()
	}

	init() {
		window.addEventListener("scroll", (event) => {

		})
	}
}

if ("HTMLElement" in window) {
	window.StickyHeader = new StickyHeader()
}

export default StickyHeader
