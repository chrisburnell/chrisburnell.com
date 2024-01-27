/**
 * @param {string} url
 * @returns {object}
 */
const getURLObject = (url) => {
	return new URL(url)
}

/**
 * @param {string} url
 * @returns {string}
 */
export const getHost = (url) => {
	return getURLObject(url).hostname
}

/**
 * @param {string} url
 * @returns {string}
 */
export const getPathname = (url) => {
	return getURLObject(url).pathname
}

export default {
	getHost,
	getPathname,
}
