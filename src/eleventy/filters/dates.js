import { DateTime } from "luxon"

import { locale } from "../../data/site.js"

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

export const rfc3339Date = (dateString, showTimezone = true) => {
	const format = "yyyy-MM-dd'T'HH:mm:ss" + (showTimezone && "ZZ")
	return formatDatetime(dateString, format)
}

export default {
	ordinal,
	friendlyDate,
	friendlyDateLong,
	rfc3339Date,
}
