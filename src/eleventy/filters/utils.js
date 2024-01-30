import { getContent, getPublished, getType } from "@chrisburnell/eleventy-cache-webmentions"
import consoles from "../../data/consoles.js"
import people from "../../data/people.js"
import places from "../../data/places.js"
import postingMethods from "../../data/postingMethods.js"
import syndicationTargets from "../../data/syndicationTargets.js"
import blogroll from "../data/blogroll.js"
import mastodonInstances from "../data/mastodonInstances.js"
import { url as siteURL } from "../data/site.js"
import { getPathname } from "./urls.js"

/**
 * @param {number} number
 * @param {number} [decimals]
 * @returns {number}
 */
export const maxDecimals = (number, decimals = 3) => {
	return +number.toFixed(decimals)
}

/**
 * @param {object} object
 * @param {string} key
 * @returns {any}
 */
export const keyValue = (object, key) => {
	return object[key]
}

/**
 *
 * @param {object[]} array
 * @param {string} key
 * @returns {object[]}
 */
export const arrayKeyValues = (array, key) => {
	return array
		.filter((item) => {
			return keyValue(item, key)
		})
		.map((item) => {
			return keyValue(item, key)
		})
}

/**
 * @param {object[]} array
 * @param {string} key
 * @returns {object[]}
 */
export const keySort = (array, key) => {
	const keys = key.split(".")
	return array.sort((a, b) => {
		const aValue = keys.reduce((o, k) => {
			return o[k]
		}, a)
		const bValue = keys.reduce((o, k) => {
			return o[k]
		}, b)
		return String(aValue || "").localeCompare(String(bValue || ""))
	})
}

/**
 * @param {any} value
 * @returns {object[]}
 */
export const toArray = (value) => {
	if (Array.isArray(value)) {
		return value
	}
	return [value]
}

/**
 * @param {number} value
 * @param {number} multiple
 * @returns {number}
 */
export const toNearest = (value, multiple) => {
	return Math.round(value / multiple) * multiple
}

/**
 * @param {object[]} webmentions
 * @param {number} other
 * @returns {number}
 */
export const getResponsesLength = (webmentions, other) => {
	return (webmentions.length || 0) + (other || 0)
}

/**
 * @param {number} number
 * @param {number} inMin
 * @param {number} inMax
 * @param {number} outMin
 * @param {number} outMax
 * @param {number} decimals
 * @returns {Number}
 */
