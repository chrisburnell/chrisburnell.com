class StickyHeader {
	constructor() {
		this.observerInterceptor = document.querySelector("observer-interceptor")
		this.header = document.querySelector("header")

		this.init()
	}

	init() {
		if (this.observerInterceptor && this.header) {
			const observer = new IntersectionObserver(([entry]) => {
				this.header.classList.toggle("active", !entry.isIntersecting)
			})

			observer.observe(this.observerInterceptor)
		}
	}
}

if ("HTMLElement" in window) {
	window.StickyHeader = new StickyHeader()
}

export default StickyHeader
