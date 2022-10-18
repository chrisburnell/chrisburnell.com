class SearchInput {
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
	window.SearchInput = new SearchInput()
}

export default SearchInput
