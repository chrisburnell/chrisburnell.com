import dotenv from "dotenv";
dotenv.config();

import { getWebmentionPublished } from "@chrisburnell/eleventy-cache-webmentions";
import { currentYear, nowEpoch } from "../eleventy/data/global.js";
import { isPublished, notReply } from "../functions/collections.js";
import { exponentialMovingAverage } from "../functions/utils.js";
import { limits } from "./data/site.js";
import { dateSort, epoch, isFuture, isUpcoming } from "./filters/dates.js";

const durationDay = 24 * 60 * 60 * 1000;

let cachedCollections = {};

/**
 * @param {object[]} collection
 * @param {string} tag
 * @param {boolean} limit
 * @returns
 */
const filterCollection = (collection, tag, limit = false) => {
	if (tag in cachedCollections) {
		// This collection already exists in memoized cache
		return cachedCollections[tag];
	}

	let filteredCollection = collection
		.getFilteredByTag(tag)
		.filter(isPublished)
		.sort(dateSort);

	if (limit && process.env.ELEVENTY_RUN_MODE !== "build") {
		// Keep only a few items per collection for performance
		filteredCollection = filteredCollection.slice(0, limits.feed);
	}

	// Keep a copy of this collection in memoized cache for later reuse
	cachedCollections[tag] = filteredCollection;

	return filteredCollection;
};

export const pages = (collection) => {
	return filterCollection(collection, "page");
};

export const posts = (collection) => {
	return filterCollection(collection, "post");
};

export const blogPosts = (collection) => {
	return filterCollection(collection, "blog");
};

export const pinnedPosts = (collection) => {
	return filterCollection(collection, "pinned");
};

export const projects = (collection) => {
	return filterCollection(collection, "project");
};

export const drafts = (collection) => {
	if ("drafts" in cachedCollections) {
		return cachedCollections["drafts"];
	}

	const filteredCollection = collection
		.getFilteredByTag("post")
		.filter(
			(item) => item.data.draft === true || item.data.published === false,
		)
		.sort(dateSort);

	cachedCollections["drafts"] = filteredCollection;

	return filteredCollection;
};

export const writings = (collection) => {
	return filterCollection(collection, "writing");
};

export const features = (collection) => {
	if ("features" in cachedCollections) {
		return cachedCollections["features"];
	}

	const filteredCollection = collection
		.getFilteredByTag("feature")
		.filter(isPublished)
		.filter(notReply)
		.sort(dateSort);

	cachedCollections["features"] = filteredCollection;

	return filteredCollection;
};

export const attendances = (collection) => {
	if ("attendances" in cachedCollections) {
		return cachedCollections["attendances"];
	}

	const conferences = collection
		.getFilteredByTag("conference")
		.filter(isPublished);
	const meetups = collection.getFilteredByTag("meetup").filter(isPublished);
	const filteredCollection = [...conferences, ...meetups]
		.filter((item) => {
			return "rsvp" in item.data && item.data.rsvp.value === "yes";
		})
		.sort(dateSort);

	cachedCollections["attendances"] = filteredCollection;

	return filteredCollection;
};

export const checkins = (collection) => {
	if ("checkins" in cachedCollections) {
		return cachedCollections["checkins"];
	}

	const filteredCollection = collection
		.getFilteredByTag("post")
		.filter(isPublished)
		.filter((item) => {
			return "checkin" in item.data;
		})
		.sort(dateSort);

	cachedCollections["checkins"] = filteredCollection;

	return filteredCollection;
};

export const replies = (collection) => {
	if ("replies" in cachedCollections) {
		return cachedCollections["replies"];
	}

	const filteredCollection = collection
		.getFilteredByTag("note")
		.filter(isPublished)
		.filter((item) => "in_reply_to" in item.data)
		.filter((item) => !("rsvp" in item.data))
		.sort(dateSort);

	cachedCollections["replies"] = filteredCollection;

	return filteredCollection;
};

export const notesWithoutReplies = (collection) => {
	if ("notesWithoutReplies" in cachedCollections) {
		return cachedCollections["notesWithoutReplies"];
	}

	const filteredCollection = collection
		.getFilteredByTag("note")
		.filter(isPublished)
		.filter(notReply)
		.sort(dateSort);

	cachedCollections["notesWithoutReplies"] = filteredCollection;

	return filteredCollection;
};

export const rsvps = (collection) => {
	if ("rsvps" in cachedCollections) {
		return cachedCollections["rsvps"];
	}

	const filteredCollection = collection
		.getFilteredByTag("post")
		.filter(isPublished)
		.filter((item) => "rsvp" in item.data)
		.sort(dateSort)
		.sort((a, b) => {
			if (a.data.rsvp.end && b.data.rsvp.end) {
				return new Date(b.data.rsvp.end) - new Date(a.data.rsvp.end);
			}
			return 0;
		});

	cachedCollections["rsvps"] = filteredCollection;

	return filteredCollection;
};

export const rsvpsToday = (collection) => {
	if ("rsvpsToday" in cachedCollections) {
		return cachedCollections["rsvpsToday"];
	}

	const filteredCollection = collection
		.getFilteredByTag("post")
		.filter(isPublished)
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
		.sort(dateSort)
		.sort((a, b) => {
			return new Date(a.data.rsvp.end) - new Date(b.data.rsvp.end);
		});

	cachedCollections["rsvpsToday"] = filteredCollection;

	return filteredCollection;
};

export const rsvpsUpcoming = (collection) => {
	if ("rsvpsUpcoming" in cachedCollections) {
		return cachedCollections["rsvpsUpcoming"];
	}

	const filteredCollection = collection
		.getFilteredByTag("post")
		.filter(isPublished)
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
		.sort(dateSort)
		.sort((a, b) => {
			return new Date(b.data.rsvp.end) - new Date(a.data.rsvp.end);
		});

	cachedCollections["rsvpsUpcoming"] = filteredCollection;

	return filteredCollection;
};

export const onThisDay = (collection) => {
	// Blog posts made on this day and month in previous years.

	if ("onThisDay" in cachedCollections) {
		return cachedCollections["onThisDay"];
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

	cachedCollections["onThisDay"] = filteredCollection;

	return filteredCollection;
};

export const popular = (collection) => {
	// "Popular" sorting is done by totalling Webmentions.

	if ("popular" in cachedCollections) {
		return cachedCollections["popular"];
	}

	const features = collection.getFilteredByTag("feature");
	const projects = collection.getFilteredByTag("project");
	const filteredCollection = [...features, ...projects]
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
		.slice(0, limits.feed);

	cachedCollections["popular"] = filteredCollection;

	return filteredCollection;
};

export const hot = (collection) => {
	// "Hot" sorting is done by determining the exponential moving average
	// as a function of Webmentions across time.

	if ("hot" in cachedCollections) {
		return cachedCollections["hot"];
	}

	const features = collection.getFilteredByTag("feature");
	const projects = collection.getFilteredByTag("project");
	const filteredCollection = [...features, ...projects]
		.filter(isPublished)
		.filter(notReply)
		.filter((item) => {
			return (
				item.data.webmentions.length >= limits.minimumResponsesRequired
			);
		})
		.sort(dateSort)
		.map((item) => {
			item.hotness = item.data.webmentions.reduce(
				(accumulator, webmention) => {
					return exponentialMovingAverage(
						epoch(getWebmentionPublished(webmention)) / durationDay,
						accumulator,
					);
				},
				0,
			);

			return item;
		})
		.sort((a, b) => {
			return b.hotness - a.hotness;
		})
		.slice(0, limits.feed);

	cachedCollections["hot"] = filteredCollection;

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
	hot,
};
