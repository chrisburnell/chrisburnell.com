class RelativeTime {
	constructor() {
		this.nonRelativeTimeElements = document.querySelectorAll(":not(relative-time) > [datetime]")
		this.relativeRSVPValueElements = document.querySelectorAll("[data-relative-rsvp-value][data-start][data-end][data-value]")
		this.relativeRSVPDateElements = document.querySelectorAll("[data-relative-rsvp-date][data-end]")
		this.interval

		if (!this.initialized) {
			this.init()
		}
	}

	static emojiFuture = `<span class=" [ emoji ] " aria-hidden="true">➡️</span>`
	static emojiGoing = `<span class=" [ emoji ] " aria-hidden="true">✅</span>`
	static emojiHopefully = `<span class=" [ emoji ] " aria-hidden="true">🤞</span>`
	static emojiNotGoing = `<span class=" [ emoji ] " aria-hidden="true">😔</span>`

	/**
	* @param {string} start
	* @param {string} end
	* @param {string} value
	* @returns {string}
	*/
	getRSVPValueString (start, end, value) {
		const now = Date.now()

		if (value === "yes") {
			if (new Date(start).getTime() > now) {
				return `${RelativeTime.emojiFuture} <small>attending</small>`
			}
			if (new Date(start).getTime() <= now && now <= new Date(end).getTime()) {
				return `${RelativeTime.emojiGoing} <small>currently attending</small>`
			}
			return `${RelativeTime.emojiGoing} <small>attended</small>`
		}
		if (value === "maybe" || value === "interested") {
			if (new Date(start).getTime() > now) {
				return `${RelativeTime.emojiHopefully} <small>hoping to attend</small>`
			}
			return `${RelativeTime.emojiHopefully} <small>was hoping to attend</small>`
		}
		if (new Date(start).getTime() > now) {
			return `${RelativeTime.emojiNotGoing} <small>unable to attend</small>`
		}
		return `${RelativeTime.emojiNotGoing} <small>was unable to attend</small>`
	}

	/**
	* @param {string} start
	* @param {string} end
	* @param {string} value
	* @returns {string}
	*/
	getRSVPDateString (end) {
		if (Date.now() <= new Date(end).getTime()) {
			return "taking place"
		}
		return "took place"
	}

	setTimeTitles() {
		this.nonRelativeTimeElements.forEach((element) => {
			if (!element.hasAttribute("title")) {
				const datetime = new Date(element.getAttribute("datetime"))
				// Set the title attribute to the localized time
				element.title = `${datetime.toLocaleString()} (local time)`
			}
		})
	}

	setRelativeTimes() {
		this.relativeRSVPValueElements.forEach((element) => {
			const start = new Date(element.getAttribute("data-start"))
			const end = new Date(element.getAttribute("data-end"))
			const value = element.getAttribute("data-value")
			element.innerHTML = this.getRSVPValueString(start, end, value)
		})

		this.relativeRSVPDateElements.forEach((element) => {
			const end = new Date(element.getAttribute("data-end"))
			element.innerHTML = this.getRSVPDateString(end)
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

		if (this.nonRelativeTimeElements.length) {
			this.setTimeTitles()
		}

		if (this.relativeRSVPValueElements.length || this.relativeRSVPDateElements.length) {
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
