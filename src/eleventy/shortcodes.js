const author = require("../data/author.json")
const global = require("../data/global")
const palette = require("../data/palette.json")
const site = require("../data/site.json")
const dateFilters = require("./filters/dates")

let rangeMap = (number, oldMinimum, oldMaximum, newMinimum, newMaximum) => {
	return ((number - oldMinimum) / (oldMaximum - oldMinimum)) * (newMaximum - newMinimum) + newMinimum
}

module.exports = {
	codepen: (slug, tabfree = false, height = 400) => {
		return `<pre class="codepen" data-slug-hash="${slug}" data-default-tab="result" data-theme-id="${tabfree ? "8863" : "119"}" data-user="${author.codepen}" data-safe="true" data-height="${height.toString().replace("px", "")}px"><code></code></pre>`
	},
	emoji: (emoji, title = null) => {
		if (title) {
			return `<span class="emoji" title="${title}" aria-hidden="true">${emoji}</span><span class="hidden">${title}</span>`
		}
		return `<span class="emoji" aria-hidden="true">${emoji}</span>`
	},
	sparkline: (collection, startLabel, endLabel, limit = site.limits.sparkline) => {
		const startYear = parseFloat(dateFilters.friendlyDate(collection[collection.length - 1].date, "yyyy"))
		const endYear = parseFloat(dateFilters.friendlyDate(global.now, "yyyy"))
		let values = []
		let count = 0
		// Loop through years
		for (let i = startYear; i <= endYear; i++) {
			// Loop through collection comparing Year
			for (let item of collection) {
				if (i === parseFloat(dateFilters.friendlyDate(item.date, "yyyy"))) {
					count++
				}
			}
			values.push(count)
			count = 0
		}
		let highestValue = values.reduce((highest, current) => Math.max(highest, current))
		// Calculate if the highest value extends beyond the limit
		if (highestValue > limit) {
			// Range Map to the rescue
			values = values.reduce((array, count) => {
				return [...array, Math.round(rangeMap(count, 0, highestValue, 0, limit))]
			}, [])
		}
		// Sparklines in A minor
		return `<spark-line values="${values.join(",")}"
							endpoint-color="${palette.maple}"
							${startLabel ? 'start-label="' + startLabel + '"' : ""}
							${endLabel ? 'end-label="' + endLabel + '"' : ""}
							key-start="25"
							key-intervals="2, 1, 2, 2, 1, 2, 2"
							key-limit="${site.limits.sparkline}"
							class=" [ pentatonic ] "
							title="Click me to hear me!"></spark-line>`
	},
}
