import { Temporal } from "@js-temporal/polyfill";
import { nowEpoch } from "../data/global.js";
import { limits, localeSpecific } from "../data/site.js";
import { keyValue } from "./utils.js";

const cachedFriendlyDates = new Map();
const cachedFriendlyLongDates = new Map();
const cachedRFC3339Dates = new Map();

const tidyDateString = (dateString) => {
	dateString = dateString
		.replace(/(\.\d+)/g, "")
		.replace(/([+-]\d{2})(\d{2})$/, (match, h, m) => `${h}:${m}`)
		.replace(/(Z)$/, "+00:00");
	dateString = /([+-]\d{2}):(\d{2})$/.test(dateString)
		? dateString
		: `${dateString}+00:00`;
	return dateString;
};

const zonedDatetime = (dateString) => {
	dateString = tidyDateString(dateString);

	const offset = dateString.match(/([+-]\d{2}:\d{2})/)?.[1] || "UTC";
	let instant = Temporal.Instant.from(dateString);

	return instant.toZonedDateTimeISO(offset);
};

const optionsDefault = {
	year: "numeric",
	month: "long",
	day: "numeric",
};

const formatDatetime = (dateString, options = optionsDefault) => {
	const { epochMilliseconds, timeZoneId } = zonedDatetime(dateString);
	const dateObject = new Date(epochMilliseconds);

	return new Intl.DateTimeFormat(localeSpecific, {
		...options,
		timeZone: timeZoneId,
	}).format(dateObject);
};

export const adjustDatetime = (dateString, duration) => {
	const original = zonedDatetime(dateString);
	return original
		.add(duration)
		.toString()
		.replace(/\[.*\]$/, "");
};

const ordinalPlurals = new Intl.PluralRules(localeSpecific, {
	type: "ordinal",
});

const ordinalSuffixes = {
	one: "st",
	two: "nd",
	few: "rd",
	other: "th",
};

/**
 * @param {number} number
 * @returns {string}
 */
export const ordinal = (number) => {
	return `${number}<sup>${ordinalSuffixes[ordinalPlurals.select(number)]}</sup>`;
};

/**
 * @param {string} dateString
 * @param {string} [format]
 * @returns {string}
 */
export const friendlyDate = (dateString, format) => {
	const cacheKey = `${dateString}-${format}`;
	if (cachedFriendlyDates.has(cacheKey)) {
		return cachedFriendlyDates.get(cacheKey);
	}
	const result = formatDatetime(dateString, format);
	cachedFriendlyDates.set(cacheKey, result);
	return result;
};

/**
 * @param {string} dateString
 * @returns {string}
 */
export const friendlyDateLong = (dateString) => {
	if (cachedFriendlyLongDates.has(dateString)) {
		return cachedFriendlyLongDates.get(dateString);
	}
	const result = `${formatDatetime(dateString, {
		weekday: "long",
	})}, ${formatDatetime(dateString, {
		year: "numeric",
		month: "long",
		day: "numeric",
	})}`;
	cachedFriendlyLongDates.set(dateString, result);
	return result;
};

/**
 * @param {string} dateString
 * @param {boolean} [showTimezone]
 * @returns {string}
 */
export const friendlyTime = (dateString, showTimezone = true) => {
	return formatDatetime(dateString, {
		hour: "2-digit",
		minute: "2-digit",
		timeZoneName: showTimezone ? "shortOffset" : undefined,
	})
		.replace(
			/(GMT|UTC)\+8/g,
			`<abbr title="Singapore Time (UTC+8)">SGT <span aria-hidden="true">🇸🇬</span></abbr>`,
		)
		.replace(
			/(GMT|UTC)\+1/g,
			`<abbr title="British Summer Time (UTC+1)">BST <span aria-hidden="true">🇬🇧</span></abbr>`,
		)
		.replace(
			/(GMT|UTC)$/g,
			`<abbr title="Greenwich Mean Time (UTC)">GMT <span aria-hidden="true">🇬🇧</span></abbr>`,
		)
		.replace(
			/(GMT|UTC)-3/g,
			`<abbr title="Atlantic Daylight Time (UTC-3)">ADT <span aria-hidden="true">🇨🇦</span></abbr>`,
		)
		.replace(
			/(GMT|UTC)-4/g,
			`<abbr title="Atlantic Standard Time (UTC-4)">AST <span aria-hidden="true">🇨🇦</span></abbr>`,
		);
};

