import { transform } from "@tweetback/canonical";
import { getURLObject } from "../../functions/urls.js";

/**
 * @param {string} url
 * @returns {string}
 */
export const tweetback = (url) => {
	try {
		return transform(url);
	} catch (error) {
		return url;
	}
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
	tweetback,
	getHost,
	getOrigin,
	getProtocol,
};
