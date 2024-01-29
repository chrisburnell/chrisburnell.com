/**
 * Polyfill for Exclusively-Opened Details Elements
 */
class PolyfillDetailsExclusive {
	/**
	 * @constructor
	 */
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
					})
					.forEach((d) => {
						d.removeAttribute("open")
					})
			})
		})
	}
}

if ("HTMLElement" in window) {
	/**
	 * @type {PolyfillDetailsExclusive}
	 */
	window.PolyfillDetailsExclusive = new PolyfillDetailsExclusive()
}

/**
 * @type {PolyfillDetailsExclusive}
 */
export default PolyfillDetailsExclusive
