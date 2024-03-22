import pentatonic from "@chrisburnell/pentatonic"

/**
 * Website Sounds
 * @class
 */
class WebsiteSounds {
	/**
	 * @constructor
	 */
	constructor() {
		this.STORAGE_KEY = "user-sounds"

		// Defaults for sitewide pentatonic
		this.defaults = {
			duration: 4000,
			volume: 0.1,
			keyStart: 29,
			keyLimit: 12,
			keyIntervals: [2, 2, 3, 2, 3],
		}
		// Header-only defaults
		this.headerDefaults = {
			duration: 150,
			volume: 0.1,
			keyLimit: 4,
		}
		// "PhonemeAh" waveform
		this.waveform = {
			real: new Float32Array([0, 0.246738, 0.08389, 0.095378, 0.087885, 0.165621, 0.287369, -0.328845, -0.099613, -0.198535, 0.260484, 0.012771, 0.013351, 0.006221, 0.003106, 0.000629, -0.003591, -0.002876, -0.003527, -0.002975, -0.002648, -0.006996, -0.004165, -0.004266, -0.000731, 0.003727, 0.018167, 0.012018, -0.017044, -0.004816, -0.001255, -0.002032, 0.000272, -0.001849, 0.004334, 0.000773, -0.00069, -0.000207, 0.000136, -0.000108, 0.000508, -0.000701, -0.000958, -0.004677, 0.002005, -0.001925, -0.00145, -0.002212, -0.001163, -0.000227, 0.000182, -0.000448, 0.000152, -0.000316, -0.000054, -0.000193, -0.00017, -0.000138, -0.000179, 0.000059, 0.000017, 0.000008, 0.000252, 0.000382, -0.000319, 0.00002, -0.000087, 0.00002, -0.000024, -0.000002, 0.000044, -0.000131, 0.000145, -0.000581, -0.000182, -0.001087, -0.000746, -0.002759, -0.001195, -0.002868, -0.000729, -0.002915, 0.000325, -0.001489, 0.000419, -0.000322, 0.000054, -0.0002, 0.000032, 0.000071, 0.000196, -0.000127, 0.000355, -0.000328, 0.000518, -0.00028, 0.00062, -0.00036, 0.000553, -0.000153, 0.000088, 0.000227, 0.000454, -0.000071, 0.0002, -0.000214, 0.000326, -0.00043, 0.000123, -0.000226, 0.000094, -0.000102, -0.000003, -0.000096, 0.000084, 0.000037, -0.000107, -0.000201, 0.000152, -0.0003, -0.000197, -0.000083, 0.000063, -0.000092, 0.000009, -0.000076, -0.000057, 0.000094, 0.000096, -0.000071, -0.000529, -0.000336, -0.000661, -0.000637, -0.001247, -0.000167, -0.001025, -0.001483, 0.000107, -0.000321, -0.000251, 0.000186, 0.000315, -0.000163, -0.000102, -0.001242, -0.001912, -0.000113, 0.000724, 0.00079, 0.000078, -0.000061, 0.000077, -0.000069, 0.00005, 0.000002, -0.000077, -0.000168, 0.000073, 0.000044, 0.000047, 0.000093, -0.000101, -0.000012, -0.000048, -0.000033, 0.000034, -0.000304, -0.000188, -0.000116, -0.000167, -0.000096, -0.000298, -0.000044, -0.000107, -0.000036, -0.000012, 0.000043, 0.000191, -0.000126, -0.000011, 0.0001, 0.000098, -0.000021, -0.000129, -0.000016, -0.000182, -0.000203, -0.000249, -0.000452, -0.000216, -0.000162, 0.000092, 0.000246, -0.000028, -0.000214, 0.000035, 0.000038, -0.000032, -0.000037, -0.000015, -0.00001, -0.000011, -0.00004, -0.000014, -0.00002, -0.000031, -0.000023, -0.000012, 0, 0, 0.000004, 0.000008, 0.000014, 0.000015, 0.000016, 0.000018, 0.000019, 0.000019, 0.000017, 0.000016, 0.000015, 0.000014, 0.000012, 0.000011, 0.00001, 0.00001, 0.000009, 0.000008, 0.000008, 0.000008, 0.000007, 0.000006, 0.000007, 0.000007, 0.000006, 0.000005, 0.000006, 0.000006, 0.000005, 0.000005, 0.000005, 0.000005, 0.000004, 0.000004, 0.000004, 0.000005, 0.000004, 0.000004, 0.000004, 0.000004, 0.000004, 0.000003, 0.000004, 0.000004, 0.000003, 0.000003, 0.000003, 0.000004, 0.000003, 0.000003, 0.000003, 0.000003, 0.000003, 0.000003, 0.000003, 0.000003, 0.000003, 0.000002, 0.000003, 0.000003, 0.000003, 0.000002, 0.000003, 0.000003, 0.000002, 0.000002, 0.000002, 0.000003, 0.000002, 0.000002, 0.000002, 0.000003, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000001, 0.000002, 0.000002, 0.000002, 0.000001, 0.000002, 0.000002, 0.000002, 0.000001, 0.000002, 0.000002, 0.000002, 0.000001, 0.000002, 0.000002, 0.000001, 0.000001, 0.000001, 0.000002, 0.000001, 0.000001, 0.000001, 0.000002, 0.000001, 0.000001, 0.000001, 0.000002, 0.000001, 0.000001, 0.000001, 0.000002, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0, 0, 0.000001, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0]),
			imag: new Float32Array([0, -0.011959, 0.106385, 0.027196, 0.04077, 0.010807, -0.17632, -0.376644, 0.052966, 0.242678, 0.322558, -0.029071, -0.017862, -0.018765, -0.010794, -0.010157, -0.004212, -0.001923, -0.002589, -0.000607, -0.001983, -0.000421, -0.001835, 0.003069, 0.005389, 0.012023, 0.003422, -0.013914, -0.008548, 0.007815, 0.002234, 0.003867, 0.000488, 0.000824, -0.002685, -0.000085, -0.002967, -0.000125, -0.000831, -0.000192, -0.000222, -0.003892, 0.000474, -0.002069, 0.001899, 0.001648, -0.00049, 0.001615, -0.000309, -0.000211, -0.000327, -0.000702, 0.000325, -0.000152, 0.000048, 0.000011, 0.000152, -0.000106, -0.000003, -0.000063, 0.000026, -0.000104, -0.000479, -0.000528, -0.000551, -0.000202, -0.00024, -0.000079, -0.000078, 0.000053, -0.000058, 0.000163, 0.000573, -0.000025, 0.000171, -0.001189, 0.000385, -0.000574, -0.000608, -0.000859, -0.00066, -0.000638, -0.002096, -0.000233, -0.002119, 0.000081, -0.001687, -0.000175, -0.00059, 0.000237, 0.000237, 0.000232, 0.000473, 0.000578, 0.00056, 0.000534, 0.000858, 0.001336, 0.000692, 0.001099, 0.000203, -0.000084, -0.000032, -0.000114, -0.000094, -0.000085, -0.000034, -0.000303, 0.000267, 0.000139, -0.000143, 0.000062, -0.000023, -0.000049, -0.000084, -0.000129, -0.000141, -0.000123, 0.000102, 0.000171, -0.000007, 0.000123, 0.000116, 0.00012, 0.000003, 0.000098, 0.000055, -0.000044, -0.000258, -0.000552, -0.000945, -0.00028, -0.000222, -0.000038, -0.000132, -0.000249, 0.00088, 0.000518, 0.001033, 0.000874, 0.000496, 0.000873, 0.000276, -0.000206, -0.000785, -0.000948, -0.000148, 0.001179, 0.000101, -0.000833, -0.000357, -0.000168, -0.000115, -0.000072, -0.000116, -0.000215, -0.000148, -0.000118, 0.000104, 0.000058, -0.000093, -0.000217, -0.000153, -0.000159, -0.000116, -0.000134, -0.000078, -0.000215, -0.000206, 0.000099, -0.000054, -0.000095, 0.000029, -0.000054, 0.000009, -0.000064, -0.000038, -0.000046, -0.000145, -0.000362, -0.00014, -0.000172, -0.000209, -0.000191, -0.000257, -0.000252, -0.000234, -0.000525, -0.00026, -0.000337, 0.000005, 0.000083, 0.000142, -0.000229, -0.000192, 0.000069, 0.000069, 0.000006, -0.000001, -0.000011, 0.000027, 0.000008, 0.000009, 0.000003, 0.000004, 0.000022, 0.000025, 0.00004, 0.000038, 0.000034, 0.000036, 0.000037, 0.000033, 0.000028, 0.000026, 0.000023, 0.00002, 0.000016, 0.000012, 0.000009, 0.000008, 0.000006, 0.000005, 0.000003, 0.000004, 0.000003, 0.000003, 0.000002, 0.000003, 0.000003, 0.000002, 0.000002, 0.000002, 0.000003, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000001, 0.000002, 0.000002, 0.000002, 0.000001, 0.000002, 0.000002, 0.000001, 0.000001, 0.000001, 0.000002, 0.000001, 0.000001, 0.000001, 0.000002, 0.000001, 0.000001, 0.000001, 0.000002, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0, 0, 0.000001, 0.000001, 0, 0, 0.000001, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
		}

		this.soundsToggleButton = null
		this.soundsStatusText = null
		this.pentatonicElements = null
		this.logo = null
		this.primaryNavigation = null
		this.nameButtons = null

		this.nameAudio = null
		this.nameAudioPath = "/audio/name.mp3"
		this.isPlaying = false

		this.init()
	}

	/**
	 * Applies a specific setting.
	 * @param {string} passedSetting
	 */
	applySetting(passedSetting) {
		const currentSetting = passedSetting || localStorage.getItem(this.STORAGE_KEY)

		if (currentSetting) {
			this.soundsStatusText.innerText = `${currentSetting === "true" ? "Disable" : "Enable"} sounds`
			this.soundsStatusIcon.setAttribute("href", currentSetting === "true" ? "#svg--sound-on" : "#svg--sound-off")
		} else {
			this.soundsStatusText.innerText = `Enable sounds`
			this.soundsStatusIcon.setAttribute("href", "#svg--sound-off")
		}
	}

	/**
	 * Enables/Disables website sounds.
	 * @returns {string} The opposite setting to the current one.
	 */
	toggleSetting() {
		const currentSetting = localStorage.getItem(this.STORAGE_KEY) === "true" ? "false" : "true"

		localStorage.setItem(this.STORAGE_KEY, currentSetting)

		return currentSetting
	}

	/**
	 * Plays the author name audio file.
	 */
	playName() {
		if (!this.isPlaying) {
			if (!this.nameAudio) {
				this.nameAudio = new Audio(this.nameAudioPath)
			}
			this.isPlaying = true
			this.nameAudio.play()
			window.setTimeout(() => {
				this.isPlaying = false
			}, this.nameAudio.duration)
		}
	}

	/**
	 * Initialises Website Sounds.
	 */
	init() {
		// In-page Sounds
		this.soundsToggleButton = document.querySelector(".js-sounds-toggle")

		// Make sure the button exists, or end the init here
		if (!this.soundsToggleButton) {
			return
		}

		this.soundsStatusIcon = this.soundsToggleButton.querySelector(".js-sounds-toggle svg use")
		this.soundsStatusText = this.soundsToggleButton.querySelector(".js-sounds-status")
		this.soundsToggleButton.addEventListener("click", (event) => {
			event.preventDefault()

			this.applySetting(this.toggleSetting())

			if (localStorage.getItem(this.STORAGE_KEY) === "true") {
				const randomKey = Math.floor(Math.random() * this.headerDefaults.keyLimit)
				pentatonic([randomKey], this.headerDefaults.duration, this.headerDefaults.volume, undefined, undefined, undefined, this.waveform)
			}
		})
		this.applySetting()

		// Content + Sparklines
		this.pentatonicElements = document.querySelectorAll(".pentatonic")
		this.pentatonicElements.forEach((element) => {
			element.addEventListener("click", () => {
				let target = element
				if (!element.getAttribute("values") && !element.dataset.values) {
					target = [...element.children].filter((child) => {
						return child.getAttribute("values") || child.dataset.values
					})[0]
				}
				let values = target.getAttribute("values") || target.dataset.values
				if (values) {
					let duration = target.getAttribute("duration") ? Number(target.getAttribute("duration")) : target.dataset.duration ? Number(target.dataset.duration) : this.defaults.duration
					let keyStart = target.getAttribute("key-start") ? Number(target.getAttribute("key-start")) : target.dataset.keyStart ? Number(target.dataset.keyStart) : this.defaults.keyStart
					let keyLimit = target.getAttribute("key-limit") ? Number(target.getAttribute("key-limit")) : target.dataset.keyLimit ? Number(target.dataset.keyLimit) : this.defaults.keyLimit
					let keyIntervals = target.getAttribute("key-intervals")
						? target
								.getAttribute("key-intervals")
								.split(",")
								.map((interval) => Number(interval))
						: target.dataset.keyIntervals
							? target.dataset.keyIntervals.split(",").map((interval) => Number(interval))
							: this.defaults.keyIntervals
					pentatonic(values.split(","), duration, this.defaults.volume, keyStart, keyIntervals, keyLimit, this.waveform)
				}
			})
		})

		// Tonics
		this.tonics = document.querySelectorAll(".logo, .author__information")
		this.tonics.forEach((tonic) => {
			tonic.addEventListener("mouseenter", () => {
				if (localStorage.getItem(this.STORAGE_KEY) === "true") {
					pentatonic([0], this.headerDefaults.duration, this.headerDefaults.volume, this.defaults.keyStart - this.defaults.keyLimit, undefined, undefined, this.waveform)
				}
			})
		})

		// Primary Navigation
		this.primaryNavigation = document.querySelectorAll(".navigation a, .navigation button")
		this.primaryNavigation.forEach((element) => {
			element.addEventListener("mouseenter", () => {
				if (localStorage.getItem(this.STORAGE_KEY) === "true") {
					const randomKey = Math.floor(Math.random() * this.headerDefaults.keyLimit)
					pentatonic([randomKey], this.headerDefaults.duration, this.headerDefaults.volume, undefined, undefined, undefined, this.waveform)
				}
			})
		})

		// Author Name
		this.nameButtons = document.querySelectorAll(".js-name-button")
		this.nameButtons.forEach((button) => {
			button.addEventListener("click", () => {
				this.playName()
			})
		})
		if (location.hash === "#name") {
			this.playName()
		}
	}
}

if ("HTMLElement" in window) {
	/**
	 * @type {WebsiteSounds}
	 */
	window.WebsiteSounds = new WebsiteSounds()
}

/**
 * @type {WebsiteSounds}
 */
export default WebsiteSounds
