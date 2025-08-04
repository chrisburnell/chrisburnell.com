const specialNumbers = [
	"zeroth",
	"first",
	"second",
	"third",
	"fourth",
	"fifth",
	"sixth",
	"seventh",
	"eighth",
	"ninth",
	"tenth",
	"eleventh",
	"twelfth",
	"thirteenth",
	"fourteenth",
	"fifteenth",
	"sixteenth",
	"seventeenth",
	"eighteenth",
	"nineteenth",
];
const decaNumbers = [
	"twent",
	"thirt",
	"fort",
	"fift",
	"sixt",
	"sevent",
	"eight",
	"ninet",
];

/**
 * @param {string} string
 * @param {boolean} [lower]
 * @returns {string}
 */
export const capitalize = (string, lower = false) => {
	return (lower ? string.toLowerCase() : string).replace(
		/(?:^|\s|["'([{])+\S/g,
		(match) => {
			return match.toUpperCase();
		},
	);
};

/**
 * @param {string} string
 * @returns {string}
 */
export const stripHTML = (string) => {
	return string.replace(/<\/?[^>]+(>|$)/g, "");
};

/**
 * @param {number} number
 * @returns {string}
 */
export const numberNthFormat = (number) => {
	if (number < 20) {
		return specialNumbers[number];
	}
	if (number % 10 === 0) {
		return decaNumbers[Math.floor(number / 10) - 2] + "ieth";
	}
	return (
		decaNumbers[Math.floor(number / 10) - 2] +
		"y-" +
		specialNumbers[number % 10]
	);
};

export default {
	capitalize,
	stripHTML,
	numberNthFormat,
};
