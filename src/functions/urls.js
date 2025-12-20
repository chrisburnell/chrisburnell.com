const cachedURLObjects = new Map();

/**
 * @param {string} url
 * @returns {object}
 */
export const getURLObject = (url) => {
	if (cachedURLObjects.has(url)) {
		return cachedURLObjects.get(url);
	}

	let result;
	try {
		result = new URL(url);
	} catch (error) {
		console.error(error);
		result = url;
	}

	cachedURLObjects.set(url, result);
	return result;
};

/**
 * @param {string} url
 * @returns {string}
 */
export const getPathname = (url) => {
	return getURLObject(url).pathname || url;
};

/**
 * @param {string} url
 * @returns {string}
 */
export const getHost = (url) => {
	return getURLObject(url).hostname || url;
};

/**
 * @param {string} url
 * @returns {string}
 */
export const getOrigin = (url) => {
	return getURLObject(url).origin || url;
};

/**
 * @param {string} url
 * @returns {string}
 */
export const getProtocol = (url) => {
	return getURLObject(url).protocol || url;
};

export default {
	getURLObject,
	getPathname,
	getHost,
	getOrigin,
	getProtocol,
};
