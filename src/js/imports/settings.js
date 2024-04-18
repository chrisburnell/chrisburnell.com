const selectTheme = document.querySelector(`select[name="theme"]`)
const selectColorScheme = document.querySelector(`select[name="color-scheme"]`)
const inputCustomHue = document.querySelector(`[type="range"][name="custom-hue"]`)
const selectHighContrast = document.querySelector(`select[name="high-contrast"]`)
const selectSmoothScroll = document.querySelector(`select[name="smooth-scroll"]`)
const inputUserSounds = document.querySelector(`[type="checkbox"][name="user-sounds"]`)
const buttonSettingsReset = document.querySelector(".settings-reset")

if (selectTheme && inputCustomHue) {
	selectTheme.addEventListener("change", (event) => {
		if (event.target.value === "custom") {
			document.documentElement.style.setProperty("--raven-hue", inputCustomHue.value)
		} else {
			document.documentElement.style.removeProperty("--raven-hue")
		}
	})

	inputCustomHue.addEventListener("change", (event) => {
		if (selectTheme.value === "custom") {
			document.documentElement.style.setProperty("--raven-hue", event.target.value)
		}
	})
}

if (buttonSettingsReset) {
	buttonSettingsReset.addEventListener("click", () => {
		localStorage.removeItem("theme")
		localStorage.removeItem("color-scheme")
		localStorage.removeItem("custom-hue")
		localStorage.removeItem("high-contrast")
		localStorage.removeItem("smooth-scroll")
		localStorage.removeItem("user-sounds")
		document.documentElement.style.removeProperty("--raven-hue")
		if (selectTheme) {
			selectTheme.value = ""
		}
		if (selectColorScheme) {
			selectColorScheme.value = ""
		}
		if (inputCustomHue) {
			inputCustomHue.value = 237.73
		}
		if (selectHighContrast) {
			selectHighContrast.value = ""
		}
		if (selectSmoothScroll) {
			selectSmoothScroll.value = ""
		}
		if (inputUserSounds) {
			inputUserSounds.checked = false
		}
	})
}
