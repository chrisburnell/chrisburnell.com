import { nowISO } from "./data/global.js"
import { friendlyDate } from "./filters/dates.js"

const currentYear = friendlyDate(nowISO, "yyyy")

export default {
	sparkline: (collection, start, animate = true, curve = true) => {
		let values = []
		let count = 0
		// Loop through years
		for (let i = parseFloat(start); i <= parseFloat(currentYear); i++) {
			// Loop through collection comparing Year
			for (let item of collection) {
				if (i === parseFloat(friendlyDate(item.data.date, "yyyy"))) {
					count++
				}
			}
			values.push(count)
			count = 0
		}
		const valuesMean = Math.round(
			values.reduce((total, value) => {
				return total + value
			}, 0) / values.length,
		)
		const normalized = values.map((value) => {
			return Math.min(value, valuesMean)
		})
		// Sparklines in A minor
		return `<svg-sparkline values="${values.join(",")}"
							normalized=${normalized.join(",")}
							fill="true"
							start-label="${start}"
							end-label="${currentYear}"
							${animate ? `animate="${animate}"` : ""}
							${curve ? `curve="${curve}"` : ""}
							class=" [ pentatonic ] "
							key-start="25"
							key-intervals="2,1,2,2,1,2,2"
							key-limit="15"
							title="Click to hear me!"></svg-sparkline>`
	},
}
