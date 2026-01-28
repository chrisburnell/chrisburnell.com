import dotenv from "dotenv";
dotenv.config({ quiet: true });

import { getWebmentionPublished } from "@chrisburnell/eleventy-cache-webmentions";
import {
	currentDay,
	currentMonth,
	currentYear,
	nowEpoch,
} from "../eleventy/data/global.js";
import {
	applyDefaultFilter,
	getCollectionCacheKey,
	hasMinimumPageviews,
	notReply,
} from "../functions/collections.js";
import { exponentialMovingAverage } from "../functions/utils.js";
import { limits, weights } from "./data/site.js";
import { dateSort, epoch, isFuture, isUpcoming } from "./filters/dates.js";

/** @type {number} */
const durationDay = 24 * 60 * 60 * 1000;

/** @type {Map<[key: string]: Array<object>>} */
let cachedCollections = new Map();

/**
 * @param {object} a
 * @param {object} b
 * @returns {number}
 */
const scoreSort = (a, b) => {
	return b.data.rank.score - a.data.rank.score;
};

/**
 * @param {Array<object>} collection
 * @param {string|Array<string>} tags
 * @returns {Array<object>}
 */
const flattenCollections = (collection, tags) => {
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
 * @param {string|Array<string>} tags
 * @param {Function} [fn]
 * @param {string} [collectionName]
 * @param {boolean} [limit]
 * @returns {Array<object>}
 */
const filterCollection = (
	collection,
	tags,
	fn,
	collectionName,
	limit = false,
) => {
	const cacheKey = getCollectionCacheKey(tags, collectionName);

	if (cachedCollections.has(cacheKey)) {
		return cachedCollections.get(cacheKey);
	}

	let filteredCollection;

	if (Array.isArray(tags)) {
		filteredCollection = flattenCollections(collection, tags);
	} else {
		filteredCollection = collection.getFilteredByTag(tags);
	}

	// If additional manipulation is required, it is passed in so it can be
	// cached too. Otherwise, apply default filtering.
	if (fn !== undefined) {
		filteredCollection = fn(filteredCollection);
	} else {
		filteredCollection = applyDefaultFilter(filteredCollection);
	}

	// Keep only a few items per collection for performance
	if (limit && process.env.ELEVENTY_RUN_MODE !== "build") {
		filteredCollection = filteredCollection.slice(0, limits.feed);
	}

	// Keep a copy of this collection in memoized cache for later reuse
	cachedCollections.set(cacheKey, filteredCollection);

	return filteredCollection;
};

/**
 * "Popular" sorting is done by totalling pageviews.
 * @param {Array<object>} collection
 * @param {string|Array<string>} tags
 * @param {string} collectionName
 * @param {boolean} [limit]
 * @returns {Array<object>}
 */
const buildPopularCollection = (
	collection,
	tags,
	collectionName,
	limit = false,
) => {
	return filterCollection(
		collection,
		tags,
		(items) => {
			return applyDefaultFilter(items)
				.filter(notReply)
				.filter(hasMinimumPageviews)
				.map((item) => {
					item.data.rank.score =
						Math.log1p(item.data.webmentions.length) +
						weights.pageviewsCoefficient *
							Math.log1p(item.data.pageviews.total);
					return item;
				})
				.sort(scoreSort)
				.slice(0, limits.feed)
				.map((item, i) => {
					delete item.data.rank.score;
					item.data.rank[collectionName] = i + 1;
					return item;
				});
		},
		collectionName,
		limit,
	);
};

/**
 * @param {Array<object>} collection
 * @returns {Array<object>}
 */
export const pages = (collection) => {
	return filterCollection(collection, "page", undefined, "pages");
};

/**
 * @param {Array<object>} collection
 * @returns {Array<object>}
 */
export const posts = (collection) => {
	return filterCollection(collection, "post", undefined, "posts");
};

/**
 * @param {Array<object>} collection
 * @returns {Array<object>}
 */
export const blogPosts = (collection) => {
	return filterCollection(collection, "blog", (items) => {
		return applyDefaultFilter(items).filter((item) => {
			return !item.data.rsvp;
		});
	});
};

/**
 * @param {Array<object>} collection
 * @returns {Array<object>}
 */
export const pinnedPosts = (collection) => {
	return filterCollection(collection, "pinned");
};

/**
 * @param {Array<object>} collection
 * @returns {Array<object>}
 */
export const projects = (collection) => {
	return filterCollection(collection, "project", undefined, "projects");
};

/**
 * @param {Array<object>} collection
 * @returns {Array<object>}
 */
export const drafts = (collection) => {
	return filterCollection(
		collection,
		"post",
		(items) => {
			return items
				.filter(
					(item) =>
						item.data.draft === true ||
						item.data.published === false,
				)
				.sort(dateSort);
		},
		"drafts",
	);
};

/**
 * @param {Array<object>} collection
 * @returns {Array<object>}
 */
export const writings = (collection) => {
	return filterCollection(collection, "writing");
};

/**
 * @param {Array<object>} collection
 * @returns {Array<object>}
 */
export const features = (collection) => {
	return filterCollection(
		collection,
		"feature",
		(items) => applyDefaultFilter(items),
		"features",
	);
};

/**
 * @param {Array<object>} collection
 * @returns {Array<object>}
 */
export const attendances = (collection) => {
	return filterCollection(
		collection,
		["conference", "meetup"],
		(items) => {
			return applyDefaultFilter(items).filter((item) => {
				return "rsvp" in item.data && item.data.rsvp.value === "yes";
			});
		},
		"attendances",
	);
};

/**
 * @param {Array<object>} collection
 * @returns {Array<object>}
 */
export const checkins = (collection) => {
	return filterCollection(
		collection,
		"post",
		(items) => {
			return applyDefaultFilter(items).filter((item) => {
				return "checkin" in item.data;
			});
		},
		"checkins",
	);
};

/**
 * @param {Array<object>} collection
 * @returns {Array<object>}
 */
export const replies = (collection) => {
	return filterCollection(
		collection,
		"categoryNote",
		(items) => {
			return applyDefaultFilter(items)
				.filter((item) => "in_reply_to" in item.data)
				.filter((item) => !("rsvp" in item.data));
		},
		"replies",
	);
};

/**
 * @param {Array<object>} collection
 * @returns {Array<object>}
 */
export const notesWithoutReplies = (collection) => {
	return filterCollection(
		collection,
		"note",
		(items) => {
			return applyDefaultFilter(items).filter(notReply);
		},
		"notesWithoutReplies",
	);
};

/**
 * @param {Array<object>} collection
 * @returns {Array<object>}
 */
export const rsvps = (collection) => {
	return filterCollection(
		collection,
		"post",
		(items) => {
			return applyDefaultFilter(items)
				.filter((item) => "rsvp" in item.data)
				.sort((a, b) => {
					if (a.data.rsvp.end && b.data.rsvp.end) {
						return (
							new Date(b.data.rsvp.end) -
							new Date(a.data.rsvp.end)
						);
					}
					return 0;
				});
		},
		"rsvps",
	);
};

/**
 * @param {Array<object>} collection
 * @returns {Array<object>}
 */
export const rsvpsToday = (collection) => {
	return filterCollection(
		collection,
		"post",
		(items) => {
			return applyDefaultFilter(items)
				.filter((item) => item.data.rsvp)
				.filter((item) => {
					// Check that the end isn't in the past
					return isFuture(item.data.rsvp.end);
				})
				.filter((item) => {
					// Check that the RSVP is within next 1 days
					return (
						isUpcoming(item.data.rsvp.date, 1) ||
						epoch(item.data.rsvp.date) < nowEpoch
					);
				})
				.sort((a, b) => {
					return (
						new Date(a.data.rsvp.end) - new Date(b.data.rsvp.end)
					);
				});
		},
		"rsvpsToday",
	);
};

/**
 * @param {Array<object>} collection
 * @returns {Array<object>}
 */
export const rsvpsUpcoming = (collection) => {
	return filterCollection(
		collection,
		"post",
		(items) => {
			return applyDefaultFilter(items)
				.filter((item) => item.data.rsvp)
				.filter((item) => {
					// Check that the end isn't in the past
					return isFuture(item.data.rsvp.end);
				})
				.filter((item) => {
					// Remove posts that would be in the rsvpsToday collection
					if (isUpcoming(item.data.rsvp.date, 1)) {
						return false;
					}

					// Check if upcoming RSVPs should ignore the upcoming lead
					if (item.data.rsvp.show_upcoming_always) {
						return true;
					}

					// Check that post is upcoming
					return isUpcoming(
						item.data.rsvp.date,
						item.data.rsvp.upcoming_days_lead,
					);
				})
				.sort((a, b) => {
					return (
						new Date(b.data.rsvp.end) - new Date(a.data.rsvp.end)
					);
				});
		},
		"rsvpsUpcoming",
	);
};

/**
 * @param {Array<object>} collection
 * @returns {Array<object>}
 */
export const onThisDay = (collection) => {
	if (cachedCollections.has("onThisDay")) {
		return cachedCollections.get("onThisDay");
	}

	const filteredCollection = [];
	const blogPostsCollection = blogPosts(collection);

	for (const item of blogPostsCollection) {
		if (item.data.rsvp || item.data.in_reply_to) {
			continue;
		}

		const itemDate = new Date(item.data.date);

		if (
			itemDate.getFullYear() !== currentYear &&
			itemDate.getDate() === currentDay &&
			itemDate.getMonth() === currentMonth
		) {
			filteredCollection.push(item);
		}
	}

	cachedCollections.set("onThisDay", filteredCollection);

	return filteredCollection;
};

/**
 * @param {Array<object>} collection
 * @returns {Array<object>}
 */
export const popular = (collection) =>
	buildPopularCollection(collection, ["feature", "project"], "popular");

/**
 * @param {Array<object>} collection
 * @returns {Array<object>}
 */
export const popularFeatures = (collection) =>
	buildPopularCollection(collection, ["feature"], "popularFeatures");

/**
 * @param {Array<object>} collection
 * @returns {Array<object>}
 */
export const popularProjects = (collection) =>
	buildPopularCollection(collection, ["project"], "popularProjects");

/**
 * @param {Array<object>} collection
 * @returns {Array<object>}
 */
export const hot = (collection) => {
	return filterCollection(
		collection,
		["feature", "project"],
		(items) => {
			return applyDefaultFilter(items)
				.filter(notReply)
				.filter((item) => {
					return (
						item.data.pageviews.total >=
						limits.minimumPageviewsRequired
					);
				})
				.map((item) => {
					const emaWebmentions = item.data.webmentions.all.reduce(
						(accumulator, webmention) =>
							exponentialMovingAverage(
								epoch(getWebmentionPublished(webmention)) /
									durationDay,
								accumulator,
								weights.responsesCoefficient,
							),
						0,
					);
					item.data.rank.hotScore =
						Math.log1p(emaWebmentions) +
						weights.hotnessCoefficient *
							Math.log1p(item.data.pageviews.hotness);
					return item;
				})
				.sort((a, b) => {
					return b.data.rank.hotScore - a.data.rank.hotScore;
				})
				.map((item, i) => {
					delete item.data.rank.hotScore;
					item.data.rank.hot = i + 1;
					return item;
				})
				.slice(0, limits.feed);
		},
		"hot",
	);
};

export default {
	pages,
	posts,
	blogPosts,
	pinnedPosts,
	projects,
	drafts,
	writings,
	features,
	attendances,
	checkins,
	replies,
	notesWithoutReplies,
	rsvps,
	rsvpsToday,
	rsvpsUpcoming,
	onThisDay,
	popular,
	popularFeatures,
	popularProjects,
	hot,
};
