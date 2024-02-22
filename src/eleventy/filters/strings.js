import { encode } from "html-entities"
import markdownParser from "markdown-it"
import randomCase from "random-case"
import capitalizers from "../../data/capitalizers.js"
import { locale } from "../data/site.js"

/**
 * @return {string}
 */
const truncate = (() => {
	const truncate = (at, str = "", count = 1, end = "…") => (at === "" ? str.substring(0, count) : str.split(at).splice(0, count).join(at)) + (str.split(at).length > count ? end : "")
	return Object.freeze({
		sentences: (...args) => truncate(".", ...args),
		words: (...args) => truncate(" ", ...args),
		characters: (...args) => truncate("", ...args),
	})
})()

const stringNumbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

const conjunctionFormat = new Intl.ListFormat(locale, { style: "long", type: "conjunction" })

/**
 * @param {string[]} strings
 * @returns {string}
 */
export const conjunction = (strings) => {
	return conjunctionFormat.format(strings)
}

/**
 * @param {string} string
 * @return {string}
 */
export const specialCapitalize = (string) => {
	return capitalizers.reduce((output, capitalizer) => {
		const regex = new RegExp(capitalizer, "gi")
		return output.replace(regex, capitalizer)
	}, string)
}

/**
 * @param {string} string
 * @returns {string}
 */
export const cleanTags = (string) => {
	return string
		.replace(/<pre(.|\n)*?<\/pre>/g, "")
		.replace(/<form(.|\n)*?<\/form>/g, "")
		.replace(/<link(.|\n)*?<\/link>/g, "")
		.replace(/<s(.|\n)*?<\/s>/g, "")
		.replace(/<script(.|\n)*?<\/script>/g, "")
		.replace(/<style(.|\n)*?<\/style>/g, "")
		.replace(/<(\w+).*?class="\s*\[ support(.|\n)*?<\/\1>/g, "")
		.replace(/<(\w+).*?class="\s*\[ palette(.|\n)*?<\/\1>/g, "")
}

export const htmlEntities = (string) => {
	return encode(string)
}

/**
 * @param {string} input
 * @returns {string}
 */
export const stripNewLines = (string) => {
	return string.replace("\n", "")
}

/**
 * @param {string} string
 * @returns {string}
 */
export const stripStrikethrough = (string) => {
	return string.replace(/<s(.|\n)*?<\/s>/g, "")
}

/**
 * @param {string} string
 * @param {number} count
 * @param {boolean} [condition]
 * @returns {string}
 */
export const maxSentences = (string, count, condition = true) => {
	return condition ? truncate.sentences(string, count) : string
}

/**
 * @param {string} string
 * @param {number} count
 * @param {boolean} [condition]
 * @returns {string}
 */
export const maxWords = (string, count, condition = true) => {
	return condition ? truncate.words(string, count) : string
}

/**
 * @param {string} string
 * @param {number} count
 * @param {boolean} [condition]
 * @returns {string}
 */
export const maxChars = (string, count, condition = true) => {
	return condition ? truncate.characters(string, count) : string
}

/**
 * @param {number} number
 * @returns {string}
 */
export const numberStringFormat = (number) => {
	if (number < stringNumbers.length) {
		return stringNumbers[number]
	}
	return Math.floor(Number(number)).toLocaleString()
}

/**
 * @param {string} string
 * @returns {string}
 */
export const formatAsMarkdown = (string) => {
	return markdownParser({
		html: true,
		breaks: true,
		linkify: true,
	})
		.disable("code")
		.render(string)
}

export const excerptize = (string) => {
	return string
		.replace(/<\/(p|blockquote)>(\s+)?<(p|blockquote)>/, "<br>")
		.replace("<p>", "")
		.replace("</p>", "")
		.replace("<blockquote>", "<q>")
		.replace("</blockquote>", "</q>")
}

/**
 * @param {string} string
 * @returns {string}
 */
export const spongebob = (string) => {
	return randomCase(string)
}

export default {
	conjunction,
	specialCapitalize,
	cleanTags,
	htmlEntities,
	stripNewLines,
	stripStrikethrough,
	maxSentences,
	maxWords,
	maxChars,
	numberStringFormat,
	formatAsMarkdown,
	excerptize,
	spongebob,
}
