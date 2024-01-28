import { url as siteURL } from "../../data/site.js"

import categories from "../../data/categories.js"
import ignoredTags from "../../data/ignoredTags.js"
import { friendlyDate } from "./dates.js"
import { capitalize, conjunction, stripHTML } from "./strings.js"

/**
 * @param {object} data
 * @returns {string}
 */
export const getCategoryName = (data) => {
	return capitalize(data.categoryProper || data.category)
}

/**
 * @param {object[]} array
 * @param {object[]} filterList
 * @returns {object[]}
 */
const filterOut = (array, filterList) => {
	return array.filter((item) => {
		return !filterList.includes(item)
	})
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
 * @param {object} data
 * @returns {object|string}
 */
export const getPropertyData = (data) => {
	return data.bookmark_of || data.drink_of || data.like_of || data.listen_of || data.play_of || data.read_of || data.watch_of || {}
}

/**
 * @param {object} data
 * @returns {string}
 */
export const getPropertyTitle = (data) => {
	return getPropertyData(data)?.title
}

/**
 * @param {object} data
 * @returns {string}
 */
export const getPropertyURL = (data) => {
	const propertyData = getPropertyData(data)
	return propertyData?.url || propertyData
}

/**
 * @param {object} data
 * @returns {object[]}
 */
export const getPropertyAuthors = (data) => {
	return getPropertyData(data)?.authors || []
}

/**
 * @param {object|string} author
 * @returns {object}
 */
const getPropertyAuthorData = (author) => {
	return {
		title: author?.title || author?.url || null,
		url: author?.url || null,
	}
}

/**
 * @param {object} author
 * @returns {string}
 */
const propertyAuthorString = (author) => {
	return `<a href="${author.url}"${!author?.url.includes(siteURL) && ` rel="external"`}>${author.title}</a>`
}

/**
 * @param {object} data
 * @returns {string}
 */
export const getPropertyAuthorsString = (data) => {
	return conjunction([...getPropertyAuthors(data)].map(getPropertyAuthorData).map(propertyAuthorString))
}

/**
 * @param {object} data
 * @returns {string}
 */
export const getTitle = (data) => {
	if (data.title) {
		return stripHTML(data.title)
	} else if (getPropertyTitle(data)) {
		return `${getCategoryName(data)}: ${stripHTML(getPropertyTitle(data) || getPropertyURL(data))}`
	}
	return `${getCategoryName(data)} from ${friendlyDate(data.date)}`
}

export default {
	getCategoryName,
	getPropertyData,
	getPropertyTitle,
	getPropertyURL,
	getPropertyAuthors,
	getPropertyAuthorsString,
	getTitle,
	categoryFilter,
	tagFilter,
}
