import { isPublished } from "../../functions/collections.js";
import { capitalize } from "../../functions/strings.js";
import { filterOut } from "../../functions/utils.js";
import categories from "../data/categories.js";
import ignoredTags from "../data/ignoredTags.js";

/**
 * @param {object[]} array
 * @returns {object[]}
 */
export const arePublished = (array) => {
	return array.filter(isPublished);
};

/**
 * @param {object[]} array
 * @returns {object[]}
 */
export const sitemapFilter = (array) => {
	return array.filter((item) => {
		return (
			item.data?.sitemap?.exclude !== true && item.data?.noindex !== true
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
 * @param {object[]} tags
 * @returns {object[]}
 */
export const categoryFilter = (tags) => {
	return filterOut(tags, categories);
};

/**
 * @param {object[]} tags
 * @returns {object[]}
 */
export const tagFilter = (tags, filterList = ignoredTags) => {
	return filterOut(tags, filterList);
};

/**
 * @param {object[]} array
 * @returns {object[]}
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
 * @param {object[]} items
 * @returns {number}
 */
export const getCollectionCount = (items) => {
	return items.filter(isPublished).length;
};

/**
 * @param {object[]} items
 * @param {string} year
 * @returns {number}
 */
export const getCollectionCountByYear = (items, year) => {
	return items.filter(isPublished).filter((item) => {
		return item.date.getFullYear() === Number(year);
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
 * @param {object[]} items
 * @param {string} weekday
 * @returns {number}
 */
export const getCollectionCountByWeekday = (items, weekday) => {
	return items.filter(isPublished).filter((item) => {
		return (
			weekdays[item.date.getDay()].toLowerCase() === weekday.toLowerCase()
		);
	}).length;
};

export default {
	arePublished,
	sitemapFilter,
	getCategoryName,
	categoryFilter,
	tagFilter,
	noPinnedFilter,
	pinnedSort,
	getCollectionCount,
	getCollectionCountByYear,
	getCollectionCountByWeekday,
};
