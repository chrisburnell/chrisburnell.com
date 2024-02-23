import { encode } from "html-entities"
import markdownParser from "markdown-it"
import randomCase from "random-case"
import truncate from "truncate-html"
import capitalizers from "../../data/capitalizers.js"
import { locale } from "../data/site.js"

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
export const maxWords = (string, count, condition = true) => {
	return condition ? truncate(string, count, { byWords: true }) : string
}

/**
 * @param {string} string
 * @param {number} count
 * @param {boolean} [condition]
 * @returns {string}
 */
export const maxChars = (string, count, condition = true) => {
	return condition ? truncate(string, count) : string
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
	maxWords,
	maxChars,
	numberStringFormat,
	formatAsMarkdown,
	excerptize,
	spongebob,
}
