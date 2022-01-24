const author = require("../data/author.json")
const palette = require("../data/palette.json")
const site = require("../data/site.json")
const dateFilters = require("./filters/dates")

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
		// Sparklines in A minor
		return `<spark-line values="${values.join(",")}"
							endpoint-color="${palette.maple}"
							${start ? 'start-label="' + start + '"' : ""}
							${end ? 'end-label="' + end + '"' : ""}
							key-start="25"
							key-intervals="2,1,2,2,1,2,2"
							key-limit="${site.limits.sparkline}"
							class=" [ pentatonic ] "
							title="Click me to hear me!"></spark-line>`
	},
}
