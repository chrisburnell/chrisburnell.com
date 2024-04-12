import { friendlyDate, friendlyTime } from "../../eleventy/filters/dates.js"
import { clamp } from "../../functions/utils.js"

class LastFMListening extends HTMLElement {
	static register(tagName) {
		if ("customElements" in window) {
			customElements.define(tagName || "lastfm-listening", LastFMListening)
		}
	}

	connectedCallback() {
		if (!this.hasAttribute("username")) {
			console.error(`Missing \`username\` attribute!`, this)
			return
		}

		this.init()
	}

	init() {
		this.username = this.getAttribute("username")
		this.limit = this.hasAttribute("limit") ? clamp(this.getAttribute("limit"), 1, 10) : 10

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
		let image = track.image[3]?.["#text"]
		if (!image || image.includes("2a96cbd8b46e442fc41c2b86b821562f.png")) {
			image = "/images/default-album-cover.png"
		}

		return `
			<article class=" [ flow ] ">
				<a href="${track.url}" aria-hidden="true" tabindex="-1" class=" [ cover-anchor ] ">
					<img src="${image}" alt="Cover art for ${track.name}" loading="lazy" decoding="async" class=" [ cover ] [ u-photo ] ">
				</a>
				<h1>
					<a href="${track.url}">${track.name}</a>
				</h1>
				<div>
					<a href="${track.artist.url}" class=" [ h-cite ] " rel="external noopener">${track.artist.name}</a>
				</div>
				<div>
					<relative-time><time datetime="${datetime.toISOString()}" class=" [ dt-published ] ">${datetime.getTime() === Date.now() ? "<em>listening now</em>" : `${friendlyDate(datetime)} ${friendlyTime(datetime)}`}</time></relative-time>
				</div>
			</article>
		`
	}
}

LastFMListening.register()
