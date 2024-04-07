import { getRSVPDateString, getRSVPValueString, getRelativeTime } from "../../eleventy/filters/dates.js"

class RelativeTime {
	constructor() {
		this.timeElements = document.querySelectorAll("[datetime]")
		this.relativeTimeElements = document.querySelectorAll("[data-relative][datetime]")
		this.relativeRSVPValueElements = document.querySelectorAll("[data-relative-rsvp-value][data-start][data-end][data-value]")
		this.relativeRSVPDateElements = document.querySelectorAll("[data-relative-rsvp-date][data-end]")
		this.interval

		if (!this.initialized) {
			this.init()
		}
	}

	setTimeTitles() {
		this.timeElements.forEach((element) => {
			if (!element.hasAttribute("title")) {
				const datetime = new Date(element.getAttribute("datetime"))
				// Set the title attribute to the localized time
				element.title = `${datetime.toLocaleString()} (local time)`
			}
		})
	}

	setRelativeTimes() {
		this.relativeTimeElements.forEach((element) => {
			const datetime = new Date(element.getAttribute("datetime"))
			element.innerHTML = getRelativeTime(datetime)
		})

		this.relativeRSVPValueElements.forEach((element) => {
			const start = new Date(element.getAttribute("data-start"))
			const end = new Date(element.getAttribute("data-end"))
			const value = element.getAttribute("data-value")
			element.innerHTML = getRSVPValueString(start, end, value)
		})

		this.relativeRSVPDateElements.forEach((element) => {
			const end = new Date(element.getAttribute("data-end"))
			element.innerHTML = getRSVPDateString(end)
		})
	}

	startInterval() {
		this.interval = setInterval(
			() => {
				this.setRelativeTimes()
				this.startInterval()
			},
			10 * 60 * 1000, // every 10 minutes
		)
	}

	stopInterval() {
		clearInterval(this.interval)
	}

	windowFocusHandler() {
		this.stopInterval()
		this.setRelativeTimes()
		this.startInterval()
	}

	init() {
		this.initialized = true

		if (this.timeElements.length) {
			this.setTimeTitles()
		}

		if (this.relativeTimeElements.length || this.relativeRSVPValueElements.length || this.relativeRSVPDateElements.length) {
			this.setRelativeTimes()

			this.startInterval()
			window.addEventListener("focus", () => {
				this.windowFocusHandler()
			})
			window.addEventListener("blur", () => {
				this.stopInterval()
			})
		}
	}
}

if ("HTMLElement" in window) {
	window.RelativeTime = new RelativeTime()
}

export default RelativeTime
