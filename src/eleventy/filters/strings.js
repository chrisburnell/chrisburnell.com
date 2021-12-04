const markdownIt = require("markdown-it")({
	html: true,
	breaks: true,
	linkify: true,
})
const capitalizers = require("../../data/capitalizers.json")

const truncate = (() => {
	const truncate = (at, str = "", count = 1, end = "…") => (at === "" ? str.substring(0, count) : str.split(at).splice(0, count).join(at)) + (str.split(at).length > count ? end : "")
	return Object.freeze({
		sentences: (...args) => truncate(".", ...args),
		words: (...args) => truncate(" ", ...args),
		characters: (...args) => truncate("", ...args),
	})
})()

const ordinalRules = new Intl.PluralRules("en", {
	type: "ordinal",
})
const ordinalSuffixes = {
	one: "st",
	two: "nd",
	few: "rd",
	other: "th",
}

const stringNumbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
const specialNumbers = ["zeroth", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth", "thirteenth", "fourteenth", "fifteenth", "sixteenth", "seventeenth", "eighteenth", "nineteenth"]
const decaNumbers = ["twent", "thirt", "fort", "fift", "sixt", "sevent", "eight", "ninet"]

module.exports = {
	getReadingTime: (text) => {
		const wordsPerMinute = 200
		const numberOfWords = text.split(/\s/g).length
		return Math.ceil(numberOfWords / wordsPerMinute)
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
	numberNthFormat: (n) => {
		if (n < 20) {
			return specialNumbers[n]
		}
		if (n % 10 === 0) {
			return decaNumbers[Math.floor(n / 10) - 2] + "ieth"
		}
		return decaNumbers[Math.floor(n / 10) - 2] + "y-" + specialNumbers[n % 10]
	},
	numberOrdinalFormat: (n, superscript = false) => {
		const ordinal = ordinalSuffixes[ordinalRules.select(n)]
		return `${n}${superscript ? "<sup>" : ""}${ordinal}${superscript ? "</sup>" : ""}`
	},
	numberStringFormat: (number) => {
		if (number < stringNumbers.length) {
			return stringNumbers[number]
		}
		return number
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
