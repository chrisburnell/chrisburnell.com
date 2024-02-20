import mastodonInstances from "../data/mastodonInstances.js"

/**
 * @param {object[]} array
 * @param {object[]} filterList
 * @returns {object[]}
 */
export const filterOut = (array, filterList) => {
	return array.filter((item) => {
		return !filterList.includes(item)
	})
}

/**
 * @param {string} value
 * @returns {string}
 */
export const getMastodonHandle = (value) => {
	for (let instance of mastodonInstances) {
		if (value.includes(instance)) {
			if (value.includes("/@")) {
				return "@" + value.split("/@")[1].split("/")[0] + "@" + instance
			} else {
				return "@" + value.split("/users/")[1].split("/")[0] + "@" + instance
			}
		}
	}
	return value
}

/**
 * @param {string} value
 * @returns {string}
 */
export const getTwitterHandle = (value) => {
	if (value.includes("https://twitter.com")) {
		return "@" + value.split("/status/")[0].split("twitter.com/")[1]
	}
	return value
}

/**
 * @param {number} values
 * @param {number} period
 * @param {boolean} [preserveEnds]
 * @returns {number}
 */
export const simpleMovingAverage = (values, period, preserveEnds = false) => {
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
}

/**
 * @see {@link https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average}
 * @param {number} value
 * @param {number} [current]
 * @param {number} [coefficient]
 * @returns {number}
 */
export const exponentialMovingAverage = (value, current = 0, coefficient = 0.333) => {
	return coefficient * value + (1 - coefficient) * current
}

export default {
	filterOut,
	getMastodonHandle,
	getTwitterHandle,
	simpleMovingAverage,
	exponentialMovingAverage,
}
