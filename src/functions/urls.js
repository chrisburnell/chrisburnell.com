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

export default {
	getURLObject,
};
