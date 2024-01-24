const { DateTime } = require("luxon")
const { ordinal } = require("./intl.js")

const formatDate = (value, format) => {
	return DateTime.fromISO(value, { setZone: true }).toFormat(format)
}

module.exports = {
	/**
	 * Sort an array by published date.
	 * @param {Object[]} array
	 * @returns {Object[]}
	 */
	dateSort: (array) => {
		return array.sort((a, b) => {
			return new Date(b.data.date || b.date) - new Date(a.data.date || a.date)
		})
	},
	/**
	 * Format a Datetime into a human-friendly date.
	 * @param {Datetime} value
	 * @param {String} [format]
	 * @returns {String}
	 */
	friendlyDate: (value, format = "LLLL d, yyyy") => {
		return formatDate(value, format)
	},
	/**
	 * Format a Datetime into a longer human-friendly date.
	 * @param {Datetime} value
	 * @returns {String}
	 */
	friendlyDateLong: (value) => {
		let day = DateTime.fromISO(value, { setZone: true }).toFormat("d")
		return formatDate(value, `cccc, LLLL '${ordinal(day)}', yyyy`)
	},
	/**
	 * Format a Datetime into a human-friendly time with optional timezone.
	 * @param {Datetime} value
	 * @param {Boolean} [showTimezone]
	 * @returns {String}
	 */
	friendlyTime: (value, showTimezone = true) => {
		const timeFormat = showTimezone ? "HH:mm ZZZZ" : "HH:mm"
		return formatDate(value, timeFormat).replace("GMT+1", "BST")
	},
	/**
	 * Format a Datetime into a timezone.
	 * @param {Datetime} value
	 * @returns {String}
	 */
	friendlyTimezone: (value) => {
		return DateTime.fromISO(value, { setZone: true }).zoneName
	},
	/**
	 * Format a Datetime into an HTTP Date String.
	 * @param {Datetime} value
	 * @returns {String}
	 */
	httpDate: (value) => {
		return DateTime.fromISO(value, { setZone: true }).toHTTP()
	},
	/**
	 * Format a Datetime into an RFC-3339 Date String.
	 * @param {Datetime} value
	 * @returns {String}
	 */
	rfc3339Date: (value, showTimezone = true) => {
		let format = "yyyy-MM-dd'T'HH:mm:ss" + (showTimezone ? "ZZ" : "")
		return DateTime.fromISO(value, { setZone: true }).toFormat(format)
	},
	/**
	 * Format a Datetime into an XML-formatted Date String.
	 * @param {Datetime} value
	 * @returns {String}
	 */
	w3cDate: (value) => {
		return DateTime.fromISO(value, { setZone: true }).toFormat("yyyy-MM-dd'T'HH:mm:ssZZ")
	},
	/**
	 * Format a Datetime into an Epoch timestamp.
	 * @param {Datetime} value
	 * @returns {String}
	 */
	epoch: (value) => {
		return new Date(value).getTime()
	},
	/**
	 * Calculate number of days between now and a given date.
	 * @param {Datetime} date
	 * @returns {String}
	 */
	daysUntil: (date) => {
		const future = new Date(date)
		const timeDifference = future - new Date()
		return Math.round(timeDifference / (1000 * 60 * 60 * 24))
	},
}
