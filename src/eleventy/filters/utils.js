const blogroll = require("#data/blogroll")

module.exports = {
	/**
	 * Truncate an array to a set length.
	 * @param {Object[]} array
	 * @param {Number} limit
	 * @returns {Object[]}
	 */
	limit: (array, limit) => {
		return array.slice(0, limit)
	},
	/**
	 * Check if an object within an array has a key with a value matching a term.
	 * @param {Object[]} array
	 * @param {String} key
	 * @param {any} value
	 * @returns {Boolean}
	 */
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
	/**
	 * Check if an object within an array has a value that includes a term.
	 * @param {Object[]} array
	 * @param {String} key
	 * @param {any} value
	 * @returns {Boolean}
	 */
	arrayKeyIncludes: (array, key, value) => {
		return array.filter((item) => {
			const keys = key.split(".")
			const itemValue = keys.reduce((object, key) => {
				return object[key]
			}, item)
			return itemValue.includes(value)
		})
	},
	/**
	 * Return a key’s value from an Object.
	 * @param {Object[]} object
	 * @param {String} key
	 * @returns {any}
	 */
	keyValue: (object, key) => {
		return object[key]
	},
	/**
	 * Sort an array of Object’s by a common key’s value.
	 * @param {Object[]} array
	 * @param {String} key
	 * @returns {Object[]}
	 */
	keySort: (array, key) => {
		const keys = key.split(".")
		return array.sort((a, b) => {
			const aValue = keys.reduce((o, k) => {
				return o[k]
			}, a)
			const bValue = keys.reduce((o, k) => {
				return o[k]
			}, b)

			return String(aValue || "").localeCompare(String(bValue || ""))
		})
	},
	/**
	 * Cast a value into an array.
	 * @param {any} value
	 * @returns {Object[]}
	 */
	toArray: (value) => {
		if (Array.isArray(value)) {
			return value
		}
		return [value]
	},
	/**
	 * Round a value to a nearest multiple of a given number.
	 * @param {Number} value
	 * @param {Number} multiple
	 * @returns {Number}
	 */
	toNearest: (value, multiple) => {
		return Math.round(value / multiple) * multiple
	},
	/**
	 * Return total number of webmentions and other counted values.
	 * @param {Object[]} webmentions
	 * @param {number} other
	 * @returns {Number}
	 */
	getResponsesLength: (webmentions, other) => {
		return (webmentions.length || 0) + (other || 0)
	},
	/**
	 * Map a number from one range to another including number of decimals.
	 * @param {Number} number
	 * @param {Number} inMin
	 * @param {Number} inMax
	 * @param {Number} outMin
	 * @param {Number} outMax
	 * @param {Number} decimals
	 * @returns {Number}
	 */
	rangeMap: (number, inMin, inMax, outMin, outMax, decimals) => {
		return (((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin).toFixed(decimals || 0)
	},
	/**
	 * Return the RGB equivalent of a Hex Color.
	 * @param {String} hex
	 * @returns {Number}
	 */
	getRGB: (hex) => {
		const COLOR = hex.replace("#", "").slice(0, 6)
		return COLOR.match(/.{1,2}/g).map((value) => {
			return parseInt(value, 16)
		})
	},
	/**
	 * Limit a number to a maximum number of decimals.
	 * @param {Number} value
	 * @param {Number} [decimals]
	 * @returns {Number}
	 */
	maxDecimals: (value, decimals = 2) => {
		return +value.toFixed(decimals)
	},
	/**
	 * Calculate an exponential moving average.
	 * @see {@link https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average}
	 * @param {Number} value
	 * @param {Number} [current]
	 * @param {Number} [coefficient]
	 * @returns {Number}
	 */
	exponentialMovingAverage: (value, current = 0, coefficient = 0.333) => {
		return coefficient * value + (1 - coefficient) * current
	},
	/**
	 * Calculate a simple moving average.
	 * @param {Number} values
	 * @param {Number} period
	 * @param {Boolean} [preserveEnds]
	 * @returns {Number}
	 */
	simpleMovingAverage: (values, period, preserveEnds = false) => {
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
	/**
	 * Get all link-type responses from a set of Webmentions.
	 * @param {Object[]} array
	 * @returns {Object[]}
	 */
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
	/**
	 * Get all reply-type responses from a set of Webmentions.
	 * @param {Object[]} array
	 * @returns {Object[]}
	 */
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
