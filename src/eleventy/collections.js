const dateFilters = require("#filters/dates")
const collectionFilters = require("#filters/collections")

const global = require("#datajs/global")
const site = require("#data/site")

const Webmentions = require("@chrisburnell/eleventy-cache-webmentions")(null, { domain: site.url })

const absoluteURL = (url, base) => {
	if (!base) {
		base = site.url
	}
	try {
		return new URL(url, base).toString()
	} catch (e) {
		console.log(`Trying to convert ${url} to be an absolute url with base ${base} and failed.`)
		return url
	}
}

module.exports = {
	page: (collection) => {
		return collection.getFilteredByTag("page").filter(collectionFilters.isPublished)
	},
	projects: (collection) => {
		return collection
			.getFilteredByTag("project")
			.filter(collectionFilters.isPublished)
			.sort((a, b) => new Date(b.data.date) - new Date(a.data.date))
	},
	posts: (collection) => {
		return collection.getFilteredByTag("post").filter(collectionFilters.isPublished).sort(collectionFilters.dateFilter)
	},
	writingPosts: (collection) => {
		return collection.getFilteredByTag("writing").filter(collectionFilters.isPublished).sort(collectionFilters.dateFilter)
	},
	featurePosts: (collection) => {
		return collection.getFilteredByTag("feature").filter(collectionFilters.isPublished).filter(collectionFilters.notReply).filter(collectionFilters.notSilly).sort(collectionFilters.dateFilter)
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
	hot: async (collection) => {
		const webmentionsByUrl = await Webmentions()
		return await collection
			.getFilteredByTag("feature")
			.filter(collectionFilters.isPublished)
			.filter(collectionFilters.notReply)
			.filter((item) => {
				// unfortunately necessary in order to match the key
				const url = absoluteURL(item.url)

				if (!url) {
					return false
				}

				return webmentionsByUrl[url]
			})
			.sort((a, b) => {
				// unfortunately necessary in order to match the key
				const aUrl = absoluteURL(a.url)
				const bUrl = absoluteURL(b.url)
				const aWebmentions = webmentionsByUrl[aUrl]
				const bWebmentions = webmentionsByUrl[bUrl]

				let aPopularity = 0
				for (let webmention of aWebmentions) {
					aPopularity = (aPopularity + dateFilters.epoch(webmention.published || webmention["wm-received"])) / 2
				}
				aPopularity = site.weights.time * dateFilters.epoch(a.date) + (1 - site.weights.time) * aPopularity

				let bPopularity = 0
				for (let webmention of bWebmentions) {
					bPopularity = (bPopularity + dateFilters.epoch(webmention.published || webmention["wm-received"])) / 2
				}
				bPopularity = site.weights.time * dateFilters.epoch(b.date) + (1 - site.weights.time) * bPopularity

				return bPopularity - aPopularity
			})
			.slice(0, site.limits.feed)
	},
	popular: async (collection) => {
		const webmentionsByUrl = await Webmentions()
		return await collection
			.getFilteredByTag("feature")
			.filter(collectionFilters.isPublished)
			.filter(collectionFilters.notReply)
			.filter((item) => {
				// unfortunately necessary in order to match the key
				const url = absoluteURL(item.url)

				if (!url) {
					return false
				}

				return webmentionsByUrl[url]
			})
			.sort(collectionFilters.dateFilter)
			.sort((a, b) => {
				// unfortunately necessary in order to match the key
				const aUrl = absoluteURL(a.url)
				const bUrl = absoluteURL(b.url)
				const aWebmentions = webmentionsByUrl[aUrl]
				const bWebmentions = webmentionsByUrl[bUrl]

				return bWebmentions.length - aWebmentions.length
			})
			.slice(0, site.limits.feed)
	},
}
