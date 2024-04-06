const selectTheme = document.querySelector(`select[name="theme"]`)

const inputHighContrast = document.querySelector(`[type="checkbox"][name="high-contrast"]`)
let stateHighContrast
if (inputHighContrast) {
	if (!localStorage.getItem("high-contrast")) {
		inputHighContrast.indeterminate = true
	}

	stateHighContrast = inputHighContrast.indeterminate ? null : inputHighContrast.checked ? true : false
	inputHighContrast.addEventListener("change", function () {
		if (stateHighContrast === null) {
			this.indeterminate = false
			this.checked = true
		} else if (stateHighContrast === false) {
			this.checked = false
			this.indeterminate = true
			localStorage.removeItem("high-contrast")
		}
		stateHighContrast = this.indeterminate ? null : this.checked ? true : false
	})
}

const inputSmoothScroll = document.querySelector(`[type="checkbox"][name="smooth-scroll"]`)
let stateSmoothScroll
if (inputSmoothScroll) {
	if (!localStorage.getItem("smooth-scroll")) {
		inputSmoothScroll.indeterminate = true
	}

	stateSmoothScroll = inputSmoothScroll.indeterminate ? null : inputSmoothScroll.checked ? true : false
	inputSmoothScroll.addEventListener("change", function () {
		if (stateSmoothScroll === null) {
			this.indeterminate = false
			this.checked = true
		} else if (stateSmoothScroll === false) {
			this.checked = false
			this.indeterminate = true
			localStorage.removeItem("smooth-scroll")
		}
		stateSmoothScroll = this.indeterminate ? null : this.checked ? true : false
	})
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
			stateSmoothScroll = inputSmoothScroll.indeterminate ? null : inputSmoothScroll.checked ? true : false
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
