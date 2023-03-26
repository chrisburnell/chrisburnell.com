const { DateTime } = require("luxon")
const { ordinal } = require("./intl.js")

module.exports = {
	dateSort: (array) => {
		return array.sort((a, b) => {
			return new Date(b.data.date || b.date) - new Date(a.data.date || a.date)
		})
	},
	friendlyDate: (value, format = "LLLL d, yyyy") => {
		return DateTime.fromJSDate(new Date(value)).toFormat(format)
	},
	friendlyDateLong: (value) => {
		let day = DateTime.fromJSDate(new Date(value)).toFormat("d")
		return DateTime.fromJSDate(new Date(value)).toFormat("cccc, LLLL _, yyyy").replace("_", ordinal(day))
	},
	friendlyTime: (value, showTimezone = true) => {
		if (showTimezone) {
			return DateTime.fromJSDate(new Date(value)).toFormat("HH:mm ZZZZ").replace("GMT+1", "BST")
		}
		return DateTime.fromJSDate(new Date(value)).toFormat("HH:mm")
	},
	friendlyTimezone: (value) => {
		return DateTime.fromJSDate(new Date(value)).zoneName
	},
	httpDate: (value) => {
		return DateTime.fromJSDate(new Date(value)).toHTTP()
	},
	rfc3339Date: (value, showTimezone = true) => {
		let format = "yyyy-MM-dd'T'HH:mm:ss" + (showTimezone ? "ZZ" : "")
		return DateTime.fromJSDate(new Date(value)).toFormat(format)
	},
	w3cDate: (value) => {
		return DateTime.fromJSDate(new Date(value)).toFormat("yyyy-MM-dd'T'HH:mm:ssZZ")
	},
	epoch: (value) => {
		return new Date(value).getTime()
	},
	daysUntil: (date, finish) => {
		date = DateTime.fromJSDate(new Date(date))
		finish = DateTime.fromJSDate(new Date(finish))
		return Math.floor(finish.diff(date, ["days"]).toObject().days) + 1
	},
}
