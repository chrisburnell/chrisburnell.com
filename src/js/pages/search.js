/**
 * Search Input
 * @class
 */
class SearchInput {
	/**
	 * @constructor
	 */
	constructor() {
		this.form = document.getElementById("search")
		this.input = this.form.querySelector("input")

		this.input.value = ""

		this.form.addEventListener("submit", (event) => {
			event.preventDefault()
			this.input.value = "site:chrisburnell.com " + this.input.value
			this.form.submit()
		})
	}
}

if ("HTMLElement" in window) {
	/**
	 * @type {SearchInput}
	 */
	window.SearchInput = new SearchInput()
}

/**
 * @type {SearchInput}
 */
export default SearchInput
