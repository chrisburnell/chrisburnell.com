const { DateTime } = require("luxon")

const ordinalRules = new Intl.PluralRules("en", {
	type: "ordinal",
})
const ordinalSuffixes = {
	one: "st",
	two: "nd",
	few: "rd",
	other: "th",
}

const numberOrdinalFormat = (n) => {
	const ordinal = ordinalSuffixes[ordinalRules.select(n)]
	return `${n}<sup>${ordinal}</sup>`
}

module.exports = {
	friendlyDate: (value, format = "LLLL d, yyyy") => {
		return DateTime.fromJSDate(new Date(value)).toFormat(format)
	},
	friendlyDateLong: (value) => {
		let day = DateTime.fromJSDate(new Date(value)).toFormat("d")
		return DateTime.fromJSDate(new Date(value)).toFormat("cccc, LLLL _, yyyy").replace("_", numberOrdinalFormat(day))
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
	rfcDate: (value, showTimezone = true) => {
		let format = "yyyy-MM-dd'T'HH:mm:ss" + (showTimezone ? "ZZZ" : "")
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
