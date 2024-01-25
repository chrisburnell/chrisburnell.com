const { url: siteUrl } = require("#data/site")
const { now } = require("#datajs/global")
const categories = require("#data/categories")
const ignoredTags = require("#data/ignoredTags")
const { epoch } = require("#filters/dates")

module.exports = {
	/**
	 * Checks if a page can be considered published.
	 * @param {Object} item
	 * @returns {Boolean}
	 */
	isPublished: (item) => {
		if ("data" in item) {
			if ("draft" in item.data && item.data.draft === true) {
				return false
			}
			if ("published" in item.data && item.data.published === false) {
				return false
			}
			if ("tags" in item.data && item.data.tags.includes("ignore")) {
				return false
			}
			if ("date" in item.data && epoch(item.data.date) > now) {
				return false
			}
		}
		return !!item.url
	},
	/**
	 * Filters an array by the items’ published status.
	 * @param {Object[]} array
	 * @returns {Object[]}
	 */
	arePublished: (array) => array.filter(module.exports.isPublished),
	/**
	 * Filters an array by items which are also present in a passed array.
	 * @param {Object[]} array
	 * @param {Object[]} filterList
	 * @returns {Object[]}
	 */
	filterBy: (array, filterList) => {
		return array.filter((item) => {
			return !filterList.includes(item)
		})
	},
	/**
	 * Filters an array by items which have a matching category.
	 * @param {Object[]} array
	 * @returns {Object[]}
	 */
	categoryFilter: (array) => {
		return module.exports.filterBy(array, categories)
	},
	/**
	 * Filters an array by items which have a matching ignored tag.
	 * @param {Object[]} array
	 * @returns {Object[]}
	 */
	tagFilter: (array) => {
		return module.exports.filterBy(array, ignoredTags)
	},
	/**
	 * Sorts an array by items’ published date.
	 * @param {Object} a
	 * @param {Object} b
	 * @returns {Number}
	 */
	dateFilter: (a, b) => {
		return new Date(b.data.date || b.date) - new Date(a.data.date || a.date)
	},
	/**
	 * Checks if a page can be considered a reply.
	 * @param {Object} item
	 * @returns {Boolean}
	 */
	notReply: (item) => {
		const isReply = item.data.in_reply_to
		const isReplyString = typeof item.data.in_reply_to === "string"

		return !isReply || (isReply.url && isReply.url.includes(siteUrl)) || (isReplyString && isReply.includes(siteUrl))
	},
}
