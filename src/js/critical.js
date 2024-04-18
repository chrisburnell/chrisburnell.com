document.documentElement.classList.remove("no-js")

const THEME = localStorage.getItem("theme")
if (THEME) {
	document.documentElement.setAttribute("data-theme", THEME)
}

const COLOR_SCHEME = localStorage.getItem("color-scheme")
if (COLOR_SCHEME) {
	document.documentElement.setAttribute("data-color-scheme", COLOR_SCHEME)
}

const CUSTOM_HUE = localStorage.getItem("custom-hue")
if (THEME === "custom" && CUSTOM_HUE) {
	document.documentElement.style.setProperty("--raven-hue", CUSTOM_HUE)
}

window.addEventListener("load", function () {
	document.documentElement.removeAttribute("data-theme")
	document.documentElement.removeAttribute("data-color-scheme")
})
