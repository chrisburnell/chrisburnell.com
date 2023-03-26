const global = require("#datajs/global")
const site = require("#data/site")

const { epoch, friendlyDate } = require("#filters/dates")
const { dateFilter, isPublished, notReply } = require("#filters/collections")

const day = 1000 * 60 * 60 * 24

module.exports = {
	page: (collection) => {
		return collection.getFilteredByTag("page").filter(isPublished)
	},
	projects: (collection) => {
		return collection
			.getFilteredByTag("project")
			.filter(isPublished)
			.sort((a, b) => new Date(b.data.date) - new Date(a.data.date))
	},
	posts: (collection) => {
		return collection.getFilteredByTag("post").filter(isPublished).sort(dateFilter)
	},
	drafts: (collection) => {
		return collection
			.getFilteredByTag("post")
			.filter((item) => {
				if ("data" in item) {
					if ("draft" in item.data && item.data.draft === true) {
						return !!item.url
					}
					if ("published" in item.data && item.data.published === false) {
						return !!item.url
					}
				}
				return false
			})
			.sort(dateFilter)
	},
	writingPosts: (collection) => {
		return collection.getFilteredByTag("writing").filter(isPublished).sort(dateFilter)
	},
	featurePosts: (collection) => {
		return collection.getFilteredByTag("feature").filter(isPublished).filter(notReply).sort(dateFilter)
	},
	throwbackPosts: (collection) => {
		return collection
			.getFilteredByTag("throwback")
			.filter(isPublished)
			.filter((item) => {
				if ((item.data.rsvp && item.data.rsvp?.value == "yes") || !item.data.in_reply_to) {
					return true
				}
				return false
			})
			.filter((item) => {
				if (!item.data.rsvp && item.date && friendlyDate(item.date, "dd LLLL") == friendlyDate(global.now, "dd LLLL") && friendlyDate(item.date, "yyyy") != friendlyDate(global.now, "yyyy")) {
					return true
				} else if (item.data.rsvp && friendlyDate(item.data.rsvp.date, "dd LLLL") == friendlyDate(global.now, "dd LLLL") && friendlyDate(item.data.rsvp.date, "yyyy") != friendlyDate(global.now, "yyyy")) {
					return true
				} else if (item.data.rsvp && friendlyDate(item.data.rsvp.finish, "dd LLLL") == friendlyDate(global.now, "dd LLLL") && friendlyDate(item.data.rsvp.finish, "yyyy") != friendlyDate(global.now, "yyyy")) {
					return true
				}
				return false
			})
			.sort(dateFilter)
	},
	checkins: (collection) => {
		return collection
			.getFilteredByTag("post")
			.filter(isPublished)
			.filter((item) => {
				return "checkin" in item.data
			})
			.sort(dateFilter)
	},
	replies: (collection) => {
		return collection
			.getFilteredByTag("note")
			.filter(isPublished)
			.filter((item) => {
				return "in_reply_to" in item.data
			})
			.filter((item) => {
				if ("rsvp" in item.data) {
					return false
				}
				return true
			})
			.sort(dateFilter)
	},
	notesWithoutReplies: (collection) => {
		return collection
			.getFilteredByTag("note")
			.filter(isPublished)
			.filter((item) => {
				if ("in_reply_to" in item.data) {
					return false
				}
				return true
			})
			.sort(dateFilter)
	},
	rsvps: (collection) => {
		return collection
			.getFilteredByTag("post")
			.filter(isPublished)
			.filter((item) => {
				return "rsvp" in item.data
			})
			.sort(dateFilter)
	},
	todayRSVPs: (collection) => {
		return collection
			.getFilteredByTag("post")
			.filter(isPublished)
			.filter((item) => {
				if (item.data.rsvp && friendlyDate(item.data.rsvp.date) == friendlyDate(global.now)) {
					return true
				}
			})
	},
	upcomingRSVPs: (collection) => {
		const durationDay = 24 * 60 * 60 * 1000
		return collection
			.getFilteredByTag("post")
			.filter(isPublished)
			.filter((item) => {
				const upcomingDaysLead = (item.data.rsvp?.upcoming_days_lead || site.upcomingDaysLead) * durationDay
				if (item.data.rsvp && (item.data.rsvp.show_upcoming_always || (epoch(item.data.rsvp.date) > global.now && epoch(item.data.rsvp.date) - epoch(global.now) < upcomingDaysLead && friendlyDate(item.data.rsvp.date) != friendlyDate(global.now)))) {
					return true
				}
			})
	},
	popular: (collection) => {
		return collection
			.getFilteredByTag("feature")
			.filter(isPublished)
			.filter(notReply)
			.filter((item) => {
				return item.data.webmentions.length + item.data.externalLikes >= site.limits.minimumResponsesRequired
			})
			.sort(dateFilter)
			.sort((a, b) => {
				return b.data.webmentions.length + b.data.externalLikes - (a.data.webmentions.length + a.data.externalLikes)
			})
			.slice(0, site.limits.feed)
	},
	hot: (collection) => {
		// "Hot" sorting is done by determining the average delta of
		// time between webmentions and now.
		return collection
			.getFilteredByTag("feature")
			.filter(isPublished)
			.filter(notReply)
			.filter((item) => {
				return item.data.webmentions.length + item.data.externalLikes >= site.limits.minimumResponsesRequired
			})
			.map((item) => {
				item.hotness = item.data.webmentions.reduce((accumulator, webmention) => {
					const delta = global.now / day - epoch(webmention.data.published || webmention.verified_date) / day
					return accumulator + 1 / (1 + Math.log(Math.ceil(delta)))
				}, 0)

				return item
			})
			.sort(dateFilter)
			.sort((a, b) => {
				return b.hotness - a.hotness
			})
			.slice(0, site.limits.feed)
	},
}
