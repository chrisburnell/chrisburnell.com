import pentatonic from "@chrisburnell/pentatonic"

const sounds = () => {
	const STORAGE_KEY = "user-sounds"

	// Defaults for sitewide pentatonic
	const defaults = {
		duration: 4000,
		volume: 0.5,
		keyStart: 29,
		keyLimit: 12,
		keyIntervals: [2, 2, 3, 2, 3],
	}
	// Header-only defaults
	const headerDefaults = {
		duration: 150,
		volume: 0.1,
		keyLimit: 4,
	}

	const soundsToggleButton = document.querySelector(".js-sounds-toggle")
	const soundsStatusText = document.querySelector(".js-sounds-status")

	const applySetting = (passedSetting) => {
		let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY)

		if (currentSetting) {
			soundsStatusText.innerText = `${currentSetting === "true" ? "Disable" : "Enable"} sounds`
		} else {
			soundsStatusText.innerText = `Enable sounds`
		}
	}

	const toggleSetting = () => {
		let currentSetting = localStorage.getItem(STORAGE_KEY) === "true" ? "false" : "true"

		localStorage.setItem(STORAGE_KEY, currentSetting)

		return currentSetting
	}

	soundsToggleButton.addEventListener("click", (event) => {
		event.preventDefault()

		applySetting(toggleSetting())

		if (currentSetting === "true") {
			const randomKey = Math.floor(Math.random() * headerDefaults.keyLimit)
			pentatonic([randomKey], headerDefaults.duration, headerDefaults.volume)
		}
	})

	applySetting()

	// Content + Sparklines
	for (let target of document.querySelectorAll(".pentatonic")) {
		target.addEventListener("click", () => {
			if (localStorage.getItem(STORAGE_KEY) === "true") {
				let values = target.values || target.dataset.values
				let duration = target.getAttribute("duration") ? parseFloat(target.getAttribute("duration")) : target.dataset.duration ? parseFloat(target.dataset.duration) : defaults.duration
				let keyStart = target.getAttribute("key-start") ? parseFloat(target.getAttribute("key-start")) : target.dataset.keyStart ? parseFloat(target.dataset.keyStart) : defaults.keyStart
				let keyLimit = target.getAttribute("key-limit") ? parseFloat(target.getAttribute("key-limit")) : target.dataset.keyLimit ? parseFloat(target.dataset.keyLimit) : defaults.keyLimit
				let keyIntervals = target.getAttribute("key-intervals")
					? target
							.getAttribute("key-intervals")
							.split(",")
							.map((interval) => parseFloat(interval))
					: target.dataset.keyIntervals
					? target.dataset.keyIntervals.split(",").map((interval) => parseFloat(interval))
					: defaults.keyIntervals
				if (values) {
					pentatonic(values.split(","), duration, defaults.volume, keyStart, keyIntervals, keyLimit)
				}
			}
		})
	}

	// Logo
	document.querySelector(".logo").addEventListener("mouseenter", () => {
		if (localStorage.getItem(STORAGE_KEY) === "true") {
			pentatonic([0], headerDefaults.duration, headerDefaults.volume, defaults.keyStart - defaults.keyLimit)
		}
	})

	// Primary Navigation + Buttons
	// for (let target of document.querySelectorAll(".navigation__list a, button:not(.anchor), .button:not(.anchor), [type=button]")) {
	// Primary Navigation
	for (let target of document.querySelectorAll(".navigation__list a")) {
		target.addEventListener("mouseenter", () => {
			if (localStorage.getItem(STORAGE_KEY) === "true") {
				const randomKey = Math.floor(Math.random() * headerDefaults.keyLimit)
				pentatonic([randomKey], headerDefaults.duration, headerDefaults.volume)
			}
		})
	}
}

export default sounds
