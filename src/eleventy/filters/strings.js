import { locale } from "../../data/site.js"

const conjunctionFormat = new Intl.ListFormat(locale, { style: "long", type: "conjunction" })

/**
 * @param {object[]} strings
 * @returns {string}
 */
export const conjunction = (strings) => {
	return conjunctionFormat.format(strings)
}

/**
 * @param {string} string
 * @param {boolean=false} lower
 * @return {string}
 */
export const capitalize = (string, lower = false) => {
	return (lower ? string.toLowerCase() : string).replace(/(?:^|\s|["'([{])+\S/g, (match) => {
		return match.toUpperCase()
	})
}

/**
 * @param {string} string
 * @returns {string}
 */
export const stripHTML = (string) => {
	return string.replace(/<\/?[^>]+(>|$)/g, "")
}

export default {
	capitalize,
	conjunction,
	stripHTML,
}