export const rangeMap = (number, inMin, inMax, outMin, outMax, decimals) => {
	return (((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin).toFixed(decimals || 0)
}

/**
 * @param {string} hex
 * @returns {number}
 */
export const getRGB = (hex) => {
	const COLOR = hex.replace("#", "").slice(0, 6)
	return COLOR.match(/.{1,2}/g).map((value) => {
		return parseInt(value, 16)
	})
}

/**
 * @param {object[]} array
 * @param {number} limit
 * @returns {object[]}
 */
export const limit = (array, limit) => {
	return array.slice(0, limit)
}

/**
 * @param {object[]} array
 * @param {string} key
 * @param {any} value
 * @returns {boolean}
 */
export const arrayKeyEquals = (array, key, value) => {
	return array.filter((item) => {
		const keys = key.split(".")
		const itemValue = keys.reduce((object, key) => {
			return object[key]
		}, item)
		if (value === "notempty") {
			return !!itemValue?.length
		} else if (typeof value === "string" || value === null) {
			return itemValue === value
		}
		return value.includes(itemValue)
	})
}

/**
 * @param {object[]} array
 * @param {string} key
 * @param {any} value
 * @returns {boolean}
 */
export const arrayKeyIncludes = (array, key, value) => {
	return array.filter((item) => {
		const keys = key.split(".")
		const itemValue = keys.reduce((object, key) => {
			return object[key]
		}, item)
		return itemValue.includes(value)
	})
}

/**
 * @param {object[]} array
 * @returns {object[]}
 */
export const getAllLinks = (array) => {
	return array.filter((item) => {
		// if it's a link type
		if (getType(item) === "mention-of") {
			// if from Twitter
			if (item["wm-source"].includes("/post/twitter")) {
				// if a person's name is found, discard it
				return !blogroll.find((lookup) => {
					return lookup.title.localeCompare(item.author.name, undefined, { sensitivity: "accent" }) === 0
				})
			}
			// if from Mastodon, discard it
			if (item["wm-source"].includes("/post/mastodon")) {
				return false
			}
			// if it's a webmention (i.e. not a pingback)
			if (item["wm-protocol"] === "webmention") {
				// if it has valid content, discard it
				return !getContent(item)
			}
			// otherwise, include it
			return true
		}
		// otherwise discard it
		return false
	})
}

/**
 * @param {object[]} array
 * @returns {object[]}
 */
export const getAllReplies = (array) => {
	return array
		.filter((item) => {
			// if it's a link type
			if (getType(item) === "mention-of") {
				// if it's from Twitter
				if (item["wm-source"].includes("/post/twitter")) {
					// if a person's name is found, include it
					return blogroll.find((lookup) => {
						return lookup.title.localeCompare(item.author.name, undefined, { sensitivity: "accent" }) === 0
					})
				}
				// if it's from Mastodon, include it
				if (item["wm-source"].includes("/post/mastodon")) {
					return true
				}
				// if it's a webmention
				if (item["wm-protocol"] === "webmention") {
					// if it has valid content, include it
					return !!getContent(item)
				}
				// otherwise, discard it
				return false
			}
			// if it's a reply type
			if (getType(item) === "in-reply-to") {
				// if it has valid content, include it
				return !!getContent(item)
			}
			// otherwise, discard it
			return false
		})
		.sort((a, b) => {
			return new Date(getPublished(a)) - new Date(getPublished(b))
		})
}

/**
 * @param {number} values
 * @param {number} period
 * @param {boolean} [preserveEnds]
 * @returns {number}
 */
export const simpleMovingAverage = (values, period, preserveEnds = false) => {
	let step = (period - 1) / 2
	let end = values.length - 1
	let normalized = []

	for (let i in values) {
		let min = Math.max(0, i - step)
		let max = Math.min(end, parseFloat(i) + step)
		let count = Math.abs(max - min) + 1
		let sum = 0

		for (let j = min; j <= max; j++) {
			sum += values[j]
		}

		normalized[i] = Math.floor(sum / count)
	}
	if (preserveEnds) {
		normalized[0] = values[0]
		normalized[end] = values[end]
	}
	return normalized
}

/**
 * @see {@link https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average}
 * @param {number} value
 * @param {number} [current]
 * @param {number} [coefficient]
 * @returns {number}
 */
export const exponentialMovingAverage = (value, current = 0, coefficient = 0.333) => {
	return coefficient * value + (1 - coefficient) * current
}

/**
 * @param {string} value
 * @param {object[]} pages
 * @returns {string}
 */
export const getInternalTarget = (value, pages) => {
	// Mastodon
	if (value.includes("https://fediverse.repc.co") || value.includes("https://social.chrisburnell.com") || value.includes("https://mastodon.social/users/chrisburnell/statuses/")) {
		return "a previous Mastodon post"
	}
	// Twitter
	else if (value.includes("https://twitter.com/iamchrisburnell/status/") || value.includes("https://twitter.chrisburnell.com/")) {
		return "a previous Twitter post"
	}
	// Internal URL
	else if (value.includes(siteURL) || value.includes("localhost")) {
		let page = pages.filter((item) => {
			if (getPathname(value) == item.url) {
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
}

/**
 * @param {string} value
 * @returns {string}
 */
export const getMastodonHandle = (value) => {
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
}

/**
 * @param {any} value
 * @param {any} intent
 * @returns {any}
 */
export const getPlace = (value, intent) => {
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
}

/**
 * @param {string} url
 * @returns {string}
 */
export const getPostingMethod = (url) => {
	let target
	if (url.includes("//")) {
		let urlObject = new URL(url)
		target = urlObject.hostname
		for (let item of postingMethods) {
			if (item.url.includes(target)) {
				target = item.title
				break
			}
		}
	}
	return target
}

/**
 * @param {string} value
 * @returns {string}
 */
export const getSyndicationTarget = (value) => {
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
}

/**
 * @param {string} value
 * @returns {string}
 */
export const getTwitterHandle = (value) => {
	if (value.includes("https://twitter.com")) {
		return "@" + value.split("/status/")[0].split("twitter.com/")[1]
	}
	return value
}

/**
 * @param {any} value
 * @param {any} intent
 * @returns {any}
 */
export const getPerson = (value, intent) => {
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
}

/**
 * @param {string} value
 * @returns {string}
 */
export const getConsole = (value) => {
	for (let console of consoles) {
		if (value == console.title) {
			return `<abbr title="${console.abbreviation}">${console.title}</abbr>`
		}
	}
	return value
}

export default {
	maxDecimals,
	keyValue,
	keySort,
	toArray,
	arrayKeyEquals,
	arrayKeyIncludes,
	arrayKeyValues,
	toNearest,
	getResponsesLength,
	rangeMap,
	getRGB,
	getAllLinks,
	getAllReplies,
	simpleMovingAverage,
	exponentialMovingAverage,
	limit,
	getInternalTarget,
	getMastodonHandle,
	getPlace,
	getPostingMethod,
	getSyndicationTarget,
	getTwitterHandle,
	getPerson,
	getConsole,
}
