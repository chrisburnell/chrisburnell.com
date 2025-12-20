import {
	getWebmentionContent,
	getWebmentionPublished,
	getWebmentionSource,
	getWebmentionType,
} from "@chrisburnell/eleventy-cache-webmentions";
import merge from "deepmerge";
import webmentionReplacements from "../config/webmentionReplacements.js";
import consoles from "../data/consoles.js";
import places from "../data/places.js";
import postingMethods from "../data/postingMethods.js";
import { localeSpecific } from "../data/site.js";
import syndicationTargets from "../data/syndicationTargets.js";
import { getHost } from "../filters/urls.js";

/**
 * @param {number} number
 * @param {number} [decimals]
 * @param {boolean} [stripPadding]
 * @returns {number|string}
 */
export const minDecimals = (number, decimals = 3, stripPadding = true) => {
	const result = Intl.NumberFormat(localeSpecific, {
		minimumFractionDigits: decimals,
	}).format(number);
	return stripPadding ? Number(result) : result;
};

/**
 * @param {number} number
 * @param {number} [decimals]
 * @param {boolean} [stripPadding]
 * @returns {number|string}
 */
export const maxDecimals = (number, decimals = 3, stripPadding = true) => {
	const result = Intl.NumberFormat(localeSpecific, {
		maximumFractionDigits: decimals,
	}).format(number);
	return stripPadding ? Number(result) : result;
};

/**
 * @param {number} number
 * @param {number} [decimals]
 * @param {boolean} [stripPadding]
 * @returns {number|string}
 */
export const setDecimals = (number, decimals = 3, stripPadding = true) => {
	const result = Intl.NumberFormat(localeSpecific, {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	}).format(number);
	return stripPadding ? Number(result) : result;
};

/**
 * @param {number} number
 * @param {number} [zeroes]
 * @returns {string}
 */
export const padWithZeroes = (number, zeroes = 2) => {
	return Intl.NumberFormat(localeSpecific, {
		minimumIntegerDigits: zeroes,
	}).format(number);
};

/**
 * @param {number} value
 * @param {number} operand
 * @returns {number}
 */
export const modulo = (value, operand) => {
	return value % operand;
};

/**
 * @param {object} object
 * @param {string} keyPath
 * @returns {any}
 */
export const keyValue = (object, keyPath) => {
	return keyPath.split(".").reduce((o, k) => o[k], object);
};

/**
 * @param {object} object
 * @param {string} key
 * @param {any} check
 * @param {boolean} [caseSensitive]
 * @returns {boolean}
 */
export const keyValueEquals = (object, key, check, caseSensitive = true) => {
	const value = keyValue(object, key);
	if (!caseSensitive) {
		return value.toLowerCase() === check.toLowerCase();
	}
	return value === check;
};

/**
 * @param {Array<object>} array
 * @param {string} key
 * @param {any} check
 * @param {boolean} [caseSensitive]
 * @returns {Array<object>}
 */
export const arrayKeyValueEquals = (array, key, check, caseSensitive) => {
	return array.filter((item) => {
		return keyValueEquals(item, key, check, caseSensitive);
	});
};

/**
 * @param {Array<object>} array
 * @param {string} key
 * @param {any} value
 * @returns {boolean}
 */
export const arrayKeyIncludes = (array, key, value) => {
	return array.filter((item) => {
		const itemValue = keyValue(item, key);
		return itemValue.includes(value);
	});
};

/**
 * @param {Array<object>} array
 * @param {string} key
 * @returns {Array<object>}
 */
export const arrayKeySet = (array, key) => {
	return array.filter((item) => {
		const value = keyValue(item, key);
		return !!value;
	});
};

/**
 * @param {Array<object>} array
 * @param {string} key
 * @returns {Array<object>}
 */
export const arrayKeyNotSet = (array, key) => {
	return array.filter((item) => {
		const value = keyValue(item, key);
		return !value;
	});
};

/**
 * @param {Array<object>} array
 * @param {string} key
 * @param {{ string: any }} [sortOptions]
 * @returns {Array<object>}
 */
export const keySort = (
	array,
	key,
	sortOptions = { ignorePunctuation: true },
) => {
	return array.sort((a, b) => {
		const aValue = keyValue(a, key);
		const bValue = keyValue(b, key);
		return String(aValue || "").localeCompare(
			String(bValue || ""),
			undefined,
			sortOptions,
		);
	});
};

/**
 * @param {any} value
 * @returns {Array<object>}
 */
export const toArray = (value) => {
	if (Array.isArray(value)) {
		return value;
	}
	return [value];
};

/**
 * @param {number} value
 * @param {number} multiple
 * @param {boolean} [floor=false]
 * @returns {number}
 */
export const toNearest = (value, multiple, floor = false) => {
	if (floor) {
		return Math.floor(value / multiple) * multiple;
	}
	return Math.round(value / multiple) * multiple;
};

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
	return (
		((number - inMin) * (outMax - outMin)) / (inMax - inMin) +
		outMin
	).toFixed(decimals || 0);
};

/**
 * @param {string} string
 * @param {number} [decimals]
 * @returns {number}
 */
export const stringToPercent = (string, decimals = 1) => {
	const [numerator, denominator] = string.split("/").map(Number);
	return maxDecimals((numerator / denominator) * 100, decimals);
};

/**
 * @param {string} hex
 * @returns {number}
 */
export const getRGB = (hex) => {
	const COLOR = hex.replace("#", "").slice(0, 6);
	return COLOR.match(/.{1,2}/g).map((value) => {
		return parseInt(value, 16);
	});
};

/**
 * @param {Array<object>} array
 * @param {number} limit
 * @returns {Array<object>}
 */
export const limit = (array, limit) => {
	return array.slice(0, limit);
};

