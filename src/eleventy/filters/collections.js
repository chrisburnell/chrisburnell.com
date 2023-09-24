const { url: siteUrl } = require("#data/site")
const { now } = require("#datajs/global")
const categories = require("#data/categories")
const ignoredTags = require("#data/ignoredTags")
const { epoch } = require("#filters/dates")

module.exports = {
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
			if ("date" in item && epoch(item.date) > now) {
				return false
			}
		}
		return !!item.url
	},
	arePublished: (array) => array.filter(module.exports.isPublished),
	filterBy: (array, filterList) => {
		return array.filter((item) => {
			return !filterList.includes(item)
		})
	},
	categoryFilter: (array) => {
		return module.exports.filterBy(array, categories)
	},
	tagFilter: (array) => {
		return module.exports.filterBy(array, ignoredTags)
	},
	dateFilter: (a, b) => {
		return new Date(b.data.date || b.date) - new Date(a.data.date || a.date)
	},
	notReply: (item) => {
		const isReply = item.data.in_reply_to
		const isReplyString = typeof item.data.in_reply_to === "string"

		return !isReply || (isReply.url && isReply.url.includes(siteUrl)) || (isReplyString && isReply.includes(siteUrl))
	},
}
