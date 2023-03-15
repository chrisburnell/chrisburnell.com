;(function() {
	const STORAGE_KEY = "color-scheme"
	const theme = localStorage.getItem(STORAGE_KEY)

	if (theme) {
		document.documentElement.setAttribute(`data-${STORAGE_KEY}`, theme)
	}
})()
