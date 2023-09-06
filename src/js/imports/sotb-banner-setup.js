;(function () {
	const HIDE_KEY = "hide-sotb-banner"
	const HIDE = localStorage.getItem(HIDE_KEY)

	if (HIDE) {
		document.documentElement.setAttribute("data-hide-sotb-banner", true)
	}
})()
