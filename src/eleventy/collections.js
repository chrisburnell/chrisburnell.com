import dotenv from "dotenv"
dotenv.config()

import { getPublished } from "@chrisburnell/eleventy-cache-webmentions"
import { now } from "./data/global.js"
import { limits, upcomingDaysLead } from "./data/site.js"
import { isPublished, notReply } from "./filters/collections.js"
import { dateSort, epoch } from "./filters/dates.js"
import { exponentialMovingAverage } from "./filters/utils.js"

const durationDay = 24 * 60 * 60 * 1000

let filteredCollectionsMemoization = {}

/**
 * @param {object[]} collection
 * @param {string} tag
 * @param {boolean} limit
 * @returns
 */
const filterCollection = (collection, tag, limit = false) => {
	if (tag in filteredCollectionsMemoization) {
		// This collection already exists in memoization
		return filteredCollectionsMemoization[tag]
	}

	let filteredCollection = collection.getFilteredByTag(tag).filter(isPublished).sort(dateSort)

	if (limit && process.env.ELEVENTY_RUN_MODE !== "build") {
		// Keep only a few items per collection for performance
		filteredCollection = filteredCollection.slice(0, limits.feed)
	}

	// Keep a copy of this collection in memoization for later reuse
	filteredCollectionsMemoization[tag] = filteredCollection

	return filteredCollection
}

