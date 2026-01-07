import { isPublished } from "../../functions/collections.js";
import { capitalize } from "../../functions/strings.js";
import { filterOut } from "../../functions/utils.js";
import categories from "../data/categories.js";
import ignoredTags from "../data/ignoredTags.js";

const cachedPublished = new WeakMap();

/**
 * @param {Array<object>} array
 * @returns {Array<object>}
 */
export const arePublished = (array) => {
	return array.filter((item) => {
		if (cachedPublished.has(item)) {
			return cachedPublished.get(item);
		}
		const result = isPublished(item);
		cachedPublished.set(item, result);
		return result;
	});
};

/**
 * @param {Array<object>} array
 * @returns {Array<object>}
 */
export const feedFilter = (array) => {
	return array.filter((item) => {
		return item.data.tags && !item.data.tags.includes("no-rss");
	});
};

/**
 * @param {Array<object>} array
 * @returns {Array<object>}
 */
export const sitemapFilter = (array) => {
	return array.filter((item) => {
		return (
			item.data?.excludeFromSitemap !== true &&
			item.data?.sitemap?.exclude !== true &&
			item.data?.noindex !== true
		);
	});
};

/**
 * @param {object} data
 * @returns {string}
 */
export const getCategoryName = (data) => {
	return capitalize(data?.categoryProper || data?.category);
};

/**
 * @param {Array<object>} tags
 * @returns {Array<object>}
 */
export const categoryFilter = (tags) => {
	return filterOut(
		tags,
		categories.map((category) => `category${category}`),
	);
};

/**
 * @param {Array<object>} tags
 * @param {Array<string>} [filterList]
 * @returns {Array<object>}
 */
export const tagFilter = (tags, filterList = ignoredTags) => {
	return filterOut(tags, filterList);
};

/**
 * @param {Array<object>} tags
 * @returns {Array<object>}
 */
export const noYearTagFilter = (tags) => {
	return tags.filter((item) => {
		return !/\d{4}$/.test(item);
	});
};

/**
 * @param {Array<object>} array
 * @returns {Array<object>}
 */
export const noPinnedFilter = (array) => {
	return array.filter((item) => {
		return item.data.tags && !item.data.tags.includes("pinned");
	});
};

/**
 * @param {object} a
 * @param {object} b
 * @returns {boolean}
 */
export const pinnedSort = (a, b) => {
	const aPinned = a.data.tags && a.data.tags.includes("pinned") ? 1 : 0;
	const bPinned = b.data.tags && b.data.tags.includes("pinned") ? 1 : 0;
	return bPinned - aPinned;
};

/**
 * @param {Array<object>} items
 * @returns {number}
 */
export const getCollectionCount = (items) => {
	return items.filter(isPublished).length;
};

/**
 * @param {Array<object>} items
 * @param {string} year
 * @returns {number}
 */
export const getCollectionCountByYear = (items, year) => {
	return items.filter(isPublished).filter((item) => {
		return (
			new Date(item.data.date ?? item.date).getFullYear() === Number(year)
		);
	}).length;
};

const weekdays = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

/**
 * @param {Array<object>} items
 * @param {string} weekday
 * @returns {number}
 */
export const getCollectionCountByWeekday = (items, weekday) => {
	return items.filter(isPublished).filter((item) => {
		return (
			weekdays[
				new Date(item.data.date ?? item.date).getDay()
			].toLowerCase() === weekday.toLowerCase()
		);
	}).length;
};

export default {
	arePublished,
	feedFilter,
	sitemapFilter,
	getCategoryName,
	categoryFilter,
	tagFilter,
	noYearTagFilter,
	noPinnedFilter,
	pinnedSort,
	getCollectionCount,
	getCollectionCountByYear,
	getCollectionCountByWeekday,
};
