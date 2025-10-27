import dotenv from "dotenv";
dotenv.config({ quiet: true });

import { getWebmentionPublished } from "@chrisburnell/eleventy-cache-webmentions";
import { currentYear, nowEpoch } from "../eleventy/data/global.js";
import { isPublished, notReply } from "../functions/collections.js";
import { exponentialMovingAverage } from "../functions/utils.js";
import { limits } from "./data/site.js";
import { dateSort, epoch, isFuture, isUpcoming } from "./filters/dates.js";

const durationDay = 24 * 60 * 60 * 1000;
const pageviewsCoefficient = 0.8;
const hotnessCoefficient = 1.6;

let cachedCollections = new Map();

/**
 * @param {object[]} collection
 * @param {string|string[]} tags
 * @param {Function} fn
 * @param {string} collectionName
 * @param {boolean} limit
 * @returns {object[]}
 */
const filterCollection = (
	collection,
	tags,
	fn,
	collectionName,
	limit = false,
) => {
	const cacheKey =
		collectionName || (Array.isArray(tags) ? tags.join(",") : tags);

	if (cachedCollections.has(cacheKey)) {
		return cachedCollections.get(cacheKey);
	}

	let filteredCollection;

	if (Array.isArray(tags)) {
		const seen = new Set();
		filteredCollection = tags
			.flatMap((tag) => collection.getFilteredByTag(tag))
			.filter((item) => {
				if (seen.has(item.inputPath)) {
					return false;
				}
				seen.add(item.inputPath);
				return true;
			});
	} else {
		filteredCollection = collection.getFilteredByTag(tags);
	}

	filteredCollection = filteredCollection.filter(isPublished).sort(dateSort);

	if (fn !== undefined) {
		// If additional manipulation is required, it is passed in so it too can
		// be cached
		filteredCollection = fn(filteredCollection);
	}

	if (limit && process.env.ELEVENTY_RUN_MODE !== "build") {
		// Keep only a few items per collection for performance
		filteredCollection = filteredCollection.slice(0, limits.feed);
	}

	// Keep a copy of this collection in memoized cache for later reuse
	cachedCollections.set(cacheKey, filteredCollection);

	return filteredCollection;
};

/**
 * @param {object[]} collection
 * @returns {object[]}
 */
export const pages = (collection) => {
	return filterCollection(collection, "page");
};

/**
 * @param {object[]} collection
 * @returns {object[]}
 */
export const posts = (collection) => {
	return filterCollection(collection, "post");
};

/**
 * @param {object[]} collection
 * @returns {object[]}
 */
export const blogPosts = (collection) => {
	return filterCollection(collection, "blog", (items) => {
		return items.filter((item) => {
			return !item.data.rsvp;
		});
	});
};

/**
 * @param {object[]} collection
 * @returns {object[]}
 */
export const pinnedPosts = (collection) => {
	return filterCollection(collection, "pinned");
};

/**
 * @param {object[]} collection
 * @returns {object[]}
 */
export const projects = (collection) => {
	return filterCollection(collection, "project");
};

/**
 * @param {object[]} collection
 * @returns {object[]}
 */
export const drafts = (collection) => {
	if (cachedCollections.has("drafts")) {
		return cachedCollections.get("drafts");
	}

	const filteredCollection = collection
		.getFilteredByTag("post")
		.filter(
			(item) => item.data.draft === true || item.data.published === false,
		)
		.sort(dateSort);

	cachedCollections.set("drafts", filteredCollection);

	return filteredCollection;
};

/**
 * @param {object[]} collection
 * @returns {object[]}
 */
export const writings = (collection) => {
	return filterCollection(collection, "writing");
};

/**
 * @param {object[]} collection
 * @returns {object[]}
 */
export const features = (collection) => {
	return filterCollection(
		collection,
		"feature",
		(filtered) => {
			return filtered.filter(notReply);
		},
		"features",
	);
};

/**
 * @param {object[]} collection
 * @returns {object[]}
 */
export const attendances = (collection) => {
	if (cachedCollections.has("attendances")) {
		return cachedCollections.get("attendances");
	}

	const conferences = filterCollection(collection, "conference");
	const meetups = filterCollection(collection, "meetup");

	const filteredCollection = [...conferences, ...meetups]
		.filter((item) => {
			return "rsvp" in item.data && item.data.rsvp.value === "yes";
		})
		.sort(dateSort);

	cachedCollections.set("attendances", filteredCollection);

	return filteredCollection;
};

/**
 * @param {object[]} collection
 * @returns {object[]}
 */
export const checkins = (collection) => {
	return filterCollection(
		collection,
		"post",
		(filtered) => {
			return filtered.filter((item) => {
				return "checkin" in item.data;
			});
		},
		"checkins",
	);
};

/**
 * @param {object[]} collection
 * @returns {object[]}
 */
export const replies = (collection) => {
	return filterCollection(
		collection,
		"note",
		(filtered) => {
			return filtered
				.filter((item) => "in_reply_to" in item.data)
				.filter((item) => !("rsvp" in item.data));
		},
		"replies",
	);
};

/**
 * @param {object[]} collection
 * @returns {object[]}
 */
export const notesWithoutReplies = (collection) => {
	return filterCollection(
		collection,
		"note",
		(filtered) => {
			return filtered.filter(notReply);
		},
		"notesWithoutReplies",
	);
};

/**
 * @param {object[]} collection
 * @returns {object[]}
 */