export default {
	pages: (collection) => {
		return filterCollection(collection, "page")
	},
	posts: (collection) => {
		return filterCollection(collection, "post")
	},
	projects: (collection) => {
		return filterCollection(collection, "project")
	},
	drafts: (collection) => {
		if ("drafts" in filteredCollectionsMemoization) {
			return filteredCollectionsMemoization["drafts"]
		}

		let filteredCollection = collection
			.getFilteredByTag("post")
			.filter((item) => item.data.draft === true || item.data.published === false)
			.sort(dateSort)

		filteredCollectionsMemoization["drafts"] = filteredCollection

		return filteredCollection
	},
	writings: (collection) => {
		return filterCollection(collection, "writing")
	},
	features: (collection) => {
		if ("features" in filteredCollectionsMemoization) {
			return filteredCollectionsMemoization["features"]
		}

		let filteredCollection = collection.getFilteredByTag("feature").filter(isPublished).filter(notReply).sort(dateSort)

		filteredCollectionsMemoization["features"] = filteredCollection

		return filteredCollection
	},
	attendances: (collection) => {
		if ("attendances" in filteredCollectionsMemoization) {
			return filteredCollectionsMemoization["attendances"]
		}

		const conferences = collection.getFilteredByTag("conference").filter(isPublished)
		const meetups = collection.getFilteredByTag("meetup").filter(isPublished)
		let filteredCollection = [...conferences, ...meetups]
			.filter((item) => {
				return "rsvp" in item.data && item.data.rsvp?.value === "yes"
			})
			.sort(dateSort)

		filteredCollectionsMemoization["attendances"] = filteredCollection

		return filteredCollection
	},
	checkins: (collection) => {
		if ("checkins" in filteredCollectionsMemoization) {
			return filteredCollectionsMemoization["checkins"]
		}

		let filteredCollection = collection
			.getFilteredByTag("post")
			.filter(isPublished)
			.filter((item) => {
				return "checkin" in item.data
			})
			.sort(dateSort)

		filteredCollectionsMemoization["checkins"] = filteredCollection

		return filteredCollection
	},
	replies: (collection) => {
		if ("replies" in filteredCollectionsMemoization) {
			return filteredCollectionsMemoization["replies"]
		}

		let filteredCollection = collection
			.getFilteredByTag("note")
			.filter(isPublished)
			.filter((item) => "in_reply_to" in item.data)
			.filter((item) => !("rsvp" in item.data))
			.sort(dateSort)

		filteredCollectionsMemoization["replies"] = filteredCollection

		return filteredCollection
	},
	notesWithoutReplies: (collection) => {
		if ("notesWithoutReplies" in filteredCollectionsMemoization) {
			return filteredCollectionsMemoization["notesWithoutReplies"]
		}

		let filteredCollection = collection.getFilteredByTag("note").filter(isPublished).filter(notReply).sort(dateSort)

		filteredCollectionsMemoization["notesWithoutReplies"] = filteredCollection

		return filteredCollection
	},
	rsvps: (collection) => {
		if ("rsvps" in filteredCollectionsMemoization) {
			return filteredCollectionsMemoization["rsvps"]
		}

		let filteredCollection = collection
			.getFilteredByTag("post")
			.filter(isPublished)
			.filter((item) => "rsvp" in item.data)
			.sort(dateSort)
			.sort((a, b) => {
				if (a.data.rsvp.end && b.data.rsvp.end) {
					return new Date(b.data.rsvp.end) - new Date(a.data.rsvp.end)
				}
				return 0
			})

		filteredCollectionsMemoization["rsvps"] = filteredCollection

		return filteredCollection
	},
	rsvpsToday: (collection) => {
		if ("rsvpsToday" in filteredCollectionsMemoization) {
			return filteredCollectionsMemoization["rsvpsToday"]
		}

		let filteredCollection = collection
			.getFilteredByTag("post")
			.filter(isPublished)
			.filter((item) => item.data.rsvp)
			.filter((item) => {
				// remove RSVPs that have passed the end datetime
				if (epoch(item.data.rsvp.end) < epoch(now)) {
					return false
				}
			})
			.filter((item) => {
				const startLead = epoch(item.data.rsvp.date) - durationDay
				const end = epoch(item.data.rsvp.end)
				return startLead < epoch(now) && epoch(now) < end
			})
			.sort(dateSort)
			.sort((a, b) => {
				return new Date(a.data.rsvp.end) - new Date(b.data.rsvp.end)
			})

		filteredCollectionsMemoization["rsvpsToday"] = filteredCollection

		return filteredCollection
	},
	rsvpsUpcoming: (collection) => {
		if ("rsvpsUpcoming" in filteredCollectionsMemoization) {
			return filteredCollectionsMemoization["rsvpsUpcoming"]
		}

		let filteredCollection = collection
			.getFilteredByTag("post")
			.filter(isPublished)
			.filter((item) => item.data.rsvp)
			.filter((item) => {
				// remove RSVPs that have passed the end datetime
				if (epoch(item.data.rsvp.end) < epoch(now)) {
					return false
				}
			})
			.filter((item) => {
				const startLead = epoch(item.data.rsvp.date) - durationDay
				const end = epoch(item.data.rsvp.end)
				// remove rsvpsToday
				if (startLead < epoch(now) && epoch(now) < end) {
					return false
				}
				const lead = (item.data.rsvp?.upcoming_days_lead || upcomingDaysLead) * durationDay
				return item.data.rsvp.show_upcoming_always || (epoch(item.data.rsvp.date) > epoch(now) && epoch(item.data.rsvp.date) - epoch(now) < lead)
			})
			.sort(dateSort)
			.sort((a, b) => {
				return new Date(b.data.rsvp.end) - new Date(a.data.rsvp.end)
			})

		filteredCollectionsMemoization["rsvpsUpcoming"] = filteredCollection

		return filteredCollection
	},
	popular: (collection) => {
		// "Popular" sorting is done by totalling webmentions, external likes,
		// and stargazers as a sorting method.

		if ("popular" in filteredCollectionsMemoization) {
			return filteredCollectionsMemoization["popular"]
		}

		const features = collection.getFilteredByTag("feature")
		const projects = collection.getFilteredByTag("project")
		let filteredCollection = [...features, ...projects]
			.filter(isPublished)
			.filter(notReply)
			.filter((item) => {
				const interactions = item.data.webmentions.length + (item.data.stargazers || 0)
				return interactions >= limits.minimumResponsesRequired
			})
			.sort(dateSort)
			.sort((a, b) => {
				const interactionsA = a.data.webmentions.length + (a.data.stargazers || 0)
				const interactionsB = b.data.webmentions.length + (b.data.stargazers || 0)
				return interactionsB - interactionsA
			})
			.slice(0, limits.feed)

		filteredCollectionsMemoization["popular"] = filteredCollection

		return filteredCollection
	},
	hot: (collection) => {
		// "Hot" sorting is done by determining the exponential moving average
		// as a function of Webmentions across time

		if ("hot" in filteredCollectionsMemoization) {
			return filteredCollectionsMemoization["hot"]
		}

		const features = collection.getFilteredByTag("feature")
		const projects = collection.getFilteredByTag("project")
		let filteredCollection = [...features, ...projects]
			.filter(isPublished)
			.filter(notReply)
			.filter((item) => {
				return item.data.webmentions.length >= limits.minimumResponsesRequired
			})
			.sort(dateSort)
			.map((item) => {
				item.hotness = item.data.webmentions.reduce((accumulator, webmention) => {
					return exponentialMovingAverage(epoch(getPublished(webmention)) / durationDay, accumulator)
				}, 0)

				return item
			})
			.sort((a, b) => {
				return b.hotness - a.hotness
			})
			.slice(0, limits.feed)

		filteredCollectionsMemoization["hot"] = filteredCollection

		return filteredCollection
	},
}
