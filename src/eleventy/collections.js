const dateFilters = require("./filters/dates.js")
const collectionFilters = require("./filters/collections.js")
const queryFilters = require("./filters/queries.js")

const global = require("../data/global.js")
const site = require("../data/site.json")
const webmentions = require("../data/webmentions.js")

module.exports = {
	page: (collection) => {
		return collection.getFilteredByTag("page").filter(collectionFilters.isPublished)
	},
	posts: (collection) => {
		return collection.getFilteredByTag("post").filter(collectionFilters.isPublished).sort(collectionFilters.dateFilter)
	},
	writingPosts: (collection) => {
		return collection.getFilteredByTag("writing").filter(collectionFilters.isPublished).sort(collectionFilters.dateFilter)
	},
	featurePosts: (collection) => {
		return collection.getFilteredByTag("feature").filter(collectionFilters.isPublished).filter(collectionFilters.notReply).sort(collectionFilters.dateFilter)
	},
	hot: async (collection) => {
		return (async () => {
			const wm = await webmentions()
			return await collection
				.getFilteredByTag("feature")
				.filter(collectionFilters.isPublished)
				.filter(collectionFilters.notReply)
				.filter((item) => queryFilters.getWebmentions(wm, item.url).length)
				.sort((a, b) => {
					const alpha = queryFilters.getWebmentions(wm, a.url)
					let alphaPopularity = 0
					for (let webmention of alpha) {
						alphaPopularity = (alphaPopularity + dateFilters.epoch(webmention["wm-received"])) / 2
					}
					alphaPopularity = site.weights.time * dateFilters.epoch(a.date) + (1 - site.weights.time) * alphaPopularity

					const beta = queryFilters.getWebmentions(wm, b.url)
					let betaPopularity = 0
					for (let webmention of beta) {
						betaPopularity = (betaPopularity + dateFilters.epoch(webmention["wm-received"])) / 2
					}
					betaPopularity = site.weights.time * dateFilters.epoch(b.date) + (1 - site.weights.time) * betaPopularity

					return betaPopularity - alphaPopularity
				})
				.slice(0, site.limits.feed)
		})()
	},
	popular: async (collection) => {
		return (async () => {
			const wm = await webmentions()
			return await collection
				.getFilteredByTag("feature")
				.filter(collectionFilters.isPublished)
				.filter(collectionFilters.notReply)
				.filter((item) => queryFilters.getWebmentions(wm, item.url).length)
				.sort(collectionFilters.dateFilter)
				.sort((a, b) => {
					const alpha = queryFilters.getWebmentions(wm, a.url)
					const beta = queryFilters.getWebmentions(wm, b.url)
					return beta.length - alpha.length
				})
				.slice(0, site.limits.feed)
		})()
	},
	throwbackPosts: (collection) => {
		return collection
			.getFilteredByTag("throwback")
			.filter(collectionFilters.isPublished)
			.filter((item) => {
				if (item.data.rsvp || !item.data.in_reply_to) {
					return true
				}
				return false
			})
			.filter((item) => {
				if (item.date && dateFilters.friendlyDate(item.date, "dd LLLL") == dateFilters.friendlyDate(global.now, "dd LLLL") && dateFilters.friendlyDate(item.date, "yyyy") != dateFilters.friendlyDate(global.now, "yyyy")) {
					return true
				} else if (item.data.rsvp && dateFilters.friendlyDate(item.data.rsvp.date, "dd LLLL") == dateFilters.friendlyDate(global.now, "dd LLLL") && dateFilters.friendlyDate(item.data.rsvp.date, "yyyy") != dateFilters.friendlyDate(global.now, "yyyy")) {
					return true
				} else if (item.data.rsvp && dateFilters.friendlyDate(item.data.rsvp.finish, "dd LLLL") == dateFilters.friendlyDate(global.now, "dd LLLL") && dateFilters.friendlyDate(item.data.rsvp.finish, "yyyy") != dateFilters.friendlyDate(global.now, "yyyy")) {
					return true
				}
				return false
			})
			.sort(collectionFilters.dateFilter)
	},
	checkins: (collection) => {
		return collection
			.getFilteredByTag("post")
			.filter(collectionFilters.isPublished)
			.filter((item) => {
				return "checkin" in item.data
			})
			.sort(collectionFilters.dateFilter)
	},
	replies: (collection) => {
		return collection
			.getFilteredByTag("note")
			.filter(collectionFilters.isPublished)
			.filter((item) => {
				return "in_reply_to" in item.data
			})
			.filter((item) => {
				if ("rsvp" in item.data) {
					return false
				}
				return true
			})
			.sort(collectionFilters.dateFilter)
	},
	notesWithoutReplies: (collection) => {
		return collection
			.getFilteredByTag("note")
			.filter(collectionFilters.isPublished)
			.filter((item) => {
				if ("in_reply_to" in item.data) {
					return false
				}
				return true
			})
			.sort(collectionFilters.dateFilter)
	},
	rsvps: (collection) => {
		return collection
			.getFilteredByTag("post")
			.filter(collectionFilters.isPublished)
			.filter((item) => {
				return "rsvp" in item.data
			})
			.sort(collectionFilters.dateFilter)
	},
	todayRSVPs: (collection) => {
		return collection
			.getFilteredByTag("post")
			.filter(collectionFilters.isPublished)
			.filter((item) => {
				if (item.data.rsvp && dateFilters.friendlyDate(item.data.rsvp.date) == dateFilters.friendlyDate(global.now)) {
					return true
				}
			})
	},
	upcomingRSVPs: (collection) => {
		return collection
			.getFilteredByTag("post")
			.filter(collectionFilters.isPublished)
			.filter((item) => {
				if (item.data.rsvp && dateFilters.epoch(item.data.rsvp.date) > global.now && dateFilters.epoch(item.data.rsvp.date) - dateFilters.epoch(global.now) < 604800000 && dateFilters.friendlyDate(item.data.rsvp.date) != dateFilters.friendlyDate(global.now)) {
					return true
				}
			})
	},
}
