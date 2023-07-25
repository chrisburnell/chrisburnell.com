const { friendlyDate } = require("#filters/dates")
const { simpleMovingAverage } = require("#filters/utils")

module.exports = {
	sparkline: (collection, start, end) => {
		let values = []
		let count = 0
		// Loop through years
		for (let i = parseFloat(start); i <= parseFloat(end); i++) {
			// Loop through collection comparing Year
			for (let item of collection) {
				if (i === parseFloat(friendlyDate(item.data.date || item.date, "yyyy"))) {
					count++
				}
			}
			values.push(count)
			count = 0
		}
		// Calculate simple moving average of each value, preserve head and tail
		let normalized = simpleMovingAverage(values, 3, true)
		// Sparklines in A minor
		return `<c-sparkline values="${normalized.join(",")}"
							${start ? `start="${start}"` : ""}
							${end ? `end="${end}"` : ""}
							curve="true"></c-sparkline>`
	},
}
