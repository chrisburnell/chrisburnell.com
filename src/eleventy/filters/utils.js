const Natural = require("natural")
const analyze = new Natural.SentimentAnalyzer("English", Natural.PorterStemmer, "afinn")

const postTypes = {
	like: "like-of",
	repost: "repost-of",
	bookmark: "bookmark-of",
	link: "mention-of",
	reply: "in-reply-to",
}

module.exports = {
	limit: (array, limit) => {
		return array.slice(0, limit)
	},
	arrayKeyEquals: (array, key, value) => {
		return array.filter((item) => {
			const keys = key.split(".")
			const reducedKey = keys.reduce((object, key) => {
				return object[key]
			}, item)

			return reducedKey === value ? item : false
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
	getPostType: (type) => {
		return postTypes[type] || type
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
	simpleMovingAverage: (values, period, preserveEnds) => {
		preserveEnds = preserveEnds || false
		let step = (period - 1) / 2
		let end = values.length - 1
		let normalized = []

		for (let i in values) {
			let min = Math.max(0, i - step)
			let max = Math.min(end, parseFloat(i) + step)
			let count = Math.abs(max - min) + 1
			let sum = 0

			for (let j = min; j <= max; j++) {
				sum += values[j]
			}

			normalized[i] = Math.floor(sum / count)
		}
		if (preserveEnds) {
			normalized[0] = values[0]
			normalized[end] = values[end]
		}
		return normalized
	},
}
