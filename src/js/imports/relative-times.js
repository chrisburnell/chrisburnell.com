/**
 * Relative Times
 */
class RelativeTime {
	/**
	 * @class
	 */
	constructor() {
		this.nonRelativeTimeElements = document.querySelectorAll(
			":not(relative-time) > [datetime]",
		);
		this.relativeRSVPValueElements = document.querySelectorAll(
			"[data-relative-rsvp-value][data-start][data-end][data-value]",
		);
		this.relativeRSVPDateElements = document.querySelectorAll(
			"[data-relative-rsvp-date][data-end]",
		);
		this.lastUpdate = 0;
		this.updateLoop;

		if (!this.initialized) {
			this.init();
		}
	}

	static emojiFuture = `<span class=" [ emoji ] " aria-hidden="true">➡️</span>`;
	static emojiGoing = `<span class=" [ emoji ] " aria-hidden="true">✅</span>`;
	static emojiHopefully = `<span class=" [ emoji ] " aria-hidden="true">🤞</span>`;
	static emojiNotGoing = `<span class=" [ emoji ] " aria-hidden="true">😔</span>`;

	getRSVPValueString(start, end, value) {
		const now = Date.now();

		if (value === "yes") {
			if (new Date(start).getTime() > now) {
				return `${RelativeTime.emojiFuture} <small>attending</small>`;
			}
			if (
				new Date(start).getTime() <= now &&
				now <= new Date(end).getTime()
			) {
				return `${RelativeTime.emojiGoing} <small class=" [ currently-attending ] ">currently attending</small>`;
			}
			return `${RelativeTime.emojiGoing} <small>attended</small>`;
		}
		if (value === "maybe" || value === "interested") {
			if (new Date(start).getTime() > now) {
				return `${RelativeTime.emojiHopefully} <small>hoping to attend</small>`;
			}
			return `${RelativeTime.emojiHopefully} <small>was hoping to attend</small>`;
		}
		if (new Date(start).getTime() > now) {
			return `${RelativeTime.emojiNotGoing} <small>unable to attend</small>`;
		}
		return `${RelativeTime.emojiNotGoing} <small>was unable to attend</small>`;
	}

	getRSVPDateString(end) {
		if (Date.now() <= new Date(end).getTime()) {
			return "taking place";
		}
		return "took place";
	}

	setTimeTitles() {
		this.nonRelativeTimeElements.forEach((element) => {
			if (!element.hasAttribute("title")) {
				const datetime = new Date(element.getAttribute("datetime"));
				// Set the title attribute to the localized time
				element.title = `${datetime.toLocaleString()} (local time)`;
			}
		});
	}

	setRelativeTimes() {
		this.relativeRSVPValueElements.forEach((element) => {
			const start = new Date(element.getAttribute("data-start"));
			const end = new Date(element.getAttribute("data-end"));
			const value = element.getAttribute("data-value");
			element.innerHTML = this.getRSVPValueString(start, end, value);
		});

		this.relativeRSVPDateElements.forEach((element) => {
			const end = new Date(element.getAttribute("data-end"));
			element.innerHTML = this.getRSVPDateString(end);
		});
	}

	beginUpdateLoop() {
		const updateLoop = (currentTime) => {
			this.updateLoop = requestAnimationFrame(updateLoop);
			if (currentTime - this.lastUpdate >= 10 * 60 * 1000) {
				this.setRelativeTimes();
				this.lastUpdate = currentTime;
			}
		};
		this.updateLoop = requestAnimationFrame(updateLoop);
	}

	stopUpdateLoop() {
		this.lastUpdate = 0;
		cancelAnimationFrame(this.updateLoop);
	}

	windowFocusHandler() {
		this.setRelativeTimes();
		this.beginUpdateLoop();
	}

	windowBlurHandler() {
		this.stopUpdateLoop();
	}

	init() {
		this.initialized = true;

		if (this.nonRelativeTimeElements.length) {
			this.setTimeTitles();
		}

		if (
			this.relativeRSVPValueElements.length ||
			this.relativeRSVPDateElements.length
		) {
			this.setRelativeTimes();

			this.beginUpdateLoop();
			window.addEventListener("blur", () => {
				this.windowBlurHandler();
			});
			window.addEventListener("focus", () => {
				this.windowFocusHandler();
			});
		}
	}
}

if ("HTMLElement" in window) {
	window.RelativeTime = new RelativeTime();
}

export default RelativeTime;
