document.documentElement.classList.remove("no-js")

const STORAGE_KEY = "theme"
const THEME = localStorage.getItem(STORAGE_KEY)

if (THEME) {
	document.documentElement.setAttribute(`data-${STORAGE_KEY}`, THEME)
	setTimeout(() => {
		document.documentElement.removeAttribute(`data-${STORAGE_KEY}`)
	}, 1000)
}
