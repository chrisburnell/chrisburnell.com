const { now } = require("#datajs/global")
const { limits, upcomingDaysLead } = require("#data/site")

const { dateFilter, isPublished, notReply } = require("#filters/collections")
const { epoch, friendlyDate } = require("#filters/dates")
const { exponentialMovingAverage } = require("#filters/utils")

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
			.getFilteredByTag("blog")
			.filter(isPublished)
			.filter((item) => {
				if ((item.data.rsvp && item.data.rsvp?.value == "yes") || !item.data.in_reply_to) {
					return true
				}
				return false
			})
			.filter((item) => {
				if (!item.data.rsvp && item.date && friendlyDate(item.date, "dd LLLL") == friendlyDate(now, "dd LLLL") && friendlyDate(item.date, "yyyy") != friendlyDate(now, "yyyy")) {
					return true
				} else if (item.data.rsvp && friendlyDate(item.data.rsvp.date, "dd LLLL") == friendlyDate(now, "dd LLLL") && friendlyDate(item.data.rsvp.date, "yyyy") != friendlyDate(now, "yyyy")) {
					return true
				} else if (item.data.rsvp && friendlyDate(item.data.rsvp.end, "dd LLLL") == friendlyDate(now, "dd LLLL") && friendlyDate(item.data.rsvp.end, "yyyy") != friendlyDate(now, "yyyy")) {
					return true
				}
				return false
			})
			.sort(dateFilter)
	},
	attendances: (collection) => {
		const conferences = collection.getFilteredByTag("conference")
		const meetups = collection.getFilteredByTag("meetup")
		return [...conferences, ...meetups]
			.filter(isPublished)
			.filter((item) => {
				return "rsvp" in item.data && item.data.rsvp?.value === "yes"
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
				if (item.data.rsvp && friendlyDate(item.data.rsvp.date) == friendlyDate(now)) {
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
				const lead = (item.data.rsvp?.upcoming_days_lead || upcomingDaysLead) * durationDay
				if (item.data.rsvp && (item.data.rsvp.show_upcoming_always || (epoch(item.data.rsvp.date) > now && epoch(item.data.rsvp.date) - epoch(now) < lead && friendlyDate(item.data.rsvp.date) != friendlyDate(now)))) {
					return true
				}
			})
	},
	popular: (collection) => {
		// "Popular" sorting is done by totalling webmentions, external likes,
		// and stargazers as a sorting method.
		return [...collection.getFilteredByTag("feature"), ...collection.getFilteredByTag("project")]
			.filter(isPublished)
			.filter(notReply)
			.filter((item) => {
				const interactions = item.data.webmentions.length + (item.data.stargazers || 0)
				return interactions >= limits.minimumResponsesRequired
			})
			.sort(dateFilter)
			.sort((a, b) => {
				const interactionsA = a.data.webmentions.length + (a.data.stargazers || 0)
				const interactionsB = b.data.webmentions.length + (b.data.stargazers || 0)
				return interactionsB - interactionsA
			})
			.slice(0, limits.feed)
	},
	hot: (collection) => {
		// "Hot" sorting is done by determining the exponential moving average
		// as a function of Webmentions across time
		const deltaModifier = 1000 * 60 * 60 * 24 // 1 day
		return [...collection.getFilteredByTag("feature"), ...collection.getFilteredByTag("project")]
			.filter(isPublished)
			.filter(notReply)
			.filter((item) => {
				return item.data.webmentions.length >= limits.minimumResponsesRequired
			})
			.sort(dateFilter)
			.map((item) => {
				item.hotness = item.data.webmentions.reduce((accumulator, webmention) => {
					return exponentialMovingAverage(epoch(webmention.published || webmention["wm-received"]) / deltaModifier, accumulator)
				}, 0)

				return item
			})
			.sort((a, b) => {
				return b.hotness - a.hotness
			})
			.slice(0, limits.feed)
	},
}
