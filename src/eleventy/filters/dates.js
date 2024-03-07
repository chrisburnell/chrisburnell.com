import { DateTime } from "luxon"
import emojis from "../data/emojis.js"
import { locale } from "../data/site.js"

const ordinalPlurals = new Intl.PluralRules(locale, {
	type: "ordinal",
})

const ordinalSuffixes = {
	one: "st",
	two: "nd",
	few: "rd",
	other: "th",
}

let userLocale = "en"
if (typeof document !== "undefined") {
	userLocale = document.querySelector("html").getAttribute("lang") || navigator.languages ? navigator.languages[0] : userLocale
}

const rtf = new Intl.RelativeTimeFormat(userLocale, {
	localeMatcher: "best fit",
	numeric: "always",
	style: "long",
})

const rtfDivisions = [
	{
		amount: 60,
		name: "second",
	},
	{
		amount: 60,
		name: "minute",
	},
	{
		amount: 24,
		name: "hour",
	},
	{
		amount: 7,
		name: "day",
	},
	{
		amount: 4.34524,
		name: "week",
	},
	{
		amount: 12,
		name: "month",
	},
	{
		amount: Number.POSITIVE_INFINITY,
		name: "year",
	},
]

const emojiFuture = `<span class=" [ emoji ] " aria-hidden="true">${emojis.future}</span>`
const emojiGoing = `<span class=" [ emoji ] " aria-hidden="true">${emojis.going}</span>`
const emojiHopefully = `<span class=" [ emoji ] " aria-hidden="true">${emojis.hopefully}</span>`
const emojiNotGoing = `<span class=" [ emoji ] " aria-hidden="true">${emojis.not_going}</span>`

/**
 * @param {string} dateString
 * @param {string} format
 * @return {string}
 */
const formatDatetime = (dateString, format) => {
	return DateTime.fromISO(dateString, { setZone: true }).toFormat(format)
}

/**
 * @param {number} number
 * @returns {string}
 */
export const ordinal = (number) => {
	return `${number}<sup>${ordinalSuffixes[ordinalPlurals.select(number)]}</sup>`
}

/**
 * @param {string} dateString
 * @param {string} format
 * @return {string}
 */
export const friendlyDate = (dateString, format = "LLLL d, yyyy") => {
	return formatDatetime(dateString, format)
}

/**
 * @param {string} dateString
 * @return {string}
 */
export const friendlyDateLong = (dateString) => {
	const day = formatDatetime(dateString, "d")
	return formatDatetime(dateString, `cccc, LLLL '${ordinal(day)}', yyyy`)
}

/**
 * @param {DateTime} value
 * @param {boolean} [showTimezone]
 * @returns {string}
 */
export const friendlyTime = (value, showTimezone = true) => {
	const timeFormat = showTimezone ? "HH:mm ZZZZ" : "HH:mm"
	return formatDatetime(value, timeFormat).replace("GMT+1", "BST")
}

/**
 * @param {DateTime} value
 * @returns {string}
 */
export const friendlyTimezone = (value) => {
	return DateTime.fromISO(value, { setZone: true }).zoneName
}

/**
 * @param {string} dateString
 * @param {boolean} showTimezone
 * @returns {string}
 */
export const rfc3339Date = (dateString, showTimezone = true) => {
	const format = "yyyy-MM-dd'T'HH:mm:ss" + (showTimezone && "ZZ")
	return formatDatetime(dateString, format)
}

/**
 * @param {DateTime} value
 * @returns {string}
 */
export const w3cDate = (value) => {
	return DateTime.fromISO(value, { setZone: true }).toFormat("yyyy-MM-dd'T'HH:mm:ssZZ")
}

/**
 * @param {string} dateString
 * @returns {string}
 */
export const epoch = (dateString) => {
	return new Date(dateString).getTime()
}

/**
 * @param {object} a
 * @param {object} b
 * @returns {number}
 */
export const dateSort = (a, b) => {
	return new Date(b.data.date) - new Date(a.data.date)
}

/**
 * @param {object[]} array
 * @returns {object[]}
 */
