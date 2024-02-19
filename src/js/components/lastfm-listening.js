class LastFMListening extends HTMLElement {
	static register(tagName) {
		if ("customElements" in window) {
			customElements.define(tagName || "lastfm-listening", LastFMListening)
		}
	}

	connectedCallback() {
		if (!this.getAttribute("username")) {
			console.error(`Missing \`username\` attribute!`, this)
			return
		}

		this.init()
	}

	init() {
		this.username = this.getAttribute("username")

		this.fetchLatestTracks().then((data) => {
			this.innerHTML = `
					<ol class=" [ grid  shelf ] ">
						${data.reduce((string, track) => {
							return string + this.getTrackMarkup(track)
						}, "")}
					</ol>
				`
		})
	}

	fetchLatestTracks() {
		return fetch(`https://api.chrisburnell.com/lastfm/${this.username}`)
			.then((response) => {
				return response.json()
			})
			.catch((error) => {
				console.error(error)
			})
	}

	getTrackMarkup(track) {
		const datetime = track.date ? new Date(Number(track.date.uts) * 1000) : new Date()

		return `
			<article class=" [ flow ] ">
				<a href="${track.url}" aria-hidden="true" tabindex="-1" class=" [ cover-anchor ] ">
					<img src="${track.image[3]?.["#text"] || "/images/default-album-cover.png"}" alt="Cover art for ${track.name}" loading="lazy" decoding="async" class=" [ cover ] [ u-photo ] ">
				</a>
				<h1>
					<a href="${track.url}">${track.name}</a>
				</h1>
				<div>
					<a href="${track.artist.url}" class=" [ h-cite ] " rel="external">${track.artist.name}</a>
				</div>
				<div>
					<time datetime="${datetime.toISOString()}" class=" [ dt-published ] ">${this.pastDateString(datetime)}</time>
				</div>
			</article>
		`
	}

	static locale = document.querySelector("html").getAttribute("lang") || (navigator.languages ? navigator.languages[0] : "en")
	static rtf = new Intl.RelativeTimeFormat(this.locale, {
		localeMatcher: "best fit",
		numeric: "always",
		style: "long",
	})

	static yearInDays = 365.2422
	static monthInDays = this.yearInDays

	/**
	 * @param {datetime} datetime
	 * @returns {string}
	 */
	pastDateString(datetime) {
		// Calculate time diffs
		const difference = Date.now() - datetime.getTime()
		const secondsAgo = Math.floor(difference / 1000)
		const minutesAgo = Math.floor(secondsAgo / 60)
		const hoursAgo = Math.floor(minutesAgo / 60)
		const daysAgo = Math.floor(hoursAgo / 24)
		const weeksAgo = Math.floor(daysAgo / 7)
		const monthsAgo = Math.floor(daysAgo / (LastFMListening.yearInDays / 12))
		const yearsAgo = Math.floor(daysAgo / LastFMListening.yearInDays)

		// Normalise
		const remainingDays = daysAgo % 7
		const remainingMonths = monthsAgo % 12

		if (difference === 0) {
			return "listening now"
		} else if (yearsAgo > 0) {
			return LastFMListening.rtf.format(-yearsAgo, "year")
		} else if (remainingMonths > 0) {
			return LastFMListening.rtf.format(-remainingMonths, "month")
		} else if (weeksAgo > 0) {
			return LastFMListening.rtf.format(-weeksAgo, "week")
		} else if (remainingDays > 0) {
			return LastFMListening.rtf.format(-remainingDays, "day")
		} else if (hoursAgo > 0) {
			return LastFMListening.rtf.format(-hoursAgo, "hour")
		} else if (minutesAgo > 0) {
			return LastFMListening.rtf.format(-minutesAgo, "minute")
		}
		return LastFMListening.rtf.format(-secondsAgo, "second")
	}
}

LastFMListening.register()
