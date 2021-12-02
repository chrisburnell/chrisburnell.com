const sanitizeHTML = require("sanitize-html")

const site = require("../../data/site.json")
const consoles = require("../../data/consoles.json")
const mastodonInstances = require("../../data/mastodonInstances.json")
const places = require("../../data/places.json")
const methods = require("../../data/postingMethods.json")
const syndicationTargets = require("../../data/syndicationTargets.json")
const urlReplacements = require("../../data/urlReplacements.json")

const dateFilters = require("./dates.js")

const allowedHTML = {
	allowedTags: ["b", "i", "em", "strong", "a"],
	allowedAttributes: {
		a: ["href"],
	},
}

const toArray = (value) => {
	if (Array.isArray(value)) {
		return value
	}
	return [value]
}

const getPath = (url) => {
	let urlObject = new URL(url)
	return urlObject.pathname
}

const absoluteURL = (url, base) => {
	if (!base) {
		base = site.url
	}
	try {
		return new URL(url, base).toString()
	} catch (e) {
		console.log(`Trying to convert ${url} to be an absolute url with base ${base} and failed.`)
		return url
	}
}

module.exports = {
	getConsole: (value) => {
		for (let console of consoles) {
			if (value == console.title) {
				return `<abbr title="${console.abbreviation}">${console.title}</abbr>`
			}
		}

		return value
	},
	getCountByYear: (items, year) => {
		return items
			.filter((item) => {
				return !item.data.draft
			})
			.filter((item) => {
				return item.data.page.date.getFullYear() === parseInt(year, 10)
			}).length
	},
	getHost: (value) => {
		if (typeof value === "string" && value.includes("//")) {
			const urlObject = new URL(value)
			return urlObject.hostname
		}
		return value
	},
	getInternalTarget: (value, pages) => {
		// Mastodon
		if (value.includes("https://mastodon.social/users/chrisburnell/statuses/")) {
			return "a previous toot"
		}
		// Twitter
		else if (value.includes("https://twitter.com/iamchrisburnell/status/")) {
			return "a previous tweet"
		}
		// Internal URL
		else if (value.includes(site.url) || value.includes("localhost")) {
			let page = pages.filter((item) => {
				if (getPath(value) == item.url) {
					return true
				}
				return false
			})

			if (page.length > 0) {
				page = page[0]
				// posts with a `title` and `category`
				if ("title" in page.data && "category" in page.data) {
					return `${page.data.title}, a previous ${page.data.categoryProper || page.data.category}`
				}
				// pages/posts with a `title`
				else if ("title" in page.data) {
					return `${page.data.title}`
				}
				// posts
				else if ("category" in page.data) {
					return `a previous ${page.data.categoryProper || page.data.category}`
				}
			}
			// pages
			return `a previous page`
		}
		return value
	},
	getMastodonHandle: (value) => {
		for (let instance of mastodonInstances) {
			if (value.includes(instance)) {
				if (value.includes("/@")) {
					return "@" + value.split("/@")[1].split("/")[0] + "@" + instance
				} else {
					return "@" + value.split("/users/")[1].split("/")[0] + "@" + instance
				}
			}
		}
		return value
	},
	getPlace: (value, intent) => {
		// Default metadata to the passed value (string/object)
		let title, url, lat, long, address

		// Extract bits of metadata if they exist
		if (typeof value === "object") {
			if ("title" in value) {
				title = value.title
			}
			if ("url" in value) {
				url = value.url
			}
			if ("lat" in value) {
				lat = value.lat
			}
			if ("long" in value) {
				long = value.long
			}
			if ("address" in value) {
				address = value.address
			}
		} else {
			title = value
			url = value
		}

		// Loop through known places to make matches based on:
		// - title
		// - url
		for (let place of places) {
			// Check title
			if (place.title === title) {
				title = place.title
				value = place
				break
			}
			// Check url
			if (url && "url" in place) {
				// Parse URL for place match
				for (let place_url of toArray(place.url)) {
					if (url.includes(place_url)) {
						url = toArray(place.url)[0]
						value = place
						break
					}
				}
			}
		}

		// Spit out specific bits of metadata
		if (intent == "object") {
			return value
		}
		if (intent == "url") {
			return value.url || value
		} else if (intent == "lat") {
			return value.lat || value
		} else if (intent == "long") {
			return value.long || value
		} else if (intent == "address") {
			return value.address || value
		}
		return value.title || value
	},
	getPostingMethod: (url) => {
		let target
		if (url.includes("//")) {
			let urlObject = new URL(url)
			target = urlObject.hostname

			for (let item of methods) {
				if (item.url.includes(target)) {
					target = item.title
					break
				}
			}
		}
		return target
	},
	getSyndicationTarget: (value) => {
		if (typeof value === "string" && value.includes("//")) {
			let urlObject = new URL(value)
			value = urlObject.hostname || value
		}
		return syndicationTargets
			.filter((item) => {
				return item.url.includes(value)
			})
			.map((item) => {
				return item.title
			})[0]
	},
	getTwitterHandle: (value) => {
		if (value.includes("https://twitter.com")) {
			return "@" + value.split("/status/")[0].split("twitter.com/")[1]
		}
		return value
	},
	fixUrl: (url) => {
		return Object.entries(urlReplacements).reduce((accumulator, [key, value]) => {
			const regex = new RegExp(key, "g")
			return accumulator.replace(regex, value)
		}, url)
	},
	getBaseUrl: (url) => {
		let hashSplit = url.split("#")
		let queryparamSplit = hashSplit[0].split("?")
		return queryparamSplit[0]
	},
	getPerson: (people, value, intent) => {
		if (!people) {
			return value
		}

		// Default metadata to the passed value (string/object)
		let title, url, mastodon, twitter

		// Extract bits of metadata if they exist
		if (typeof value === "object") {
			if ("title" in value) {
				title = value.title
			}
			if ("url" in value) {
				url = value.url
			}
			if ("mastodon" in value) {
				mastodon = value.mastodon
			}
			if ("twitter" in value) {
				twitter = value.twitter
			}
		} else {
			title = value
			url = value
		}

		// Loop through known people to make matches based on:
		// - title
		// - url
		// - mastodon
		// - twitter
		for (let person of people) {
			// Check title
			if (person.title === title) {
				title = person.title
				value = person
				break
			}
			// Check url
			if (url && "url" in person) {
				// Parse URL for Mastodon instance + username
				for (let instance of mastodonInstances) {
					if (url.includes(instance)) {
						if (url.includes("/@")) {
							mastodon = url.split("/@")[1].split("/")[0]
						} else {
							mastodon = url.split("/users/")[1].split("/")[0]
						}
						mastodon += `@${instance}`
						break
					}
				}
				// Parse URL for Twitter username
				if (url.includes("https://twitter.com")) {
					twitter = url.split("/status/")[0].split("twitter.com/")[1]
				}
				// Parse URL for person match
				for (let person_url of toArray(person.url)) {
					if (url.includes(person_url)) {
						url = person_url
						value = person
						break
					}
				}
			}
			// Check mastodon
			if (mastodon && "mastodon" in person) {
				for (let person_mastodon of toArray(person.mastodon)) {
					if (person_mastodon == mastodon) {
						mastodon = person_mastodon
						value = person
						break
					}
				}
			}
			// Check twitter
			if (twitter && "twitter" in person) {
				for (let person_twitter of toArray(person.twitter)) {
					if (person_twitter == twitter) {
						twitter = person_twitter
						value = person
						break
					}
				}
			}
		}

		// create titles from mastodon/twitter URLs
		if (title == url) {
			title = mastodon || twitter || title
		}

		// Spit out specific bits of metadata
		if (intent == "object") {
			return value
		}
		if (intent == "url") {
			return value.url || value
		} else if (intent == "mastodon") {
			return value.mastodon || value
		} else if (intent == "twitter") {
			return value.twitter || value
		}
		return value.title || value
	},
	getWebmentions: (webmentions, url, allowedTypes = ["like-of", "repost-of", "bookmark-of", "mention-of", "in-reply-to"]) => {
		url = absoluteURL(url)

		if (!url || !webmentions || !webmentions[url]) {
			return []
		}

		if (typeof allowedTypes === "string") {
			allowedTypes = [allowedTypes]
		}

		return webmentions[url]
			.filter((entry) => {
				return allowedTypes.includes(entry["wm-property"])
			})
			.filter((entry) => {
				const { author } = entry
				return !!author && !!author.name
			})
			.map((entry) => {
				if (!("content" in entry)) {
					return entry
				}
				const { html, text } = entry.content
				if (html) {
					// really long html mentions, usually newsletters or compilations
					entry.content.value = html.length > 2000 ? `mentioned this in <a href="${entry["wm-source"]}">${entry["wm-source"]}</a>` : sanitizeHTML(html, allowedHTML)
				} else {
					entry.content.value = sanitizeHTML(text, allowedHTML)
				}
				return entry
			})
			.sort((a, b) => {
				return dateFilters.epoch(a.published || a["wm-received"]) - dateFilters.epoch(b.published || b["wm-received"])
			})
	},
}
