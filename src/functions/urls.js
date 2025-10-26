/**
 * @param {string} url
 * @returns {Object}
 */
export const getURLObject = (url) => {
	try {
		const urlObject = new URL(url);
		return urlObject;
	} catch (error) {
		console.error(error);
		return url;
	}
};

/**
 * @param {string} url
 * @returns {string}
 */
export const getPathname = (url) => {
	return getURLObject(url).pathname || url;
};

export default {
	getURLObject,
	getPathname,
};