/**
 * @param {string} dateString
 * @returns {string}
 */
export const formattedDate = (dateString) => {
	const zoned = zonedDatetime(dateString);
	const { year, month, day } = zoned;
	return `${year.toString().padStart(4, "0")}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
};

/**
 * @param {string} dateString
 * @returns {string}
 */
export const formattedTime = (dateString) => {
	const zoned = zonedDatetime(dateString);
	const { hour, minute, second } = zoned;
	return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
};

/**
 * @param {string} dateString
 * @returns {string}
 */
export const formattedTimezone = (dateString) => {
	const zoned = zonedDatetime(dateString);
	const { offset } = zoned;
	return offset;
};

/**
 * @param {string} dateString
 * @param {boolean} [showTimezone]
 * @returns {string}
 */
export const rfc3339Date = (dateString, showTimezone = true) => {
	const cacheKey = `${dateString}-${showTimezone}`;
	if (cachedRFC3339Dates.has(cacheKey)) {
		return cachedRFC3339Dates.get(cacheKey);
	}
	const result = `${formattedDate(dateString)}T${formattedTime(dateString)}${showTimezone ? formattedTimezone(dateString) : ""}`;
	cachedRFC3339Dates.set(cacheKey, result);
	return result;
};

/**
 * @param {string} dateString
 * @returns {string}
 */
export const w3cDate = (dateString) => rfc3339Date(dateString);

/**
 * @param {string} dateString
 * @returns {string}
 */
export const ianaTimezone = (dateString) => {
	// prettier-ignore
	return formatDatetime(dateString, {
		timeZoneName: "shortOffset",
	}).split(" ")[1]
		.replace(/(GMT|UTC)\+8/g, "Asia/Singapore")
		.replace(/(GMT|UTC)\+1/g, "Europe/London")
		.replace(/(GMT|UTC)$/g, "Europe/London")
		.replace(/(GMT|UTC)-3/g, "America/Halifax")
		.replace(/(GMT|UTC)-4/g, "America/Halifax")
};

/**
 * @param {string} dateString
 * @returns {string}
 */
export const epoch = (dateString) => {
	return new Date(dateString).getTime();
};

/**
 * @param {object} a
 * @param {object} b
 * @returns {number}
 */
export const dateSort = (a, b) => {
	return new Date(b.data.date) - new Date(a.data.date);
};

/**
 * @param {Array<object>} array
 * @returns {Array<object>}
 */
export const sortByDate = (array) => {
	return array.sort(dateSort);
};

/**
 * @param {number} value
 * @returns {number}
 */
export const msToDays = (value) => {
	return value / 1000 / 60 / 60 / 24;
};

/**
 * @param {string} value
 * @returns {boolean}
 */
export const isPast = (value) => {
	return epoch(value) <= nowEpoch;
};

/**
 * @param {string} value
 * @returns {boolean}
 */
export const isFuture = (value) => {
	return nowEpoch < epoch(value);
};

/**
 * @param {string} value
 * @param {number} [upcomingDays]
 * @returns {boolean}
 */
export const isUpcoming = (value, upcomingDays = limits.upcomingDays) => {
	const differenceDays = msToDays(epoch(value) - nowEpoch);
	return 0 < differenceDays && differenceDays < upcomingDays;
};

/**
 * @param {string} value
 * @param {number} [days]
 * @returns {boolean}
 */
export const isRecent = (value, days = limits.recentDays) => {
	const differenceDays = msToDays(nowEpoch - epoch(value));
	return 0 < differenceDays && differenceDays < days;
};

/**
 * @param {Array<object>} array
 * @param {string} key
 * @param {number} [days]
 * @returns {Array<object>}
 */
export const recentFilter = (array, key, days = limits.recentDays) => {
	return array.filter((item) => {
		const value = keyValue(item, key);
		return isRecent(value, days);
	});
};

/**
 * @param {Array<object>} array
 * @param {number} [days]
 * @returns {Array<object>}
 */
export const noRSSOnlyFilter = (array, days = limits.rssOnlyDays) => {
	return array.filter((item) => {
		if (item.data.tags && item.data.tags.includes("rss-only")) {
			return !isRecent(item.data.date, item.data.rss_only_days || days);
		}
		return true;
	});
};

let userLocale = localeSpecific;
if (typeof document !== "undefined") {
	userLocale =
		document.querySelector("html").getAttribute("lang") ||
		navigator.languages
			? navigator.languages[0]
			: userLocale;
}

const rtf = new Intl.RelativeTimeFormat(userLocale, {
	localeMatcher: "best fit",
	numeric: "always",
	style: "long",
});

const rtfDivisions = [
	{
		amount: 60,
		name: "second",
	},
	{
		amount: 60,
		name: "minute",
	},
	{
		amount: 24,
		name: "hour",
	},
	{
		amount: 7,
		name: "day",
	},
	{
		amount: 4.34524,
		name: "week",
	},
	{
		amount: 12,
		name: "month",
	},
	{
		amount: Number.POSITIVE_INFINITY,
		name: "year",
	},
];

/**
 * @param {Date} datetime
 * @param {string} [division]
 * @returns {string}
 */
export const getRelativeTime = (datetime, division) => {
	if (typeof datetime === "string") {
		datetime = new Date(datetime);
	}

	let difference = (datetime.getTime() - Date.now()) / 1000;

	if (division) {
		return rtf.format(Math.round(difference), division);
	}

	for (const division of rtfDivisions) {
		if (Math.floor(Math.abs(difference)) < division.amount) {
			return rtf.format(Math.round(difference), division.name);
		}
		difference /= division.amount;
	}
};

const emojiFuture = `<span class=" [ emoji ] " aria-hidden="true">➡️</span>`;
const emojiGoing = `<span class=" [ emoji ] " aria-hidden="true">✅</span>`;
const emojiHopefully = `<span class=" [ emoji ] " aria-hidden="true">😔</span>`;
const emojiNotGoing = `<span class=" [ emoji ] " aria-hidden="true">🤞</span>`;

/**
 * @param {string} start
 * @param {string} end
 * @param {string} value
 * @returns {string}
 */
export const getRSVPValueString = (start, end, value, showEmoji = false) => {
	const now = Date.now();

	if (value === "yes") {
		if (epoch(start) > now) {
			return `${showEmoji ? emojiFuture + " " : ""}<small>attending</small>`;
		}
		if (epoch(start) <= now && now <= epoch(end)) {
			return `${showEmoji ? emojiGoing + " " : ""}<small class=" [ currently-attending ] ">currently attending</small>`;
		}
		return `${showEmoji ? emojiGoing + " " : ""}<small>attended</small>`;
	}
	if (value === "maybe" || value === "interested") {
		if (epoch(start) > now) {
			return `${showEmoji ? emojiHopefully + " " : ""}<small>hoping to attend</small>`;
		}
		return `${showEmoji ? emojiHopefully + " " : ""}<small>was hoping to attend</small>`;
	}
	if (epoch(start) > now) {
		return `${showEmoji ? emojiNotGoing + " " : ""}<small>unable to attend</small>`;
	}
	return `${showEmoji ? emojiNotGoing + " " : ""}<small>was unable to attend</small>`;
};

/**
 * @param {string} start
 * @param {string} end
 * @param {string} value
 * @returns {string}
 */
export const getRSVPValueHTML = (start, end, value) => {
	const content = getRSVPValueString(start, end, value);
	return `<span data-start="${rfc3339Date(start)}" data-end="${rfc3339Date(end)}" data-value="${value}" data-relative-rsvp-value>${content}</span>`;
};

/**
 * @param {string} end
 * @returns {string}
 */
export const getRSVPDateString = (end) => {
	if (Date.now() <= epoch(end)) {
		return "taking place";
	}
	return "took place";
};

export default {
	adjustDatetime,
	ordinal,
	friendlyDate,
	friendlyDateLong,
	friendlyTime,
	ianaTimezone,
	formattedDate,
	formattedTime,
	formattedTimezone,
	rfc3339Date,
	w3cDate,
	epoch,
	dateSort,
	sortByDate,
	msToDays,
	isPast,
	isFuture,
	isUpcoming,
	isRecent,
	recentFilter,
	noRSSOnlyFilter,
	getRelativeTime,
	getRSVPValueString,
	getRSVPValueHTML,
	getRSVPDateString,
};
