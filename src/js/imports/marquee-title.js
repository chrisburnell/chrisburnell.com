class MarqueeTitle {
	constructor(updatesPerSecond = 8) {
		this.updatesPerSecond = updatesPerSecond
		this.lastUpdate = 0
		this.updateLoop
		this.timeout

		this.originalTitle = document.title
		this.title = this.originalTitle.trim() + " "

		window.addEventListener("focus", () => {
			this.timeout = setTimeout(() => {
				this.windowFocusHandler()
			}, 1000)
		})
		window.addEventListener("blur", () => {
			clearTimeout(this.timeout)
			this.windowBlurHandler()
		})
	}

	marqueeTitle() {
		this.title = this.title.slice(1) + this.title.split("")[0]
		document.title = this.title
	}

	startUpdateLoop() {
		const updateLoop = (currentTime) => {
			this.updateLoop = requestAnimationFrame(updateLoop)
			if (currentTime - this.lastUpdate >= 1000 / this.updatesPerSecond) {
				this.marqueeTitle()
				this.lastUpdate = currentTime
			}
		}
		this.updateLoop = requestAnimationFrame(updateLoop)
	}

	stopUpdateLoop() {
		this.lastUpdate = 0
		cancelAnimationFrame(this.updateLoop)
	}

	windowFocusHandler() {
		this.marqueeTitle()
		this.startUpdateLoop()
	}

	windowBlurHandler() {
		this.stopUpdateLoop()
		this.title = this.originalTitle
		document.title = this.originalTitle
	}
}
new MarqueeTitle()
