const { url: siteUrl } = require("#data/site")
const consoles = require("#data/consoles")
const mastodonInstances = require("#data/mastodonInstances")
const places = require("#data/places")
const methods = require("#data/postingMethods")
const syndicationTargets = require("#data/syndicationTargets")
const urlReplacements = require("#data/urlReplacements")

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

module.exports = {
	/**
	 * Return an abbreviated console name.
	 * @param {String} value
	 * @returns {String}
	 */
	getConsole: (value) => {
		for (let console of consoles) {
			if (value == console.title) {
				return `<abbr title="${console.abbreviation}">${console.title}</abbr>`
			}
		}
		return value
	},
	/**
	 * Get a count of items in a collection with certain features.
	 * @param {Object[]} items
	 * @param {String} year
	 * @param {Boolean} [blogOnly]
	 * @returns {number}
	 */
	getCollectionCount: (items, year, blogOnly = false) => {
		return items
			.filter((item) => {
				if ("data" in item) {
					if ("draft" in item.data && item.data.draft === true) {
						return false
					}
					if ("published" in item.data && item.data.published === false) {
						return false
					}
					if ((!"date") in item.data) {
						return false
					}
					if (item.data.tags.includes("ignore") || (blogOnly && !item.data.tags.includes("blog"))) {
						return false
					}
				}
				return !!item.url
			})
			.filter((item) => {
				return !year || item.date.getFullYear() === parseInt(year, 10)
			}).length
	},
	/**
	 * Grab the host from a URL.
	 * @param {String} value
	 * @param {Boolean} [preservePathname]
	 * @returns {String}
	 */
	getHost: (value, preservePathname = false) => {
		if (typeof value === "string" && value.includes("//")) {
			const urlObject = new URL(value)
			return urlObject.hostname + (preservePathname ? urlObject.pathname : "")
		}
		return value
	},
	/**
	 * Pass a URL through a dead-link replacer.
	 * @param {String} url
	 * @returns {String}
	 */
	fixUrl: (url) => {
		return Object.entries(urlReplacements).reduce((accumulator, [key, value]) => {
			const regex = new RegExp(key, "g")
			return accumulator.replace(regex, value)
		}, url)
	},
	/**
	 * Replace a URL with a string if it points to an internal/syndication target.
	 * @param {String} value
	 * @param {Object[]} pages
	 * @returns {String}
	 */
	getInternalTarget: (value, pages) => {
		// Mastodon
		if (value.includes("https://fediverse.repc.co") || value.includes("https://social.chrisburnell.com") || value.includes("https://mastodon.social/users/chrisburnell/statuses/")) {
			return "a previous Mastodon post"
		}
		// Twitter
		else if (value.includes("https://twitter.com/iamchrisburnell/status/") || value.includes("https://twitter.chrisburnell.com/")) {
			return "a previous Twitter post"
		}
		// Internal URL
		else if (value.includes(siteUrl) || value.includes("localhost")) {
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
	/**
	 * Parse a string to return a Mastodon handle
	 * @param {String} value
	 * @returns {String}
	 */
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
	/**
	 * Figure out where a post took place based on checkin/
	 * @param {any} value
	 * @param {any} intent
	 * @returns {any}
	 */
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
	/**
	 * Return richer information about where a post was made from.
	 * @param {String} url
	 * @returns {String}
	 */
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
	/**
	 * Return richer information about a syndication URL.
	 * @param {String} value
	 * @returns {String}
	 */
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
	/**
	 * Get a Twitter handle from a URL.
	 * @param {String} value
	 * @returns {String}
	 */
	getTwitterHandle: (value) => {
		if (value.includes("https://twitter.com")) {
			return "@" + value.split("/status/")[0].split("twitter.com/")[1]
		}
		return value
	},
	/**
	 * Return rich information about a Person.
	 * @param {Object[]} people
	 * @param {any} value
	 * @param {any} intent
	 * @returns {any}
	 */
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
	/**
	 * Get DEV.to information.
	 * @param {Object[]} articles
	 * @param {String} title
	 * @returns {any}
	 */
	getDevToArticle: (articles, title) => {
		for (let article of articles) {
			if (article["title"] == title) {
				return article
			}
		}
		return id
	},
}
