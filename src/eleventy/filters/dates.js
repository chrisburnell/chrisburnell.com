import { DateTime } from "luxon"

const ordinalPlurals = new Intl.PluralRules("en", {
	type: "ordinal",
})

const ordinalSuffixes = {
	one: "st",
	two: "nd",
	few: "rd",
	other: "th",
}

/**
 * @param {number} n
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

export default {
	friendlyDate,
	friendlyDateLong,
	ordinal,
}
