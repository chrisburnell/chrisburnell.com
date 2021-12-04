const Natural = require("natural")
const analyze = new Natural.SentimentAnalyzer("English", Natural.PorterStemmer, "afinn")

module.exports = {
	limit: (array, limit) => {
		return array.slice(0, limit)
	},
	arrayKeyEquals: (array, key, value) => {
		return array.filter((a) => {
			return a[key] === value
		})
	},
	keyValue: (object, key) => {
		return object[key]
	},
	keySort: (array, key) => {
		return array.sort((a, b) => {
			return a[key].localeCompare(b[key])
		})
	},
	toArray: (value) => {
		if (Array.isArray(value)) {
			return value
		}
		return [value]
	},
	getSentimentValue: (content) => {
		if (content) {
			const tokenizer = new Natural.WordTokenizer()
			return analyze.getSentiment(tokenizer.tokenize(content))
		}
		return 0
	},
	getRGB: (hex) => {
		const COLOR = hex.replace("#", "").slice(0, 6)
		return COLOR.match(/.{1,2}/g).map((value) => {
			return parseInt(value, 16)
		})
	},
}
