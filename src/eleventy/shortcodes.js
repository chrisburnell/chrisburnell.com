const author = require("../data/author")
const colors = require("../data/designTokens/colors")
const site = require("../data/site")
const dateFilters = require("./filters/dates")
const utilityFilters = require("./filters/utils")

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
	sparkline: (collection, start, end) => {
		let values = []
		let count = 0
		// Loop through years
		for (let i = parseFloat(start); i <= parseFloat(end); i++) {
			// Loop through collection comparing Year
			for (let item of collection) {
				if (i === parseFloat(dateFilters.friendlyDate(item.date, "yyyy"))) {
					count++
				}
			}
			values.push(count)
			count = 0
		}
		// Calculate simple moving average of each value
		let normalized = utilityFilters.simpleMovingAverage(values, 3)
		// Sparklines in A minor
		return `<spark-line values="${normalized.join(",")}"
							endpoint-color="${colors.maple}"
							${start ? 'start-label="' + start + '"' : ""}
							${end ? 'end-label="' + end + '"' : ""}
							key-start="25"
							key-intervals="2,1,2,2,1,2,2"
							key-limit="${site.limits.sparkline}"
							line-width="1.5"
							class=" [ pentatonic ] "
							title="Click to hear me!"></spark-line>`
	},
}
