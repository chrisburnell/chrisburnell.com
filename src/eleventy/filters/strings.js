const markdownIt = require("markdown-it")({
	html: true,
	breaks: true,
	linkify: true,
}).disable("code")
const capitalizers = require("#data/capitalizers")
const twitterReplacements = require("#data/twitterReplacements")

const truncate = (() => {
	const truncate = (at, str = "", count = 1, end = "…") => (at === "" ? str.substring(0, count) : str.split(at).splice(0, count).join(at)) + (str.split(at).length > count ? end : "")
	return Object.freeze({
		sentences: (...args) => truncate(".", ...args),
		words: (...args) => truncate(" ", ...args),
		characters: (...args) => truncate("", ...args),
	})
})()

const stringNumbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
const specialNumbers = ["zeroth", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth", "thirteenth", "fourteenth", "fifteenth", "sixteenth", "seventeenth", "eighteenth", "nineteenth"]
const decaNumbers = ["twent", "thirt", "fort", "fift", "sixt", "sevent", "eight", "ninet"]

module.exports = {
	/**
	 * Calculate a rough reading time based on number of words and reading speed.
	 * @param {Number} numberOfWords
	 * @param {Number} wordsPerMinute=200
	 * @returns {Number}
	 */
	readingtime: (numberOfWords, wordsPerMinute = 200) => {
		return Math.ceil(numberOfWords / wordsPerMinute)
	},
	/**
	 * Replace Twitter links with their archived counterpart.
	 * @see {@link https://github.com/tweetback}
	 * @param {String} input
	 * @returns {String}
	 */
	replaceTwitter: (input) => {
		return Object.keys(twitterReplacements).reduce(
			(output, old) => {
				return output.replace(`@${old}`, `@${twitterReplacements[old]}`).replace(`twitter.com/${old}`, `twitter.com/${twitterReplacements[old]}`)
			},
			input.replace(`\n<a class=\"u-mention`, `<a class=\"u-mention`),
		)
	},
	/**
	 * Capitalize each word in a String.
	 * @param {String} input
	 * @returns {String}
	 */
	capitalizeFormat: (input) => {
		return capitalizers.reduce((output, capitalizer) => {
			const regex = new RegExp(capitalizer, "gi")
			return output.replace(regex, capitalizer)
		}, input)
	},
	/**
	 * Pass a String through a Markdown formatter.
	 * @param {String} value
	 * @returns {String}
	 */
	markdownFormat: (value) => {
		return markdownIt.render(value)
	},
	/**
	 * Remove specific HTML elements (and their descendants) from a string.
	 * @param {String} input
	 * @returns {String}
	 */
	cleantags: (input) => {
		return input
			.replace(/\<pre(.|\n)*?\<\/pre\>/g, "")
			.replace(/\<div class="\[ support(.*)\<\/div\>/g, "")
			.replace(/\<ul class="\[ palette(.*)\<\/ul\>/g, "")
	},
	/**
	 * Convert a number to Latin characters in a counting format.
	 * @param {Number} n
	 * @returns {String}
	 */
	numberNthFormat: (n) => {
		if (n < 20) {
			return specialNumbers[n]
		}
		if (n % 10 === 0) {
			return decaNumbers[Math.floor(n / 10) - 2] + "ieth"
		}
		return decaNumbers[Math.floor(n / 10) - 2] + "y-" + specialNumbers[n % 10]
	},
	/**
	 * Convert integers below 10 to Latin-character equivalents, above ensuring
	 * localised formatting.
	 * @param {Number} number
	 * @returns {String}
	 */
	numberStringFormat: (number) => {
		if (number < stringNumbers.length) {
			return stringNumbers[number]
		}
		return Math.floor(Number(number)).toLocaleString()
	},
	/**
	 * Convert an array of values into a string list.
	 * @param {Object[]} array
	 * @param {String} [joiner]
	 * @returns {String}
	 */
	smartjoin: (array, joiner = ", ") => {
		const last = array.pop()
		return array.join(joiner) + (array.length > 1 ? "," : "") + " and " + last
	},
	/**
	 * Truncate a string to a maximum number of sentences.
	 * @param {String} string
	 * @param {Number} count
	 * @param {Boolean} [condition]
	 * @returns {String}
	 */
	maxSentences: (string, count, condition = true) => {
		return condition ? truncate.sentences(string, count) : string
	},
	/**
	 * Truncate a string to a maximum number of words.
	 * @param {String} string
	 * @param {Number} count
	 * @param {Boolean} [condition]
	 * @returns {String}
	 */
	maxWords: (string, count, condition = true) => {
		return condition ? truncate.words(string, count) : string
	},
	/**
	 * Truncate a string to a maximum number of characters.
	 * @param {String} string
	 * @param {Number} count
	 * @param {Boolean} [condition]
	 * @returns {String}
	 */
	maxChars: (string, count, condition = true) => {
		return condition ? truncate.characters(string, count) : string
	},
	/**
	 * Randomly apply lowercase and uppercase to characters across a string.
	 * @param {String} string
	 * @returns {String}
	 */
	spongebob: (string) => {
		let modifier = 0
		return string.split("").reduce((string, character) => {
			const random = Math.max(0, Math.min(1, Math.round(Math.random() + modifier)))
			modifier = random ? Math.max(modifier - 0.333, -1) : Math.min(modifier + 0.333, 1)
			return string + (random > 0 ? character.toUpperCase() : character.toLowerCase())
		}, "")
	},
}
