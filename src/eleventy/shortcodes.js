import { currentYear } from "./data/global.js";
import { getCollectionCountByYear } from "./filters/collections.js";

/**
 * @param {Array<object>} collection
 * @param {number} start
 * @param {boolean} [animate]
 * @param {boolean} [curve]
 * @returns {string}
 */
const sparkline = (collection, start, animate = false, curve = true) => {
	let values = [];
	// Loop through years
	for (let year = Number(start); year <= Number(currentYear); year++) {
		values.push(getCollectionCountByYear(collection, year));
	}
	// Sparklines in A minor
	return `
		<svg-sparkline
			values="${values.join(",")}"
			fill="true"
			start-label="${start}"
			end-label="${currentYear}"
			${animate ? `animate="${animate}"` : ""}
			${curve ? `curve="${curve}"` : ""}
			class=" [ pentatonic ] "
			key-start="25"
			key-intervals="2,1,2,2,1,2,2"
			key-limit="15"
			title="Click to hear me!"></svg-sparkline>
		<is-land class=" [ visually-hidden ] "><template webc:raw data-island="once"><script type="module" src="/js/components/svg-sparkline.js"></script></template></is-land>
	`.trim();
};

export default {
	sparkline,
};
