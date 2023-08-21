const blogroll = require("#data/blogroll")
const peopleAsync = require("#datajs/people")

const CleanCSS = require("clean-css")
const { transform } = require("lightningcss")
const Natural = require("natural")
const analyze = new Natural.SentimentAnalyzer("English", Natural.PorterStemmer, "afinn")

module.exports = {
	cssmin: (code) => {
		return new CleanCSS({}).minify(code).styles
	},
	lightning: (value) => {
		return transform({
			code: Buffer.from(value),
			minify: true,
		}).code
	},
	limit: (array, limit) => {
		return array.slice(0, limit)
	},
	arrayKeyEquals: (array, key, value) => {
		return array.filter((item) => {
			const keys = key.split(".")
			const itemValue = keys.reduce((object, key) => {
				return object[key]
			}, item)
			if (value === "notempty") {
				return !!itemValue?.length
			} else if (typeof value === "string" || value === null) {
				return itemValue === value
			}
			return value.includes(itemValue)
		})
	},
	arrayKeyIncludes: (array, key, value) => {
		return array.filter((item) => {
			const keys = key.split(".")
			const itemValue = keys.reduce((object, key) => {
				return object[key]
			}, item)
			return itemValue.includes(value)
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
	toNearest: (value, multiple) => {
		return Math.round(value / multiple) * multiple
	},
	getResponsesLength: (webmentions, other) => {
		return (webmentions.length || 0) + (other || 0)
	},
	getSentimentValue: (content) => {
		if (content) {
			const tokenizer = new Natural.WordTokenizer()
			return analyze.getSentiment(tokenizer.tokenize(content))
		}
		return 0
	},
	rangeMap: (number, inMin, inMax, outMin, outMax, decimals) => {
		return (((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin).toFixed(decimals || 0)
	},
	getRGB: (hex) => {
		const COLOR = hex.replace("#", "").slice(0, 6)
		return COLOR.match(/.{1,2}/g).map((value) => {
			return parseInt(value, 16)
		})
	},
	maxDecimals: (value, decimals = 2) => {
		return +value.toFixed(decimals)
	},
	exponentialMovingAverage: (timestamp, current = 0, coefficient = 0.333) => {
		return coefficient * timestamp + (1 - coefficient) * current
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
	getAllLinks: (array) => {
		// const people = await peopleAsync()
		return array.filter((item) => {
			// if it's a link type
			if (item["wm-property"] === "mention-of") {
				// if from Twitter
				if (item["wm-source"].includes("/post/twitter")) {
					// if a person's name is found, discard it
					return !blogroll.find((lookup) => {
						return lookup.title.localeCompare(item.author.name, undefined, { sensitivity: "accent" }) === 0
					})
				}
				// if from Mastodon, discard it
				if (item["wm-source"].includes("/post/mastodon")) {
					return false
				}
				// if it's a webmention (i.e. not a pingback)
				if (item["wm-protocol"] === "webmention") {
					// if it has valid content, discard it
					return !(item.contentSanitized || item.content?.html || item.content)
				}
				// otherwise, include it
				return true
			}
			// otherwise discard it
			return false
		})
	},
	getAllReplies: (array) => {
		// const people = await peopleAsync()
		return array
			.filter((item) => {
				// if it's a link type
				if (item["wm-property"] === "mention-of") {
					// if it's from Twitter
					if (item["wm-source"].includes("/post/twitter")) {
						// if a person's name is found, include it
						return blogroll.find((lookup) => {
							return lookup.title.localeCompare(item.author.name, undefined, { sensitivity: "accent" }) === 0
						})
					}
					// if it's from Mastodon, include it
					if (item["wm-source"].includes("/post/mastodon")) {
						return true
					}
					// if it's a webmention
					if (item["wm-protocol"] === "webmention") {
						// if it has valid content, include it
						return !!(item.contentSanitized || item.content?.html || item.content)
					}
					// otherwise, discard it
					return false
				}
				// if it's a reply type
				if (item["wm-property"] === "in-reply-to") {
					// if it has valid content, include it
					return !!(item.contentSanitized || item.content?.html || item.content)
				}
				// otherwise, discard it
				return false
			})
			.sort((a, b) => {
				return new Date(a.published || a["wm-recevied"]) - new Date(b.published || b["wm-recevied"])
			})
	},
}