export const rsvps = (collection) => {
	return filterCollection(
		collection,
		"post",
		(filtered) => {
			return filtered
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
 * @param {object[]} collection
 * @returns {object[]}
 */
export const rsvpsToday = (collection) => {
	return filterCollection(
		collection,
		"post",
		(filtered) => {
			return filtered
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
 * @param {object[]} collection
 * @returns {object[]}
 */
export const rsvpsUpcoming = (collection) => {
	return filterCollection(
		collection,
		"post",
		(filtered) => {
			return filtered
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
 * @param {object[]} collection
 * @returns {object[]}
 */
export const onThisDay = (collection) => {
	// Blog posts made on this day and month in previous years.

	if (cachedCollections.has("onThisDay")) {
		return cachedCollections.get("onThisDay");
	}

	const currentDay = new Date().getDate();
	const currentMonth = new Date().getMonth();

	const filteredCollection = blogPosts(collection)
		.filter((item) => {
			if (item.data.rsvp || item.data.in_reply_to) {
				return false;
			}
			return true;
		})
		.filter((item) => {
			return (
				new Date(item.data.date).getFullYear() !== currentYear &&
				new Date(item.data.date).getDate() === currentDay &&
				new Date(item.data.date).getMonth() === currentMonth
			);
		});

	cachedCollections.set("onThisDay", filteredCollection);

	return filteredCollection;
};

/**
 * @param {object[]} collection
 * @returns {object[]}
 */
export const popular = (collection) => {
	// "Popular" sorting is done by totalling pageviews.

	if (cachedCollections.has("popular")) {
		return cachedCollections.get("popular");
	}

	const features = collection.getFilteredByTag("feature");
	const projects = collection.getFilteredByTag("project");
	let filteredCollection = [...features, ...projects]
		.filter(isPublished)
		.filter(notReply)
		.filter((item) => {
			return item.data.pageviews.total >= limits.minimumPageviewsRequired;
		})
		.sort(dateSort)
		.map((item) => {
			item.data.rank.popularScore =
				Math.log1p(item.data.webmentions.length) +
				pageviewsCoefficient * Math.log1p(item.data.pageviews.total);
			return item;
		})
		.sort((a, b) => {
			return b.data.rank.popularScore - a.data.rank.popularScore;
		})
		.map((item, i) => {
			delete item.data.rank.popularScore;
			item.data.rank.popular = i + 1;
			return item;
		})
		.slice(0, limits.feed);

	cachedCollections.set("popular", filteredCollection);

	return filteredCollection;
};

/**
 * @param {object[]} collection
 * @returns {object[]}
 */
export const popularByResponses = (collection) => {
	if (cachedCollections.has("popularByResponses")) {
		return cachedCollections.get("popularByResponses");
	}

	const features = collection.getFilteredByTag("feature");
	const projects = collection.getFilteredByTag("project");
	let filteredCollection = [...features, ...projects]
		.filter(isPublished)
		.filter(notReply)
		.filter((item) => {
			return (
				item.data.webmentions.length >= limits.minimumResponsesRequired
			);
		})
		.sort(dateSort)
		.sort((a, b) => {
			return b.data.webmentions.length - a.data.webmentions.length;
		})
		.map((item, i) => {
			item.data.rank.popularByResponses = i + 1;
			return item;
		})
		.slice(0, limits.feed);

	cachedCollections.set("popularByResponses", filteredCollection);

	return filteredCollection;
};

/**
 * @param {object[]} collection
 * @returns {object[]}
 */
export const popularByPageviews = (collection) => {
	if (cachedCollections.has("popularByPageviews")) {
		return cachedCollections.get("popularByPageviews");
	}

	const features = collection.getFilteredByTag("feature");
	const projects = collection.getFilteredByTag("project");
	let filteredCollection = [...features, ...projects]
		.filter(isPublished)
		.filter(notReply)
		.filter((item) => {
			return item.data.pageviews.total >= limits.minimumPageviewsRequired;
		})
		.sort(dateSort)
		.sort((a, b) => {
			return b.data.pageviews.total - a.data.pageviews.total;
		})
		.map((item, i) => {
			item.data.rank.popularByPageviews = i + 1;
			return item;
		})
		.slice(0, limits.feed);

	cachedCollections.set("popularByPageviews", filteredCollection);

	return filteredCollection;
};

/**
 * @param {object[]} collection
 * @returns {object[]}
 */
export const hot = (collection) => {
	if (cachedCollections.has("hot")) {
		return cachedCollections.get("hot");
	}

	const features = collection.getFilteredByTag("feature");
	const projects = collection.getFilteredByTag("project");
	let filteredCollection = [...features, ...projects]
		.filter(isPublished)
		.filter(notReply)
		.filter((item) => {
			return item.data.pageviews.total >= limits.minimumPageviewsRequired;
		})
		.sort(dateSort)
		.map((item) => {
			const emaWebmentions = item.data.webmentions.all.reduce(
				(accumulator, webmention) =>
					exponentialMovingAverage(
						epoch(getWebmentionPublished(webmention)) / durationDay,
						accumulator,
					),
				0,
			);
			item.data.rank.hotScore =
				Math.log1p(emaWebmentions) +
				hotnessCoefficient * Math.log1p(item.data.pageviews.hotness);
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

	cachedCollections.set("hot", filteredCollection);

	return filteredCollection;
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
	popularByResponses,
	popularByPageviews,
	hot,
};
