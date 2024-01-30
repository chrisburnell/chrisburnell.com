import { DateTime } from "luxon"

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
const formatDatetime = (dateString, format) => {
	return DateTime.fromISO(dateString, { setZone: true }).toFormat(format)
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
 * @param {satetime} value
 * @param {boolean} [showTimezone]
 * @returns {string}
 */
export const friendlyTime = (value, showTimezone = true) => {
	const timeFormat = showTimezone ? "HH:mm ZZZZ" : "HH:mm"
	return formatDatetime(value, timeFormat).replace("GMT+1", "BST")
}

/**
 * @param {datetime} value
 * @returns {string}
 */
export const friendlyTimezone = (value) => {
	return DateTime.fromISO(value, { setZone: true }).zoneName
}

/**
 * @param {datetime} value
 * @returns {string}
 */
export const httpDate = (value) => {
	return DateTime.fromISO(value, { setZone: true }).toHTTP()
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
 * @param {datetime} value
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
 * Calculate number of days between now and a given date.
 * @param {Datetime} date
 * @returns {String}
 */
export const daysUntil = (date) => {
	const future = new Date(date)
	const timeDifference = future - new Date()
	return Math.round(timeDifference / (1000 * 60 * 60 * 24))
}

/**
 * @param {object} a
 * @param {object} b
 * @returns {number}
 */
export const dateSort = (a, b) => {
	return new Date(b.data.date) - new Date(a.data.date)
}

export const dateSortFilter = (array) => {
	return array.sort(dateSort)
}

export default {
	ordinal,
	friendlyDate,
	friendlyDateLong,
	friendlyTime,
	friendlyTimezone,
	httpDate,
	rfc3339Date,
	w3cDate,
	epoch,
	daysUntil,
	dateSort,
	dateSortFilter,
}