/**
 * @param {object} item
 * @returns {boolean}
 */
const isBackfeed = (item) => {
	return (
		item["wm-source"].includes("https://brid-gy.appspot.com") ||
		item["wm-source"].includes("https://brid.gy")
	);
};

/**
 * @param {Array<import("@chrisburnell/eleventy-cache-webmentions").Webmention>} webmentions
 * @returns {Array<import("@chrisburnell/eleventy-cache-webmentions").Webmention>}
 */
export const getSocialReplies = (webmentions) => {
	return (
		webmentions
			// Only "in-reply-to" types
			.filter((item) => {
				return getWebmentionType(item) === "in-reply-to";
			})
			// Only Backfeed or without content
			.filter((item) => {
				return isBackfeed(item) || !getWebmentionContent(item);
			})
	);
};

/**
 * @param {Array<import("@chrisburnell/eleventy-cache-webmentions").Webmention>} webmentions
 * @returns {Array<import("@chrisburnell/eleventy-cache-webmentions").Webmention>}
 */
export const getDirectReplies = (webmentions) => {
	return (
		webmentions
			// Only "in-reply-to" types
			.filter((item) => {
				return getWebmentionType(item) === "in-reply-to";
			})
			// Only non-Backfeed and with content
			.filter((item) => {
				return !isBackfeed(item) && !!getWebmentionContent(item);
			})
			.sort((a, b) => {
				return (
					new Date(getWebmentionPublished(a)) -
					new Date(getWebmentionPublished(b))
				);
			})
	);
};

/**
 * @param {Array<import("@chrisburnell/eleventy-cache-webmentions").Webmention>} webmentions
 * @returns {Array<import("@chrisburnell/eleventy-cache-webmentions").Webmention>}
 */
export const replaceWebmentions = (webmentions) => {
	return webmentions.map((webmention) => {
		const replacement =
			webmentionReplacements[getWebmentionSource(webmention)];
		if (replacement) {
			return merge(webmention, replacement);
		}
		return webmention;
	});
};

/**
 * @param {any} value
 * @param {any} intent
 * @returns {any}
 */
export const getPlace = (value, intent) => {
	// Default metadata to the passed value (string/object)
	let title, url, lat, long, address;
	// Extract bits of metadata if they exist
	if (typeof value === "object") {
		if ("title" in value) {
			title = value.title;
		}
		if ("url" in value) {
			url = value.url;
		}
		if ("lat" in value) {
			// eslint-disable-next-line no-unused-vars
			lat = value.lat;
		}
		if ("long" in value) {
			// eslint-disable-next-line no-unused-vars
			long = value.long;
		}
		if ("address" in value) {
			// eslint-disable-next-line no-unused-vars
			address = value.address;
		}
	} else {
		title = value;
		url = value;
	}
	// Loop through known places to make matches based on:
	// - title
	// - url
	for (let place of places) {
		// Check title
		if (place.title === title) {
			title = place.title;
			value = place;
			break;
		}
		// Check url
		if (url && "url" in place) {
			// Parse URL for place match
			for (let place_url of toArray(place.url)) {
				if (url.includes(place_url)) {
					url = toArray(place.url)[0];
					value = place;
					break;
				}
			}
		}
	}
	// Spit out specific bits of metadata
	if (intent == "object") {
		return value;
	}
	if (intent == "url") {
		return value.url || value;
	} else if (intent == "lat") {
		return value.lat || value;
	} else if (intent == "long") {
		return value.long || value;
	} else if (intent == "address") {
		return value.address || value;
	}
	return value.title || value;
};

/**
 * @param {string} url
 * @returns {string}
 */
export const getPostingMethodTitle = (url) => {
	try {
		const knownPostingMethod = postingMethods.find((postingMethod) => {
			return postingMethod.url.includes(getHost(url));
		});
		return knownPostingMethod.title;
	} catch {
		return url;
	}
};

/**
 * @param {string} url
 * @returns {string}
 */
export const getSyndicationTitle = (url) => {
	try {
		const knownSyndication = syndicationTargets.find(
			(syndicationTarget) => {
				return syndicationTarget.url.includes(getHost(url));
			},
		);
		return knownSyndication.title;
	} catch {
		return url;
	}
};

/**
 * @param {string} value
 * @returns {string}
 */
export const getConsole = (value) => {
	for (let console of consoles) {
		if (value == console.title) {
			return `<abbr title="${console.abbreviation}">${console.title}</abbr>`;
		}
	}
	return value;
};

/**
 * @param {any} value
 * @returns {boolean}
 */
export const isString = (value) => {
	return typeof value === "string";
};

/**
 * @param {object} item
 * @returns {number|null}
 */
export const getPagefindWeight = (item) => {
	if (item.data?.searchWeight) {
		return item.data.searchWeight;
	}

	if (item.data?.rank?.hot || item.data?.rank?.popular) {
		const score = Math.max(item.data.rank?.hot || item.data.rank?.popular);
		return Math.log2(12 - score);
	}

	if (item.data?.searchCollectionWeight) {
		return item.data.searchCollectionWeight;
	}

	return null;
};

export default {
	minDecimals,
	maxDecimals,
	setDecimals,
	padWithZeroes,
	modulo,
	keyValue,
	keyValueEquals,
	arrayKeyValueEquals,
	arrayKeyIncludes,
	arrayKeySet,
	arrayKeyNotSet,
	keySort,
	toArray,
	toNearest,
	rangeMap,
	stringToPercent,
	getRGB,
	limit,
	getSocialReplies,
	getDirectReplies,
	replaceWebmentions,
	getPlace,
	getPostingMethodTitle,
	getSyndicationTitle,
	getConsole,
	isString,
	getPagefindWeight,
};
