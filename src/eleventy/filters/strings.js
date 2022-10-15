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
	readingtime: (numberOfWords) => {
		const wordsPerMinute = 200
		return Math.ceil(numberOfWords / wordsPerMinute)
	},
	replaceTwitter: (input) => {
		return Object.keys(twitterReplacements).reduce((output, old) => {
			return output.replace(`@${old}`, `@${twitterReplacements[old]}`).replace(`twitter.com/${old}`, `twitter.com/${twitterReplacements[old]}`)
		}, input)
	},
	capitalizeFormat: (input) => {
		return capitalizers.reduce((output, capitalizer) => {
			const regex = new RegExp(capitalizer, "gi")
			return output.replace(regex, capitalizer)
		}, input)
	},
	markdownFormat: (value) => {
		return markdownIt.render(value)
	},
	cleantags: (input) => {
		return input.replace(/\<pre(.*)\<\/pre\>/g, "").replace(/\<div class="\[ support(.*)\<\/div\>/g, "")
	},
	numberNthFormat: (n) => {
		if (n < 20) {
			return specialNumbers[n]
		}
		if (n % 10 === 0) {
			return decaNumbers[Math.floor(n / 10) - 2] + "ieth"
		}
		return decaNumbers[Math.floor(n / 10) - 2] + "y-" + specialNumbers[n % 10]
	},
	numberStringFormat: (number) => {
		if (number < stringNumbers.length) {
			return stringNumbers[number]
		}
		return Math.floor(Number(number)).toLocaleString()
	},
	smartjoin: (array, joiner = ", ") => {
		const last = array.pop()
		return array.join(joiner) + (array.length > 1 ? "," : "") + " and " + last
	},
	maxSentences: (string, count, condition = true) => {
		return condition ? truncate.sentences(string, count) : string
	},
	maxWords: (string, count, condition = true) => {
		return condition ? truncate.words(string, count) : string
	},
	maxChars: (string, count, condition = true) => {
		return condition ? truncate.characters(string, count) : string
	},
}
