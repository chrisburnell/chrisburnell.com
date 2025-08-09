/**
 * Inject content into some string based on finding a provided placeholder.
 * @param {string} originalContent
 * @param {string} placeholder
 * @param {string} injection
 * @param {string} [flags]
 * @returns {string}
 */
export const injectContent = (
	originalContent,
	placeholder,
	injection,
	flags = "g",
) => {
	const PATTERN = new RegExp(placeholder, flags);
	return originalContent.replace(PATTERN, injection);
};

/**
 * Grab query string values by name.
 * @see {@link http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript}
 * @param {string} name
 * @returns {string}
 */
export const getParameterByName = (name) => {
	const regex = RegExp(`[?&]${name}=([^&]*)`).exec(window.location.search);
	return regex && decodeURIComponent(regex[1].replace(/\+/g, " "));
};

/**
 * Remove disabled attributes from an element and optionally attach a click
 * event callback function.
 * @param {HTMLElement} element
 * @param {function} [action]
 */
export const enableElement = (element, action) => {
	if (element !== null) {
		element.disabled = false;
		element.setAttribute("aria-disabled", "false");
		if (action) {
			element.addEventListener("click", action);
		}
	}
};

/**
 * Format a Date.
 * @param {DateTime} date
 * @param {boolean} [includeWeekday]
 * @returns {string}
 */
export const formatDate = (date, includeWeekday = false) => {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const weekdays = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	let day = date.getDate();
	if (day < 10) {
		day = `0${day}`;
	}
	let month = months[date.getMonth()];
	let year = date.getFullYear();

	let weekday = includeWeekday ? `${weekdays[date.getDay()]} ` : "";

	return `${weekday}${day} ${month} ${year}`;
};

/**
 * Format a Time.
 * @param {DateTime} date
 * @param {boolean} [includeSeconds]
 * @param {boolean} [includeMerdiem]
 * @returns {string}
 */
export const formatTime = (
	date,
	includeSeconds = false,
	includeMeridiem = true,
) => {
	let hours = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, "0");
	const seconds = includeSeconds
		? `:${date.getSeconds().toString().padStart(2, "0")}`
		: "";
	const meridiem = includeMeridiem ? ` ${hours < 12 ? "am" : "pm"}` : "";

	// format from 24-hours to 12-hours if including meridiem
	hours = includeMeridiem ? hours % 12 || 12 : hours;

	return `${hours}:${minutes}${seconds}${meridiem}`;
};

/**
 * Perform an action based on the hash in the URL.
 * @param {string[]} hashes
 * @param {function} action
 * @returns false
 */
export const actionFromHash = (hashes, action) => {
	for (let hash of hashes) {
		if (window.location.hash.indexOf(hash) !== -1) {
			action();
		}
	}
};

/**
 * Ensure fetch response is OK.
 * @param {object} response
 * @returns {object}
 * @throws Response must return correctly.
 */
export const getFetchResponse = (response) => {
	if (response.ok) {
		return response;
	} else {
		let error = new Error(response.statusText);
		error.response = response;
		throw error;
	}
};

/**
 * Format a number by padding with zeroes.
 * @param {number} number
 * @param {number} [integersMax]
 * @returns {string}
 */
export const padWithZeroes = (number, integersMax = 2) => {
	const [integers, decimals] = number.toString().split(".");
	return (
		integers.toString().padStart(integersMax, "0") +
		(decimals ? `.${decimals}` : "")
	);
};

/**
 * Extract text from a string of HTML.
 * @param {string} html
 * @returns {string}
 */
export const decodeHTML = (html) => {
	let text = document.createElement("textarea");
	text.innerHTML = html;
	return text.value;
};

/**
 * Truncate text to n words.
 * @param {string} string
 * @param {number} [maximum]
 * @returns {string}
 */
export const truncate = (string, maximum = 10) => {
	let array = string.trim().split(" ");
	let ellipsis = array.length > maximum ? "…" : "";
	return (
		array
			.slice(0, maximum)
			.join(" ")
			.replace(/[,.;]$/, "") + ellipsis
	);
};

/**
 * Return a string based on the recency of a Datetime.
 * @param {DateTime} datetime
 * @returns {string}
 */
export const since = (datetime) => {
	const today = Math.floor(Date.now() / 1000);
	const compare = Math.floor(datetime.getTime() / 1000);
	const difference = Math.abs(compare - today);

	const minute = 60;
	const hour = 60 * minute;
	const day = 24 * hour;
	const week = 7 * day;
	const month = 30.436875 * day;
	const year = 12 * month;

	const rtf = new Intl.RelativeTimeFormat("en", {
		localeMatcher: "best fit", // other values: "lookup"
		numeric: "always", // other values: "auto"
		style: "long", // other values: "short" or "narrow"
	});

	if (difference < minute * 2) {
		return "just moments ago";
	} else if (difference < hour * 2) {
		return rtf.format(Math.ceil((compare - today) / minute), "minute");
	} else if (difference < day * 2) {
		return rtf.format(Math.ceil((compare - today) / hour), "hour");
	} else if (difference < week * 2) {
		return rtf.format(Math.ceil((compare - today) / day), "day");
	} else if (difference < month * 2) {
		return rtf.format(Math.ceil((compare - today) / week), "week");
	} else if (difference < year * 2) {
		return rtf.format(Math.ceil((compare - today) / month), "month");
	}
	return rtf.format(Math.ceil((compare - today) / year), "year");
};

/**
 * Search for a value within all nodes of an Object.
 * @param {object} object
 * @param {any} searchValue
 * @param {boolean} [caseSensitive]
 * @returns {boolean}
 */
export const includesDeep = (object, searchValue, caseSensitive = true) => {
	const normalizeValue = (value) =>
		caseSensitive && typeof value === "string"
			? value
			: value.toString().toLowerCase();

	const normalizedSearchValue =
		typeof searchValue === "string"
			? normalizeValue(searchValue)
			: searchValue;

	const checkValue = (value) => {
		if (typeof value === "number") {
			return (
				value === normalizedSearchValue ||
				`${value}`.includes(normalizedSearchValue)
			);
		} else if (typeof value === "string") {
			return normalizeValue(value).includes(normalizedSearchValue);
		} else if (typeof value === "object") {
			return includesDeep(value, normalizedSearchValue, caseSensitive);
		}
		return false;
	};

	return Object.values(object).some(checkValue);
};

export default {
	injectContent,
	getParameterByName,
	enableElement,
	formatDate,
	formatTime,
	actionFromHash,
	getFetchResponse,
	padWithZeroes,
	decodeHTML,
	truncate,
	since,
	includesDeep,
};
