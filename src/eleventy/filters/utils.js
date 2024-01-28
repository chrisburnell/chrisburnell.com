/**
 * @param {object} object
 * @param {string} key
 * @returns {any}
 */
export const keyValue = (object, key) => {
	return object[key]
}

/**
 *
 * @param {object[]} array
 * @param {string} key
 * @returns {object[]}
 */
export const arrayKeyValues = (array, key) => {
	return array
		.filter((item) => {
			return keyValue(item, key)
		})
		.map((item) => {
			return keyValue(item, key)
		})
}

export default {
	keyValue,
	arrayKeyValues,
}
