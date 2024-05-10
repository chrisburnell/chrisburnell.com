class LastFMListening extends HTMLElement {
	static register(tagName) {
		if ("customElements" in window) {
			customElements.define(tagName || "lastfm-listening", LastFMListening)
		}
	}

	connectedCallback() {
		if (!this.hasAttribute("url")) {
			console.error(`Missing \`url\` attribute!`, this)
			return
		}

		this.init()
	}

	init() {
		this.limit = this.hasAttribute("limit") ? this.clamp(this.getAttribute("limit"), 1, 10) : 10

		this.fetchLatestTracks().then((data) => {
			this.innerHTML = `
				<ol class=" [ grid ] [ shelf  shelf--square ] ">
					${data.slice(0, this.limit).reduce((string, track) => {
						return string + this.getTrackMarkup(track)
					}, "")}
				</ol>
			`
		})
	}

	fetchLatestTracks() {
		return fetch(this.getAttribute("url"))
			.then((response) => {
				return response.json()
			})
			.catch((error) => {
				console.error(error)
			})
	}

	getTrackMarkup(track) {
		const datetime = track.date ? new Date(Number(track.date.uts) * 1000) : new Date()
		let image = track.image[3]?.["#text"]
		if (!image || image.includes("2a96cbd8b46e442fc41c2b86b821562f.png")) {
			image = "/images/default-album-cover.png"
		}

		return `
			<article class=" [ flow ] ">
				<a href="${track.url}" aria-hidden="true" tabindex="-1" class=" [ cover-anchor ] ">
					<img src="${image}" alt="" role="presentation" loading="lazy" decoding="async" class=" [ cover ] [ u-photo ] ">
				</a>
				<h1>
					<a href="${track.url}">${track.name}</a>
				</h1>
				<div>
					<a href="${track.artist.url}" class=" [ h-cite ] " rel="external noopener">${track.artist.name}</a>
				</div>
				<div>
					${datetime.getTime() === Date.now() ? "<em>listening now</em>" : `<relative-time><time datetime="${datetime.toISOString()}" class=" [ dt-published ] ">${datetime.toLocaleString()}</time></relative-time>`}
				</div>
			</article>
		`
	}

	clamp(min, value, max) {
		return Math.min(Math.max(Number(value), Number(min)), Number(max))
	}
}

LastFMListening.register()
