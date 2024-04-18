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

const HIDE_LFW = localStorage.getItem("hide-lfw")
if (HIDE_LFW) {
	document.documentElement.classList.add("hide-lfw")
}

const HIDE_SOTB = localStorage.getItem("hide-sotb")
if (HIDE_SOTB) {
	document.documentElement.classList.add("hide-sotb")
}

window.addEventListener("load", function () {
	document.documentElement.removeAttribute("data-theme")
	document.documentElement.removeAttribute("data-color-scheme")
	document.documentElement.classList.remove("hide-lfw")
})
