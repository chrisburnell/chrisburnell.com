import { friendlyDate } from "./filters/dates.js"
import { simpleMovingAverage } from "./filters/utils.js"

export default {
	sparkline: (collection, start, end, animate = true, curve = true) => {
		let values = []
		let count = 0
		// Loop through years
		for (let i = parseFloat(start); i <= parseFloat(end); i++) {
			// Loop through collection comparing Year
			for (let item of collection) {
				if (i === parseFloat(friendlyDate(item.data.date, "yyyy"))) {
					count++
				}
			}
			values.push(count)
			count = 0
		}
		// Calculate simple moving average of each value, preserve head and tail
		let normalized = simpleMovingAverage(values, 3, true)
		// Sparklines in A minor
		return `<svg-sparkline values="${normalized.join(",")}"
							fill="true"
							${start ? `start-label="${start}"` : ""}
							${end ? `end-label="${end}"` : ""}
							${animate ? `animate="${animate}"` : ""}
							${curve ? `curve="${curve}"` : ""}
							class=" [ pentatonic ] "
							key-start="25"
							key-intervals="2,1,2,2,1,2,2"
							key-limit="15"
							title="Click to hear me!"></svg-sparkline>`
	},
}
