document.documentElement.classList.remove("no-js")

const STORAGE_KEY = "theme"
const THEME = localStorage.getItem(STORAGE_KEY)

if (THEME) {
	document.documentElement.setAttribute(`data-${STORAGE_KEY}`, THEME)

	window.addEventListener("load", function () {
		document.documentElement.removeAttribute(`data-${STORAGE_KEY}`)
	})
}
