import { transform } from "@tweetback/canonical";
import {
	getURLObject,
	getPathname,
	getHost,
	getOrigin,
	getProtocol,
} from "../../functions/urls.js";

/**
 * @param {string} url
 * @returns {string}
 */
export const tweetback = (url) => {
	try {
		return transform(url);
	} catch {
		return url;
	}
};

export { getURLObject, getPathname, getHost, getOrigin, getProtocol };

export default {
	tweetback,
	getURLObject,
	getPathname,
	getHost,
	getOrigin,
	getProtocol,
};
