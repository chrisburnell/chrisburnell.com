import mastodonInstances from "../eleventy/data/mastodonInstances.js";

/**
 * @param {object[]} array
 * @param {object[]} filterList
 * @returns {object[]}
 */
export const filterOut = (array, filterList) => {
	return array.filter((item) => {
		return !filterList.includes(
			typeof item === "string" ? item.toLowerCase() : item,
		);
	});
};

/**
 * @param {string} value
 * @returns {string}
 */
export const getMastodonHandle = (value) => {
	for (let [instance, data] of Object.entries(mastodonInstances)) {
		if (value.includes(instance)) {
			if (value.includes("/@")) {
				return (
					"@" +
					value.split("/@")[1].split("/")[0] +
					"@" +
					(data.replacement || instance)
				);
			} else {
				return (
					"@" +
					value.split("/users/")[1].split("/")[0] +
					"@" +
					(data.replacement || instance)
				);
			}
		}
	}
	return value;
};

/**
 * @param {string} value
 * @returns {string}
 */
export const getTwitterHandle = (value) => {
	if (value.includes("https://twitter.com")) {
		return "@" + value.split("/status/")[0].split("twitter.com/")[1];
	}
	return value;
};

/**
 * @param {number} min
 * @param {number} value
 * @param {number} max
 * @returns {number}
 */
export const clamp = (min, value, max) => {
	return Math.min(Math.max(Number(value), Number(min)), Number(max));
};

/**
 * @param {number} values
 * @param {number} period
 * @param {boolean} [preserveEnds]
 * @returns {number}
 */
export const simpleMovingAverage = (values, period, preserveEnds = false) => {
	let step = (period - 1) / 2;
	let end = values.length - 1;
	let normalized = [];

	for (let i in values) {
		let min = Math.max(0, i - step);
		let max = Math.min(end, Number(i) + step);
		let count = Math.abs(max - min) + 1;
		let sum = 0;

		for (let j = min; j <= max; j++) {
			sum += values[j];
		}

		normalized[i] = Math.floor(sum / count);
	}
	if (preserveEnds) {
		normalized[0] = values[0];
		normalized[end] = values[end];
	}
	return normalized;
};

/**
 * @see {@link https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average}
 * @param {number} value
 * @param {number} [current]
 * @param {number} [coefficient]
 * @returns {number}
 */
export const exponentialMovingAverage = (
	value,
	current = 0,
	coefficient = 0.5,
) => {
	return coefficient * value + (1 - coefficient) * current;
};

const numeralMap = [
	{
		arabic: 1000,
		roman: "M",
	},
	{
		arabic: 900,
		roman: "CM",
	},
	{
		arabic: 500,
		roman: "D",
	},
	{
		arabic: 400,
		roman: "CD",
	},
	{
		arabic: 100,
		roman: "C",
	},
	{
		arabic: 90,
		roman: "XC",
	},
	{
		arabic: 50,
		roman: "L",
	},
	{
		arabic: 40,
		roman: "XL",
	},
	{
		arabic: 10,
		roman: "X",
	},
	{
		arabic: 9,
		roman: "IX",
	},
	{
		arabic: 5,
		roman: "V",
	},
	{
		arabic: 4,
		roman: "IV",
	},
	{
		arabic: 1,
		roman: "I",
	},
];

/**
 * @param {number} number
 * @returns {string}
 */
export const toRoman = (number) => {
	return numeralMap
		.reduce((romanNumeral, numeral) => {
			while (number >= numeral.arabic) {
				romanNumeral.push(numeral.roman);
				number -= numeral.arabic;
			}
			return romanNumeral;
		}, [])
		.join("");
};

export default {
	filterOut,
	getMastodonHandle,
	getTwitterHandle,
	clamp,
	simpleMovingAverage,
	exponentialMovingAverage,
	toRoman,
};
