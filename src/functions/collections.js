import EleventyFetch from "@11ty/eleventy-fetch";
import blogroll from "../eleventy/data/blogroll.js";
import breweries from "../eleventy/data/breweries.js";
import gamePublishers from "../eleventy/data/gamePublishers.js";
import { nowEpoch } from "../eleventy/data/global.js";
import mastodonInstances from "../eleventy/data/mastodonInstances.js";
import meetups from "../eleventy/data/meetups.js";
import publications from "../eleventy/data/publications.js";
import {
	cacheDurations,
	favicon,
	limits,
	url as siteURL,
} from "../eleventy/data/site.js";
import { getCategoryName } from "../eleventy/filters/collections.js";
import {
	dateSort,
	epoch,
	friendlyDate,
	getRSVPValueHTML,
} from "../eleventy/filters/dates.js";
import { conjunction } from "../eleventy/filters/strings.js";
import { getHost, getPathname, tweetback } from "../eleventy/filters/urls.js";
import { getSyndicationTitle, toArray } from "../eleventy/filters/utils.js";
import { stripHTML } from "./strings.js";
import { getMastodonHandle, getTwitterHandle } from "./utils.js";

// Get data about all pages
const pages = await EleventyFetch("https://chrisburnell.com/all.json", {
	duration: cacheDurations.hourly,
	type: "json",
	fetchOptions: {
		method: "GET",
	},
});

// Create an array of references
const allPeople = [
	...blogroll,
	...breweries,
	...publications,
	...gamePublishers,
	...meetups,
];

const cachedPeople = new Map();
const peopleByTitle = new Map();
const peopleByUrl = new Map();
const peopleByMastodon = new Map();
const peopleByTwitter = new Map();
const peopleByHost = new Map();
const mastodonHosts = Object.keys(mastodonInstances);

allPeople.forEach((person) => {
	if (person.title) {
		peopleByTitle.set(person.title.toLowerCase(), person);
	}

	if (person.url) {
		toArray(person.url).forEach((url) => {
			const host = getHost(url);
			peopleByUrl.set(url, person);
			peopleByHost.set(host, person);
		});
	}

	if (person.mastodon) {
		toArray(person.mastodon).forEach((handle) => {
			peopleByMastodon.set(handle.toLowerCase(), person);
		});
	}

	if (person.twitter) {
		toArray(person.twitter).forEach((handle) => {
			peopleByTwitter.set(handle.toLowerCase(), person);
		});
	}
});

/**
 * @param {string} [title]
 * @param {string} [url]
 * @returns {string|undefined}
 */
const getPerson = (title, url) => {
	const cacheKey = `${title || ""}:${url || ""}`;
	if (cachedPeople.has(cacheKey)) {
		return cachedPeople.get(cacheKey);
	}

	let result = null;

	// Match by Title
	if (title) {
		result = peopleByTitle.get(title.toLowerCase());
		if (result) {
			cachedPeople.set(cacheKey, result);
			return result;
		}
	}

	// Match by URL
	if (url) {
		result = peopleByUrl.get(url);
		if (result) {
			cachedPeople.set(cacheKey, result);
			return result;
		}

		// Match by URL host
		const host = getHost(url);
		result = peopleByHost.get(host);
		if (result) {
			cachedPeople.set(cacheKey, result);
			return result;
		}

		// Match by Mastodon handle
		if (mastodonHosts.includes(host)) {
			const mastodonHandle = getMastodonHandle(url);
			if (mastodonHandle) {
				result = peopleByMastodon.get(mastodonHandle.toLowerCase());
				if (result) {
					cachedPeople.set(cacheKey, result);
					return result;
				}
			}
		}

		// Match by Twitter handle
		if (url.includes("https://twitter.com")) {
			const twitterHandle = getTwitterHandle(url);
			if (twitterHandle) {
				result = peopleByTwitter.get(twitterHandle.toLowerCase());
				if (result) {
					cachedPeople.set(cacheKey, result);
					return result;
				}
			}
		}
	}

	cachedPeople.set(cacheKey, result);
	return result;
};

/**
 * @param {object} item
 * @returns {boolean}
 */
export const isPublished = (item) => {
	if ("data" in item) {
		if ("draft" in item.data && item.data.draft === true) {
			return false;
		}
		if ("published" in item.data && item.data.published === false) {
			return false;
		}
		if ("tags" in item.data && item.data.tags.includes("ignore")) {
			return false;
		}
		if ("date" in item.data && epoch(item.data.date) > nowEpoch) {
			return false;
		}
	}
	return !!item.url || !!item.data?.clickthrough;
};

/**
 * @param {object} item
 * @returns {boolean}
 */
export const notReply = (item) => {
	const isReply = item?.data?.in_reply_to;
	if (!isReply) {
		return true;
	}
	// Don't count internal replies
	if ((isReply?.url || isReply).includes(siteURL)) {
		return true;
	}
	return false;
};

