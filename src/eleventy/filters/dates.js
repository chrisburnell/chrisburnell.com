import { DateTime } from "luxon";
import { nowEpoch } from "../data/global.js";
import { limits, locale } from "../data/site.js";

/**
 * @param {string} dateString
 * @param {string} format
 * @return {string}
 */
export const formatDatetime = (dateString, format) => {
	return DateTime.fromISO(dateString, { setZone: true }).toFormat(format);
};

const ordinalPlurals = new Intl.PluralRules(locale, {
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
 * @return {string}
 */
export const friendlyDate = (dateString, format = "d LLLL yyyy") => {
	return formatDatetime(dateString, format);
};

/**
 * @param {string} dateString
 * @return {string}
 */
export const friendlyDateLong = (dateString) => {
	return formatDatetime(dateString, `cccc, d LLLL yyyy`);
};

/**
 * @param {DateTime} value
 * @param {boolean} [showTimezone]
 * @returns {string}
 */
export const friendlyTime = (value, showTimezone = true) => {
	const format = "HH:mm" + (showTimezone ? " ZZZZ" : "");
	// prettier-ignore
	return formatDatetime(value, format)
		.replace(/(GMT|UTC)\+8/g, `<abbr title="Singapore Time">SGT <span aria-hidden="true">🇸🇬</span></abbr>`)
		.replace(/(GMT|UTC)\+1/g, `<abbr title="British Summer Time">BST <span aria-hidden="true">🇬🇧</span></abbr>`)
		.replace(/(GMT|UTC)/g, `<abbr title="Greenwich Mean Time">GMT <span aria-hidden="true">🇬🇧</span></abbr>`)
		.replace(/(GMT|UTC)-3/g, `<abbr title="Atlantic Daylight Time">ADT <span aria-hidden="true">🇨🇦</span></abbr>`)
		.replace(/(GMT|UTC)-4/g, `<abbr title="Atlantic Standard Time">AST <span aria-hidden="true">🇨🇦</span></abbr>`)
};

/**
 * @param {DateTime} value
 * @returns {string}
 */
export const ianaTimezone = (value) => {
	// prettier-ignore
	return formatDatetime(value, "z")
		.replace(/(GMT|UTC)\+8/g, "Asia/Singapore")
		.replace(/(GMT|UTC)\+1/g, "Europe/London")
		.replace(/(GMT|UTC)/g, "Europe/London")
		.replace(/(GMT|UTC)-3/g, "America/Halifax")
		.replace(/(GMT|UTC)-4/g, "America/Halifax")
};

/**
 * @param {string} dateString
 * @param {boolean} [showTimezone]
 * @returns {string}
 */
export const rfc3339Date = (dateString, showTimezone = true) => {
	const format = "yyyy-MM-dd'T'HH:mm:ss" + (showTimezone ? "ZZ" : "");
	return formatDatetime(dateString, format);
};

/**
 * @param {string} dateString
 * @returns {string}
 */
export const w3cDate = (dateString) => {
	return formatDatetime(dateString, "yyyy-MM-dd'T'HH:mm:ssZZ");
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
 * @param {object[]} array
 * @returns {object[]}
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
 * @param {number} [recentDays]
 * @returns {boolean}
 */
export const isRecent = (value, recentDays = limits.recentDays) => {
	const differenceDays = msToDays(nowEpoch - epoch(value));
	return 0 < differenceDays && differenceDays < recentDays;
};

/**
 * @param {object[]} array
 * @param {string} key
 * @param {number} recentDays
 * @returns {object[]}
 */
export const recentFilter = (array, key, recentDays = limits.recentDays) => {
	return array.filter((item) => {
		const keys = key.split(".");
		const value = keys.reduce((o, k) => {
			return o[k];
		}, item);
		return isRecent(value, recentDays);
	});
};

/**
 * @param {object[]} array
 * @returns {object[]}
 */
export const rssOnlyFilter = (array) => {
	return array.filter((item) => {
		if (item.data.tags && item.data.tags.includes("rss-only")) {
			return !isRecent(item.data.date);
		}
		return true;
	});
};

let userLocale = locale;
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
 * @param {Datetime} datetime
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
export const getRSVPValueString = (start, end, value) => {
	const now = Date.now();

	if (value === "yes") {
		if (epoch(start) > now) {
			return `${emojiFuture} <small>attending</small>`;
		}
		if (epoch(start) <= now && now <= epoch(end)) {
			return `${emojiGoing} <small class=" [ currently-attending ] ">currently attending</small>`;
		}
		return `${emojiGoing} <small>attended</small>`;
	}
	if (value === "maybe" || value === "interested") {
		if (epoch(start) > now) {
			return `${emojiHopefully} <small>hoping to attend</small>`;
		}
		return `${emojiHopefully} <small>was hoping to attend</small>`;
	}
	if (epoch(start) > now) {
		return `${emojiNotGoing} <small>unable to attend</small>`;
	}
	return `${emojiNotGoing} <small>was unable to attend</small>`;
};

/**
 * @param {string} start
 * @param {string} end
 * @param {string} value
 * @returns {string}
 */
export const getRSVPValueHTML = (start, end, value) => {
	const now = Date.now();

	if (value === "yes") {
		if (epoch(start) > now) {
			return `<span data-start="${rfc3339Date(start)}" data-end="${rfc3339Date(end)}" data-value="${value}" data-relative-rsvp-value>${getRSVPValueString(start, end, value)}</span>`;
		}
		if (epoch(start) <= now && now <= epoch(end)) {
			return `<span data-start="${rfc3339Date(start)}" data-end="${rfc3339Date(end)}" data-value="${value}" data-relative-rsvp-value>${getRSVPValueString(start, end, value)}</span>`;
		}
		return `<span data-start="${rfc3339Date(start)}" data-end="${rfc3339Date(end)}" data-value="${value}" data-relative-rsvp-value>${getRSVPValueString(start, end, value)}</span>`;
	}
	if (value === "maybe" || value === "interested") {
		if (epoch(start) > now) {
			return `<span data-start="${rfc3339Date(start)}" data-end="${rfc3339Date(end)}" data-value="${value}" data-relative-rsvp-value>${getRSVPValueString(start, end, value)}</span>`;
		}
		return `<span data-start="${rfc3339Date(start)}" data-end="${rfc3339Date(end)}" data-value="${value}" data-relative-rsvp-value>${getRSVPValueString(start, end, value)}</span>`;
	}
	if (epoch(start) > now) {
		return `<span data-start="${rfc3339Date(start)}" data-end="${rfc3339Date(end)}" data-value="${value}" data-relative-rsvp-value>${getRSVPValueString(start, end, value)}</span>`;
	}
	return `<span data-start="${rfc3339Date(start)}" data-end="${rfc3339Date(end)}" data-value="${value}" data-relative-rsvp-value>${getRSVPValueString(start, end, value)}</span>`;
};

/**
 * @param {string} start
 * @param {string} end
 * @param {string} value
 * @returns {string}
 */
export const getRSVPDateString = (end) => {
	if (Date.now() <= epoch(end)) {
		return "taking place";
	}
	return "took place";
};

export default {
	formatDatetime,
	ordinal,
	friendlyDate,
	friendlyDateLong,
	friendlyTime,
	ianaTimezone,
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
	rssOnlyFilter,
	getRelativeTime,
	getRSVPValueString,
	getRSVPValueHTML,
	getRSVPDateString,
};
