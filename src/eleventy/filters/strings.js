
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
/**
 * @param {string} string
 * @returns {string}
 */
export const stripHTML = (string) => {
	return string.replace(/<\/?[^>]+(>|$)/g, "")
}

export default {
	getHost,
	getPathname,
	stripHTML,
}
