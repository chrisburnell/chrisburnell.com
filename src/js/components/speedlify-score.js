class SpeedlifyUrlStore {
	constructor() {
		this.fetches = {}
		this.responses = {}
		this.urls = {}
	}

	static normalizeUrl(speedlifyUrl, path) {
		const host = `${speedlifyUrl}${speedlifyUrl.endsWith("/") ? "" : "/"}`
		return host + (path.startsWith("/") ? path.substr(1) : path)
	}

	async fetchFromApi(apiUrl) {
		if (!this.fetches[apiUrl]) {
			this.fetches[apiUrl] = fetch(apiUrl)
		}

		let response = await this.fetches[apiUrl]
		if (!this.responses[apiUrl]) {
			this.responses[apiUrl] = response.json()
		}
		const json = await this.responses[apiUrl]
		return json
	}

	async fetchHash(speedlifyUrl, url) {
		if (this.urls[speedlifyUrl]) {
			return this.urls[speedlifyUrl][url] ? this.urls[speedlifyUrl][url].hash : false
		}

		const apiUrl = SpeedlifyUrlStore.normalizeUrl(speedlifyUrl, "api/urls.json")
		const json = await this.fetchFromApi(apiUrl)

		return json[url] ? json[url].hash : false
	}

	async fetchData(speedlifyUrl, hash) {
		const apiUrl = SpeedlifyUrlStore.normalizeUrl(speedlifyUrl, `api/${hash}.json`)

		return this.fetchFromApi(apiUrl)
	}
}

// Global store
const urlStore = new SpeedlifyUrlStore()

class SpeedlifyScore extends HTMLElement {
	static register(tagName) {
		customElements.define(tagName || "speedlify-score", SpeedlifyScore)
	}

	static attrs = {
		url: "url",
		speedlifyUrl: "speedlify-url",
		hash: "hash",
		rawData: "raw-data",
		requests: "requests",
		weight: "weight",
		rank: "rank",
		rankChange: "rank-change",
		score: "score",
	}

	static css = `
:host,
.meta {
	display: flex;
	align-items: center;
}
:host {
	font-size: var(--font-size-small);
	font-style: normal;
	line-height: 1;
	text-decoration: none;
	gap: var(--size-tiny);
}
.meta {
	margin-inline-start: var(--size-tiny);
	gap: var(--size-small);
}
.circle {
	inline-size: var(--size-large);
	block-size: var(--size-large);
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	border: calc(var(--size-border-thin) * 1.5) solid var(--color-nickel);
	font-variation-settings: normal;
}
.circle-good {
	border-color: var(--color-conifer);
}
.circle-ok {
	border-color: var(--color-aspen);
}
.circle-bad {
	border-color: var(--color-maple);
}
.rank {
	display: none;
}
.rank:before {
	content: "Rank #";
}
.rank-change:before {
	line-height: 1;
}
.rank-change.up:before {
	content: "↑ ";
}
.rank-change.down:before {
	content: "↓ ";
}
`

	connectedCallback() {
		if (!("replaceSync" in CSSStyleSheet.prototype) || this.shadowRoot) {
			return
		}

		this.speedlifyUrl = this.getAttribute(SpeedlifyScore.attrs.speedlifyUrl)
		this.shorthash = this.getAttribute(SpeedlifyScore.attrs.hash)
		this.rawData = this.getAttribute(SpeedlifyScore.attrs.rawData)
		this.url = this.getAttribute(SpeedlifyScore.attrs.url) || window.location.href

		if (!this.rawData && !this.speedlifyUrl) {
			console.error(`Missing \`${SpeedlifyScore.attrs.speedlifyUrl}\` attribute:`, this)
			return
		}

		// async
		this.init()
	}

	_initTemplate(data, forceRerender = false) {
		if (this.shadowRoot && !forceRerender) {
			return
		}
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = this.render(data)
			return
		}

