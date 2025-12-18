document.documentElement.classList.remove("no-js");

const now = Date.now();
const currentYear = new Date().getFullYear();
const midwinterPeriodStart = `${currentYear}-12-01T00:00:00+14:00`;
const midwinterPeriodEnd = `${currentYear}-12-31T23:59:59-12:00`;
const isMidwinterPeriod =
	new Date(midwinterPeriodStart).getTime() <= now &&
	now <= new Date(midwinterPeriodEnd).getTime();
const THEME = localStorage.getItem("theme");
if (THEME) {
	if (!isMidwinterPeriod && THEME === "ravenous") {
		localStorage.removeItem("theme");
	}
	document.documentElement.setAttribute("data-theme", THEME);
}

const COLOR_SCHEME = localStorage.getItem("color-scheme");
if (COLOR_SCHEME) {
	document.documentElement.setAttribute("data-color-scheme", COLOR_SCHEME);
}

const CUSTOM_HUE = localStorage.getItem("custom-hue");
if (THEME === "custom" && CUSTOM_HUE) {
	document.documentElement.style.setProperty("--raven-hue", CUSTOM_HUE);
}

const CUSTOM_CHROMA = localStorage.getItem("custom-chroma");
if (THEME === "custom" && CUSTOM_CHROMA) {
	document.documentElement.style.setProperty("--raven-chroma", CUSTOM_CHROMA);
}

const HIDE_LFW = localStorage.getItem("hide-lfw");
if (HIDE_LFW) {
	document.documentElement.classList.add("hide-lfw");
}

const HIDE_SOTB = localStorage.getItem("hide-sotb");
if (HIDE_SOTB) {
	document.documentElement.classList.add("hide-sotb");
}

window.addEventListener("load", () => {
	document.documentElement.removeAttribute("data-theme");
	document.documentElement.removeAttribute("data-color-scheme");
	document.documentElement.classList.remove("hide-lfw");
});
