import markdownParser from "markdown-it"

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

export const formatAsMarkdown = (string) => {
	return markdownParser({
		html: true,
		breaks: true,
		linkify: true,
	})
		.disable("code")
		.render(string)
}

/**
 * @param {string} string
 * @returns {string}
 */
export const spongebob = (string) => {
	let modifier = 0
	return string.split("").reduce((string, character) => {
		const random = Math.max(0, Math.min(1, Math.round(Math.random() + modifier)))
		modifier = random ? Math.max(modifier - 0.333, -1) : Math.min(modifier + 0.333, 1)
		return string + (random > 0 ? character.toUpperCase() : character.toLowerCase())
	}, "")
}

export default {
	capitalize,
	conjunction,
	stripHTML,
	formatAsMarkdown,
	spongebob,
}