		let shadowroot = this.attachShadow({ mode: "open" })
		let sheet = new CSSStyleSheet()
		sheet.replaceSync(SpeedlifyScore.css)
		shadowroot.adoptedStyleSheets = [sheet]

		let template = document.createElement("template")
		template.innerHTML = this.render(data)
		shadowroot.appendChild(template.content.cloneNode(true))
	}

	async init() {
		if (this.rawData) {
			let data = JSON.parse(this.rawData)
			this.setDateAttributes(data)
			this._initTemplate(data)
			return
		}

		let hash = this.shorthash
		let forceRerender = false
		if (!hash) {
			this._initTemplate() // skeleton render
			forceRerender = true

			// It’s much faster if you supply a `hash` attribute!
			hash = await urlStore.fetchHash(this.speedlifyUrl, this.url)
		}

		if (!hash) {
			console.error(`<speedlify-score> could not find hash for URL (${this.url}):`, this)
			return
		}

		// Hasn’t already rendered.
		if (!forceRerender) {
			this._initTemplate() // skeleton render
			forceRerender = true
		}

		let data = await urlStore.fetchData(this.speedlifyUrl, hash)
		this.setDateAttributes(data)

		this._initTemplate(data, forceRerender)
	}

	setDateAttributes(data) {
		if (!("Intl" in window) || !Intl.DateTimeFormat || !data.timestamp) {
			return
		}
		const date = new Intl.DateTimeFormat().format(new Date(data.timestamp))
		this.setAttribute("title", `Results from ${date}`)
	}

	getScoreClass(score) {
		if (score === "" || score === undefined) {
			return "circle"
		}
		if (score < 0.5) {
			return "circle circle-bad"
		}
		if (score < 0.9) {
			return "circle circle-ok"
		}
		return "circle circle-good"
	}

	getScoreHtml(title, value = "") {
		return `<span title="${title}" class="${this.getScoreClass(value)}">${value ? parseInt(value * 100, 10) : "…"}</span>`
	}

	render(data = {}) {
		let attrs = SpeedlifyScore.attrs
		let content = []

		// no extra attributes
		if ((!this.hasAttribute(attrs.requests) && !this.hasAttribute(attrs.weight) && !this.hasAttribute(attrs.rank) && !this.hasAttribute(attrs.rankChange)) || this.hasAttribute(attrs.score)) {
			content.push(this.getScoreHtml("Performance", data.lighthouse?.performance))
			content.push(this.getScoreHtml("Accessibility", data.lighthouse?.accessibility))
			content.push(this.getScoreHtml("Best Practices", data.lighthouse?.bestPractices))
			content.push(this.getScoreHtml("SEO", data.lighthouse?.seo))
		}

		let meta = []
		let summarySplit = data.weight?.summary?.split(" • ") || []
		if (this.hasAttribute(attrs.requests) && summarySplit.length) {
			meta.push(`<span class="requests">${summarySplit[0]}</span>`)
		}
		if (this.hasAttribute(attrs.weight) && summarySplit.length) {
			meta.push(`<span class="weight">${summarySplit[1]}</span>`)
		}
		if (this.hasAttribute(attrs.rank)) {
			let rankUrl = this.getAttribute("rank-url")
			meta.push(`<${rankUrl ? `a href="${rankUrl}"` : "span"} class="rank">${data.ranks?.cumulative}</${rankUrl ? "a" : "span"}>`)
		}
		if (this.hasAttribute(attrs.rankChange) && data.previousRanks) {
			let change = data.previousRanks?.cumulative - data.ranks?.cumulative
			meta.push(`<span class="rank-change ${change > 0 ? "up" : change < 0 ? "down" : "same"}">${change !== 0 ? Math.abs(change) : ""}</span>`)
		}
		if (meta.length) {
			content.push(`<span class="meta">${meta.join("")}</span>`)
		}

		return content.join("")
	}
}

if ("customElements" in window && "fetch" in window) {
	SpeedlifyScore.register()
}
