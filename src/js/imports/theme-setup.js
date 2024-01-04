;(function () {
	const STORAGE_KEY = "theme"
	const THEME = localStorage.getItem(STORAGE_KEY)

	if (THEME) {
		document.documentElement.setAttribute(`data-${STORAGE_KEY}`, THEME)
	}
})()
