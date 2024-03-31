const selectTheme = document.querySelector(`select[name="theme"]`)

const inputHighContrast = document.querySelector(`[type="checkbox"][name="high-contrast"]`)
if (inputHighContrast && !localStorage.getItem("high-contrast")) {
	inputHighContrast.indeterminate = true
}

const inputSmoothScroll = document.querySelector(`[type="checkbox"][name="smooth-scroll"]`)
if (inputSmoothScroll && !localStorage.getItem("smooth-scroll")) {
	inputSmoothScroll.indeterminate = true
}

const inputUserSounds = document.querySelector(`[type="checkbox"][name="user-sounds"]`)

const buttonSettingsReset = document.querySelector(".settings-reset")
if (buttonSettingsReset) {
	buttonSettingsReset.addEventListener("click", () => {
		localStorage.removeItem("theme")
		localStorage.removeItem("high-contrast")
		localStorage.removeItem("smooth-scroll")
		localStorage.removeItem("user-sounds")
		if (selectTheme) {
			selectTheme.value = ""
		}
		if (inputHighContrast) {
			inputHighContrast.checked = false
			inputHighContrast.indeterminate = true
		}
		if (inputSmoothScroll) {
			inputSmoothScroll.checked = false
			inputSmoothScroll.indeterminate = true
		}
		if (inputUserSounds) {
			inputUserSounds.checked = false
		}
	})
}
