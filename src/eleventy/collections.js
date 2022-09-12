const dateFilters = require("#filters/dates")
const collectionFilters = require("#filters/collections")

const global = require("#datajs/global")
const site = require("#data/site")

const day = 1000 * 60 * 60 * 24

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
		return collection.getFilteredByTag("feature").filter(collectionFilters.isPublished).filter(collectionFilters.notReply).sort(collectionFilters.dateFilter)
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
		const durationDay = 24 * 60 * 60 * 1000
		return collection
			.getFilteredByTag("post")
			.filter(collectionFilters.isPublished)
			.filter((item) => {
				const upcomingDaysLead = (item.data.rsvp?.upcoming_days_lead || site.upcomingDaysLead) * durationDay
				if (item.data.rsvp && (item.data.rsvp.show_upcoming_always || (dateFilters.epoch(item.data.rsvp.date) > global.now && dateFilters.epoch(item.data.rsvp.date) - dateFilters.epoch(global.now) < upcomingDaysLead && dateFilters.friendlyDate(item.data.rsvp.date) != dateFilters.friendlyDate(global.now)))) {
					return true
				}
			})
	},
	popular: (collection) => {
		return collection
			.getFilteredByTag("feature")
			.filter(collectionFilters.isPublished)
			.filter(collectionFilters.notReply)
			.filter((item) => {
				return item.data.webmentions.length
			})
			.sort(collectionFilters.dateFilter)
			.sort((a, b) => {
				return b.data.webmentions.length - a.data.webmentions.length
			})
			.slice(0, site.limits.feed)
	},
	popularWeight: (collection) => {
		// "popularWeight" sorting is done by determining the average delta of
		// time between webmentions and sorting by that average.
		// This value is also weighted against the number of
		// webmentions, where having more webmentions is weighted higher.
		return collection
			.getFilteredByTag("feature")
			.filter(collectionFilters.isPublished)
			.filter(collectionFilters.notReply)
			.filter((item) => {
				return item.data.webmentions.length >= site.limits.minWebmentions
			})
			.map((item) => {
				// calculate delta in halfdays between the published date
				// of each Webmention in order to build a mean from the sum
				const deltas = item.data.webmentions.reduce(
					(accumulator, webmention, index) => {
						const delta = (dateFilters.epoch(webmention.data.published || webmention.verified_date) - dateFilters.epoch(accumulator.prev.data.published || accumulator.prev.verified_date)) / day
						index && accumulator.array.push(delta)
						accumulator.prev = webmention
						return accumulator
					},
					{ array: [], prev: item.data.webmentions[0] }
				)
				// use the natural log against the deltas
				// as deltas increase, hotness goes down
				const hotnessDeltas = deltas.array.map((delta) => {
					return 1 / (1 + Math.log(Math.ceil(delta)))
				})
				const hotnessDeltasMean = hotnessDeltas.reduce((a, b) => a + b) / hotnessDeltas.length

				item.hotness = site.weights.deltas * hotnessDeltasMean * (site.weights.count * item.data.webmentions.length)

				return item
			})
			.sort(collectionFilters.dateFilter)
			.sort((a, b) => {
				return b.hotness - a.hotness
			})
			.slice(0, site.limits.feed)
	},
	hot: (collection) => {
		// "Hot" sorting is done by determining the average delta of
		// time between webmentions and now.
		return collection
			.getFilteredByTag("feature")
			.filter(collectionFilters.isPublished)
			.filter(collectionFilters.notReply)
			.filter((item) => {
				return item.data.webmentions.length >= site.limits.minWebmentions
			})
			.map((item) => {
				item.hotness = item.data.webmentions.reduce((accumulator, webmention) => {
					const delta = global.now / day - dateFilters.epoch(webmention.data.published || webmention.verified_date) / day
					return accumulator + 1 / (1 + Math.log(Math.ceil(delta)))
				}, 0)

				return item
			})
			.sort(collectionFilters.dateFilter)
			.sort((a, b) => {
				return b.hotness - a.hotness
			})
			.slice(0, site.limits.feed)
	},
}
