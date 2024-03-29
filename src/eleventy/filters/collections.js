import categories from "../../data/categories.js"
import ignoredTags from "../../data/ignoredTags.js"
import { isPublished } from "../../functions/collections.js"
import { capitalize } from "../../functions/strings.js"
import { filterOut } from "../../functions/utils.js"

/**
 * @param {object[]} array
 * @returns {object[]}
 */
export const arePublished = (array) => {
	return array.filter(isPublished)
}

/**
 *
 * @param {object[]} array
 * @returns {object[]}
 */
export const sitemapFilter = (array) => {
	return array.filter((item) => {
		if (item.data.sitemap && "exclude" in item.data.sitemap) {
			return !item.data.sitemap.exclude
		}
		return true
	})
}

/**
 * @param {object} data
 * @returns {string}
 */
export const getCategoryName = (data) => {
	return capitalize(data?.categoryProper || data?.category)
}

/**
 * @param {object[]} array
 * @returns {object[]}
 */
export const categoryFilter = (array) => {
	return filterOut(array, categories)
}

/**
 * @param {object[]} array
 * @returns {object[]}
 */
export const tagFilter = (array) => {
	return filterOut(array, ignoredTags)
}

/**
 * @param {object[]} items
 * @returns {number}
 */
export const getCollectionCount = (items) => {
	return items.filter(isPublished).length
}

/**
 * @param {object[]} items
 * @param {string} year
 * @returns {number}
 */
export const getCollectionCountByYear = (items, year) => {
	return items.filter(isPublished).filter((item) => {
		return item.date.getFullYear() === Number(year)
	}).length
}

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

/**
 * @param {object[]} items
 * @param {string} weekday
 * @returns {number}
 */
export const getCollectionCountByWeekday = (items, weekday) => {
	return items.filter(isPublished).filter((item) => {
		return weekdays[item.date.getDay()] === weekday
	}).length
}

export default {
	arePublished,
	sitemapFilter,
	getCategoryName,
	categoryFilter,
	tagFilter,
	getCollectionCount,
	getCollectionCountByYear,
	getCollectionCountByWeekday,
}
