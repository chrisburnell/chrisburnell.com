import { load } from "cheerio"
import dotenv from "dotenv"
import he from "he"
import randomCase from "random-case"
import truncate from "truncate-html"
import capitalizers from "../../data/capitalizers.js"
import markdown from "../config/markdown.js"
import { limits, locale } from "../data/site.js"
dotenv.config()

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

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
export const supertitle = (string) => {
	let formatted = string
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ")

	capitalizers.forEach((word) => {
		const regex = new RegExp(word, "gi")
		if (formatted.match(regex)) {
			formatted = formatted.replace(regex, word)
		}
	})

	return formatted
}

/**
 * @param {string} string
 * @returns {string}
 */
export const cleanTags = (string) => {
	const $ = load(string)
	$("pre, form, link, s, script, style, .support, .palette").remove()
	return $.html()
}

/**
 *
 * @param {string} string
 * @returns {string}
 */
export const encodeHTML = (string) => {
	return he.encode(string)
}

/**
 *
 * @param {string} string
 * @returns {string}
 */
export const decodeHTML = (string) => {
	return he.decode(string)
}

/**
 * @param {string} string
 * @returns {string}
 */
export const stripImages = (string) => {
	const $ = load(string)
	$("picture, img").remove()
	$("a:empty").remove()
	return $.html()
}

/**
 * @param {string} input
 * @returns {string}
 */
export const stripNewLines = (string) => {
	return string.replace("\n", " ")
}

/**
 * @param {string} string
 * @returns {string}
 */
export const stripStrikethrough = (string) => {
	const $ = load(string)
	$("s").remove()
	return $.html()
}

/**
 * @param {string} string
 * @param {number} count
 * @param {boolean} [condition]
 * @returns {string}
 */
export const maxWords = (string, count = limits.maxWords, condition = true) => {
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
export const markdownFormat = (string) => {
	return markdown.render(string)
}

/**
 * @param string} string
 * @returns {string}
 */
export const excerptize = (string, keepImages = false) => {
	let $ = load(string.split("<!-- end excerpt -->")[0])
	$("iframe, script, style").remove()
	if (!keepImages) {
		const withoutImages = stripImages($.html())
		$ = load(withoutImages)
		$("figure").remove()
	}
	return $.html()
		.replace(/<\/(p|blockquote)>(\s+)?<(p|blockquote)>/, "<br>")
		.replace("<p></p>", "")
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

/**
 * @param {string} content
 * @param {string} keyword
 * @param {string} secret
 * @returns {string}
 */
export const vigenere = (content, keyword = "RAVENOUS", secret = process.env.VIGENERE_SECRET) => {
	content = content.toUpperCase().replace(/[^A-Z]/g, "")
	keyword = keyword.toUpperCase().replace(/[^A-Z]/g, "")
	secret = secret.toUpperCase().replace(/[^A-Z]/g, "")

	let caesarCipher = alphabet
	keyword
		.split("")
		.reverse()
		.forEach((letter) => {
			caesarCipher = letter + caesarCipher.replace(letter, "")
		})

	let vigenereTableRow = caesarCipher
	const vigenereTable = []
	caesarCipher.split("").forEach((letter) => {
		vigenereTable.push(vigenereTableRow)
		vigenereTableRow = vigenereTableRow.replace(letter, "") + letter
	})

	let secretRepeated = ""
	content.split("").forEach((_, index) => {
		secretRepeated += secret.split("")[index % secret.length]
	})

	let encrypted = ""
	secretRepeated.split("").forEach((_, index) => {
		const row = caesarCipher.indexOf(secretRepeated[index])
		const column = caesarCipher.indexOf(content[index])
		encrypted += vigenereTable[row][column]
	})

	return encrypted
}

export default {
	conjunction,
	supertitle,
	cleanTags,
	encodeHTML,
	decodeHTML,
	stripNewLines,
	stripStrikethrough,
	maxWords,
	maxChars,
	numberStringFormat,
	markdownFormat,
	excerptize,
	spongebob,
	vigenere,
}