export const sortByDate = (array) => {
	return array.sort(dateSort)
}

/**
 * @param {Datetime} datetime
 * @returns {string}
 */
export const getRelativeTime = (datetime, division) => {
	if (typeof datetime === "string") {
		datetime = new Date(datetime)
	}

	let difference = (datetime.getTime() - Date.now()) / 1000

	if (division) {
		return rtf.format(Math.round(difference), division)
	}

	for (const division of rtfDivisions) {
		if (Math.floor(Math.abs(difference)) < division.amount) {
			return rtf.format(Math.round(difference), division.name)
		}
		difference /= division.amount
	}
}

/**
 * @param {string} start
 * @param {string} end
 * @param {string} value
 * @returns {string}
 */
export const getRSVPValueString = (start, end, value) => {
	const now = Date.now()

	if (value === "yes") {
		if (epoch(start) > now) {
			return `${emojiFuture} <small>attending</small>`
		}
		if (epoch(start) <= now && now <= epoch(end)) {
			return `${emojiGoing} <small>currently attending</small>`
		}
		return `${emojiGoing} <small>attended</small>`
	}
	if (value === "maybe" || value === "interested") {
		if (epoch(start) > now) {
			return `${emojiHopefully} <small>hoping to attend</small>`
		}
		return `${emojiHopefully} <small>was hoping to attend</small>`
	}
	if (epoch(start) > now) {
		return `${emojiNotGoing} <small>unable to attend</small>`
	}
	return `${emojiNotGoing} <small>was unable to attend</small>`
}

/**
 * @param {string} start
 * @param {string} end
 * @param {string} value
 * @returns {string}
 */
export const getRSVPValueHTML = (start, end, value) => {
	const now = Date.now()

	if (value === "yes") {
		if (epoch(start) > now) {
			return `<span data-start="${rfc3339Date(start)}" data-end="${rfc3339Date(end)}" data-value="${value}" data-relative-rsvp-value>${getRSVPValueString(start, end, value)}</span>`
		}
		if (epoch(start) <= now && now <= epoch(end)) {
			return `<span data-start="${rfc3339Date(start)}" data-end="${rfc3339Date(end)}" data-value="${value}" data-relative-rsvp-value>${getRSVPValueString(start, end, value)}</span>`
		}
		return `<span data-start="${rfc3339Date(start)}" data-end="${rfc3339Date(end)}" data-value="${value}" data-relative-rsvp-value>${getRSVPValueString(start, end, value)}</span>`
	}
	if (value === "maybe" || value === "interested") {
		if (epoch(start) > now) {
			return `<span data-start="${rfc3339Date(start)}" data-end="${rfc3339Date(end)}" data-value="${value}" data-relative-rsvp-value>${getRSVPValueString(start, end, value)}</span>`
		}
		return `<span data-start="${rfc3339Date(start)}" data-end="${rfc3339Date(end)}" data-value="${value}" data-relative-rsvp-value>${getRSVPValueString(start, end, value)}</span>`
	}
	if (epoch(start) > now) {
		return `<span data-start="${rfc3339Date(start)}" data-end="${rfc3339Date(end)}" data-value="${value}" data-relative-rsvp-value>${getRSVPValueString(start, end, value)}</span>`
	}
	return `<span data-start="${rfc3339Date(start)}" data-end="${rfc3339Date(end)}" data-value="${value}" data-relative-rsvp-value>${getRSVPValueString(start, end, value)}</span>`
}

/**
 * @param {string} start
 * @param {string} end
 * @param {string} value
 * @returns {string}
 */
export const getRSVPDateString = (end) => {
	if (Date.now() <= epoch(end)) {
		return "taking place"
	}
	return "took place"
}

export default {
	ordinal,
	friendlyDate,
	friendlyDateLong,
	friendlyTime,
	friendlyTimezone,
	rfc3339Date,
	w3cDate,
	epoch,
	dateSort,
	sortByDate,
	getRelativeTime,
	getRSVPValueString,
	getRSVPValueHTML,
	getRSVPDateString,
}
