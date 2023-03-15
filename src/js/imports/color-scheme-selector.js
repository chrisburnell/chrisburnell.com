;(function () {
	const STORAGE_KEY = "color-scheme"
	const COLOR_SCHEME = localStorage.getItem(STORAGE_KEY)

	if (COLOR_SCHEME) {
		document.documentElement.setAttribute(`data-${STORAGE_KEY}`, COLOR_SCHEME)
	}
})()
