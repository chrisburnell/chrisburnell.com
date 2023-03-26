const lf = new Intl.ListFormat("en", { style: "long", type: "conjunction" })

const rtf = new Intl.RelativeTimeFormat("en", {
	localeMatcher: "best fit", // other values: "lookup"
	numeric: "always", // other values: "auto"
	style: "long", // other values: "short" or "narrow"
})
const today = Math.floor(Date.now() / 1000)
const minute = 60
const hour = 60 * minute
const day = 24 * hour
const week = 7 * day
const month = 30.436875 * day
const year = 12 * month

const pr = new Intl.PluralRules("en", {
	type: "ordinal",
})
const ordinalSuffixes = {
	one: "st",
	two: "nd",
	few: "rd",
	other: "th",
}

module.exports = {
	conjuction: (array) => {
		return lf.format(array)
	},
	since: (datetime) => {
		const compare = Math.floor(datetime.getTime() / 1000)
		const difference = Math.abs(compare - today)

		if (difference < minute * 2) {
			return "just moments ago"
		} else if (difference < hour * 2) {
			return rtf.format(Math.ceil((compare - today) / minute), "minute")
		} else if (difference < day * 2) {
			return rtf.format(Math.ceil((compare - today) / hour), "hour")
		} else if (difference < week * 2) {
			return rtf.format(Math.ceil((compare - today) / day), "day")
		} else if (difference < month * 2) {
			return rtf.format(Math.ceil((compare - today) / week), "week")
		} else if (difference < year * 2) {
			return rtf.format(Math.ceil((compare - today) / month), "month")
		}
		return rtf.format(Math.ceil((compare - today) / year), "year")
	},
	ordinal: (n) => {
		const ordinal = ordinalSuffixes[pr.select(n)]
		return `${n}<sup>${ordinal}</sup>`
	},
}