/**
 * @param {Array<object>} item
 * @returns {Array<object>}
 */
export const hasMinimumPageviews = (item) => {
	return item.data.pageviews.total >= limits.minimumPageviewsRequired;
};

/**
 * @param {string|Array<string>} tags
 * @param {string} collectionName
 * @returns {string}
 */
export const getCollectionCacheKey = (tags, collectionName) => {
	return collectionName || (Array.isArray(tags) ? tags.join(",") : tags);
};

/**
 * @param {Array<object>} collection
 * @param {string|Array<string>} tags
 * @returns {Array<object>}
 */
export const flattenCollections = (collection, tags) => {
	const seen = new Set();
	return tags
		.flatMap((tag) => collection.getFilteredByTag(tag))
		.filter((item) => {
			if (seen.has(item.inputPath)) {
				return false;
			}
			seen.add(item.inputPath);
			return true;
		});
};

/**
 * @param {Array<object>} collection
 * @returns {Array<object>}
 */
export const applyDefaultFilter = (collection) => {
	return collection.filter(isPublished).sort(dateSort);
};

/**
 * @param {object} data
 * @returns {object|string}
 */
export const getPropertyData = (data) => {
	if (data._cachedPropertyData !== undefined) {
		return data._cachedPropertyData;
	}

	const result =
		data?.bookmark_of ||
		data?.drink_of ||
		data?.like_of ||
		data?.listen_of ||
		data?.play_of ||
		data?.read_of ||
		data?.watch_of ||
		null;

	data._cachedPropertyData = result;
	return result;
};

/**
 * @param {object} data
 * @returns {string}
 */
export const getPropertyURL = (data) => {
	const propertyData = getPropertyData(data);
	return propertyData?.url || propertyData;
};

/**
 * @param {object} data
 * @returns {string|null}
 */
export const getPropertyTitle = (data) => {
	const propertyData = getPropertyData(data);
	return propertyData?.title || null;
};

/**
 * @param {object} data
 * @returns {string}
 */
export const getPropertyTitleFallback = (data) => {
	if (getPropertyData(data)) {
		return `${getCategoryName(data)}: ${stripHTML(getPropertyURL(data))}`;
	}
	return null;
};

/**
 * @param {object} data
 * @returns {string}
 */
export const getPropertyLabel = (data) => {
	if (getPropertyData(data)) {
		let labelPrefix = getPropertyTitle(data) ? "Read" : "Read more on";
		if (data.drink_of) {
			labelPrefix = "Also on";
		} else if (data.listen_of) {
			labelPrefix = "Find out where to listen with";
		} else if (data.play_of) {
			labelPrefix = "See more on";
		}
		return `${labelPrefix} ${getPropertyTitle(data) || getSyndicationTitle(getPropertyURL(data))}`;
	}
	return null;
};

/**
 * @param {object} data
 * @returns {Array<object>}
 */
export const getAuthors = (data) => {
	return data?.authors || getPropertyData(data)?.authors;
};

/**
 * @param {object|string} author
 * @returns {object}
 */
export const getAuthorData = (author) => {
	const authorTitle = author?.title || author;
	const authorURL = author?.url;

	if (!authorTitle || !authorURL) {
		const person = getPerson(authorTitle, authorURL);
		if (person) {
			return person;
		}
	}

	return {
		title: authorTitle,
		url: authorURL,
	};
};

/**
 * @param {object} author
 * @returns {string}
 */
const authorString = (author) => {
	if (!author.title) {
		const person = getPerson(null, author.url);
		if (person) {
			author.title = person.title;
		}
		author.title = author.url;
	}
	if (author.url) {
		return `<a href="${author.url}" class=" [ h-cite ] "${!author.url.includes(siteURL) && ` rel="external noopener"`}>${author.title}</a>`;
	}
	return `<strong class=" [ h-cite ] ">${author.title}</strong>`;
};

/**
 * @param {object} data
 * @returns {string}
 */
export const getAuthorsString = (data) => {
	if (getAuthors(data)) {
		return conjunction(
			[...getAuthors(data)].map(getAuthorData).map(authorString),
		);
	}
	return null;
};

/**
 * @param {object} data
 * @returns {object|string}
 */
const getReplyData = (data) => {
	return data?.in_reply_to;
};

/**
 * @param {object} data
 * @returns {string|null}
 */
export const getReplyTitle = (data) => {
	const replyData = getReplyData(data);
	if (replyData) {
		const replyURL = getReplyURL(data);
		if (!replyData.title) {
			const person = getPerson(null, replyURL);
			if (person) {
				return person.title;
			}
			const internalTarget = getInternalTarget(replyURL);
			if (internalTarget) {
				return internalTarget;
			}
		}
		return replyData?.title || replyData?.url || replyData;
	}
	return null;
};

