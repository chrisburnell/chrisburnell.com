document.documentElement.classList.remove("no-js")

const THEME = localStorage.getItem("theme")

if (THEME) {
	document.documentElement.setAttribute("data-theme", THEME)

	window.addEventListener("load", function () {
		document.documentElement.removeAttribute("data-theme")
	})
}
