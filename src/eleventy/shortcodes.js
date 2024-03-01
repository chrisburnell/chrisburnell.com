import { nowISO } from "./data/global.js"
import { getCollectionCountByYear } from "./filters/collections.js"
import { friendlyDate } from "./filters/dates.js"

const currentYear = friendlyDate(nowISO, "yyyy")

/**
 * @param {object[]} collection
 * @param {number} start
 * @param {boolean} [animate=true]
 * @param {boolean} [curve=true]
 * @returns {string}
 */
const sparkline = (collection, start, animate = true, curve = true) => {
	let values = []
	// Loop through years
	for (let year = parseFloat(start); year <= parseFloat(currentYear); year++) {
		values.push(getCollectionCountByYear(collection, year))
	}
	// Sparklines in A minor
	return `<svg-sparkline values="${values.join(",")}"
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
}

export default {
	sparkline,
}