/**
 * @param {object} data
 * @returns {string|null}
 */
export const getReplyURL = (data) => {
	if (data._cachedReplyURL !== undefined) {
		return data._cachedReplyURL;
	}

	const replyData = getReplyData(data);
	let result = null;
	if (replyData) {
		const replyURL = replyData?.url || replyData;
		if (replyURL) {
			result = tweetback(replyURL);
		}
	}

	data._cachedReplyURL = result;
	return result;
};

/**
 * @param {object} data
 * @returns {string|null}
 */
export const getReplyAuthor = (data) => {
	if (data._cachedReplyAuthor !== undefined) {
		return data._cachedReplyAuthor;
	}

	const replyURL = getReplyURL(data);
	let result = null;
	if (replyURL) {
		const person = getPerson(null, replyURL);
		if (person) {
			result = person;
		}
	}

	data._cachedReplyAuthor = result;
	return result;
};

/**
 * @param {object} data
 * @returns {string|null}
 */
export const getReplyAuthorString = (data) => {
	const replyAuthor = getReplyAuthor(data);
	if (replyAuthor) {
		return authorString(replyAuthor);
	}
	return null;
};

/**
 * @param {object} data
 * @returns {string|null}
 */
export const getRSVPString = (data) => {
	const rsvp = data.rsvp;
	if (rsvp) {
		return getRSVPValueHTML(rsvp.date, rsvp.end, rsvp.value);
	}
	return null;
};

/**
 * @param {string} url
 * @returns {string}
 */
export const getInternalTarget = (url) => {
	// Mastodon
	if (
		url.includes("https://fediverse.repc.co") ||
		url.includes("https://mastodon.social/users/chrisburnell/statuses/")
	) {
		return "a previous Mastodon post";
	}
	// Mastodon, external
	else if (mastodonHosts.includes(getHost(url))) {
		return getMastodonHandle(url);
	}
	// Twitter
	else if (
		url.includes("https://twitter.com/iamchrisburnell/status/") ||
		url.includes("https://twitter.chrisburnell.com/")
	) {
		return "a previous Twitter post";
	}
	// Twitter, external
	else if (url.includes("https://twitter.com")) {
		return getTwitterHandle(url);
	}
	// Internal URL
	else if (url.includes(siteURL) || url.includes("localhost")) {
		const matchingPage = pages.find((page) => {
			return getPathname(url) === getPathname(page.url);
		});
		if (matchingPage) {
			// Posts with a `title` and `category`
			if ("title" in matchingPage && "category" in matchingPage) {
				return `${matchingPage.title}, a previous ${getCategoryName(matchingPage)}`;
			}
			// Pages/Posts with a `title`
			else if ("title" in matchingPage) {
				return `${matchingPage.title}`;
			}
			// Posts with a `category`
			else if ("category" in matchingPage) {
				return `a previous ${getCategoryName(matchingPage)}`;
			}
		}
		// pages
		return `a previous page`;
	}
	return null;
};

/**
 * @param {object} data
 * @returns {string}
 */
export const getMetaTitle = (data) => {
	if ("title" in data) {
		return stripHTML(data.title);
	} else if ("rsvp" in data) {
		return `RSVP to ${stripHTML(getReplyTitle(data) || getReplyURL(data))}`;
	} else if ("in_reply_to" in data) {
		return `Reply to ${stripHTML(getReplyTitle(data) || getReplyURL(data))}`;
	} else if ("category" in data && getPropertyData(data)) {
		return `${getCategoryName(data)}: ${stripHTML(getPropertyTitle(data) || getPropertyURL(data))}`;
	} else if ("category" in data) {
		return `${getCategoryName(data)} from ${friendlyDate(data.date)}`;
	}
	return `A page on ${getHost(siteURL)}`;
};
/**
 * @param {object} data
 * @returns {string}
 */
export const getMetaImage = (data) => {
	if (data.og_image) {
		return `${siteURL}${data.og_image}`;
	} else if (data.banner || data.cover || data.photo) {
		const image = toArray(data.banner || data.cover || data.photo)[0];
		return `${siteURL}/images/built/${(image.url || image).replace("jpg", "jpeg")}`;
	}
	return siteURL + favicon;
};

export default {
	isPublished,
	notReply,
	getCollectionCacheKey,
	flattenCollections,
	applyDefaultFilter,
	hasMinimumPageviews,
	getPropertyData,
	getPropertyTitle,
	getPropertyURL,
	getAuthors,
	getAuthorData,
	getAuthorsString,
	getReplyTitle,
	getReplyURL,
	getReplyAuthor,
	getReplyAuthorString,
	getRSVPString,
	getMetaTitle,
	getMetaImage,
};
