import { getContent, getPublished, getType } from "@chrisburnell/eleventy-cache-webmentions"
import consoles from "../../data/consoles.js"
import places from "../../data/places.js"
import postingMethods from "../../data/postingMethods.js"
import syndicationTargets from "../../data/syndicationTargets.js"
import { getHost } from "../filters/urls.js"

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
	const keys = key.split(".")
	return keys.reduce((o, k) => {
		return o[k]
	}, object)
}

/**
 * @param {object} object
 * @param {string} key
 * @param {any} check
 * @returns {boolean}
 */
export const keyValueEquals = (object, key, check) => {
	const value = key.split(".").reduce((o, k) => {
		return o[k]
	}, object)
	return value === check
}

/**
 * @param {object[]} array
 * @param {string} key
 * @param {any} check
 * @returns {object[]}
 */
export const arrayKeyValueEquals = (array, key, check) => {
	return array.filter((item) => {
		return keyValueEquals(item, key, check)
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
 * @param {string} key
 * @returns {object[]}
 */
export const arrayKeyNotSet = (array, key) => {
	return array.filter((item) => {
		const value = key.split(".").reduce((o, k) => {
			return o[k]
		}, item)
		return !value
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
export const toNearest = (value, multiple, floor = false) => {
	if (floor) {
		return Math.floor(value / multiple) * multiple
	}
	return Math.round(value / multiple) * multiple
}

/**
 * @param {number} number
 * @param {number} inMin
 * @param {number} inMax
 * @param {number} outMin
 * @param {number} outMax
 * @param {number} decimals
 * @returns {number}
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
 * @param {object} item
 * @returns {boolean}
 */
const isBackfeed = (item) => {
	return item["wm-source"].includes("https://brid-gy.appspot.com") || item["wm-source"].includes("https://brid.gy")
}

/**
 * @param {object[]} array
 * @returns {object[]}
 */
export const getSocialReplies = (array) => {
	return (
		array
			// Only "in-reply-to" types
			.filter((item) => {
				return getType(item) === "in-reply-to"
			})
			// Only Backfeed or without content
			.filter((item) => {
				return isBackfeed(item) || !getContent(item)
			})
	)
}

/**
 * @param {object[]} array
 * @returns {object[]}
 */
export const getDirectReplies = (array) => {
	return (
		array
			// Only "in-reply-to" types
			.filter((item) => {
				return getType(item) === "in-reply-to"
			})
			// Only non-Backfeed and with content
			.filter((item) => {
				return !isBackfeed(item) && !!getContent(item)
			})
			.sort((a, b) => {
				return new Date(getPublished(a)) - new Date(getPublished(b))
			})
	)
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
export const getPostingMethodTitle = (url) => {
	try {
		const knownPostingMethod = postingMethods.find((postingMethod) => {
			return postingMethod.url.includes(getHost(url))
		})
		return knownPostingMethod.title
	} catch (error) {
		return url
	}
}

/**
 * @param {string} value
 * @returns {string}
 */
export const getSyndicationTitle = (url) => {
	try {
		const knownSyndication = syndicationTargets.find((syndicationTarget) => {
			return syndicationTarget.url.includes(getHost(url))
		})
		return knownSyndication.title
	} catch (error) {
		return url
	}
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

/**
 *
 * @param {any} value
 * @returns {boolean}
 */
export const isString = (value) => {
	return typeof value === "string"
}

export default {
	maxDecimals,
	keyValue,
	keyValueEquals,
	arrayKeyValueEquals,
	arrayKeyIncludes,
	arrayKeyNotSet,
	keySort,
	toArray,
	toNearest,
	rangeMap,
	getRGB,
	limit,
	getSocialReplies,
	getDirectReplies,
	getPlace,
	getPostingMethodTitle,
	getSyndicationTitle,
	getConsole,
	isString,
}
