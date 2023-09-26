const { DateTime } = require("luxon")
const { ordinal } = require("./intl.js")

const formatDate = (value, format) => {
	return DateTime.fromJSDate(new Date(value)).toFormat(format)
}

module.exports = {
	dateSort: (array) => {
		return array.sort((a, b) => {
			return new Date(b.data.date || b.date) - new Date(a.data.date || a.date)
		})
	},
	friendlyDate: (value, format = "LLLL d, yyyy") => {
		return formatDate(value, format)
	},
	friendlyDateLong: (value) => {
		let day = DateTime.fromJSDate(new Date(value)).toFormat("d")
		return formatDate(value, `cccc, LLLL '${ordinal(day)}', yyyy`)
	},
	friendlyTime: (value, showTimezone = true) => {
		const timeFormat = showTimezone ? "HH:mm ZZZZ" : "HH:mm"
		return formatDate(value, timeFormat).replace("GMT+1", "BST")
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
	daysUntil: (date, end) => {
		date = DateTime.fromJSDate(new Date(date))
		end = DateTime.fromJSDate(new Date(end))
		return Math.floor(end.diff(date, ["days"]).toObject().days) + 1
	},
}
