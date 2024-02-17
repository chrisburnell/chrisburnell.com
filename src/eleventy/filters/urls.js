import { transform } from "@tweetback/canonical"

/**
 * @param {string} url
 * @returns {string}
 */
export const tweetback = (url) => {
	try {
		return transform(url)
	} catch (error) {
		return url
	}
}

/**
 * @param {string} url
 * @returns {object}
 */
const getURLObject = (url) => {
	try {
		const urlObject = new URL(url)
		return urlObject
	} catch (error) {
		return url
	}
}

/**
 * @param {string} url
 * @returns {string}
 */
export const getHost = (url) => {
	return getURLObject(url).hostname || url
}

/**
 * @param {string} url
 * @returns {string}
 */
export const getPathname = (url) => {
	return getURLObject(url).pathname || url
}

/**
 * @param {string} url
 * @returns {string}
 */
export const getOrigin = (url) => {
	return getURLObject(url).origin || url
}

/**
 * @param {string} url
 * @returns {string}
 */
export const getProtocol = (url) => {
	return getURLObject(url).protocol || url
}

export default {
	tweetback,
	getHost,
	getPathname,
	getOrigin,
	getProtocol,
}
