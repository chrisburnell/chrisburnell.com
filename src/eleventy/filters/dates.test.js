import { describe, expect, it } from "vitest";
import dates from "./dates.js";

const oneDay = 1000 * 60 * 60 * 24;

const past = "2013-06-15T13:21:00+0100";
const future = "9001-06-15T13:21:56+0100";
const yesterday = new Date(Date.now() - oneDay);
const tomorrow = new Date(Date.now() + oneDay);
const farPast = new Date(Date.now() - oneDay * 365);
const farFuture = new Date(Date.now() + oneDay * 365);

describe("Filters: Dates", () => {
	it("formatDatetime() returns a formatted date string", () => {
		expect(dates.formatDatetime(past)).toBe("15 June 2013");
	});

	it("ordinal() converts a number to a string with a superscript ordinal", () => {
		expect(dates.ordinal(1)).toBe("1<sup>st</sup>");
	});

	it("friendlyDate() returns a friendly formatted date string", () => {
		expect(dates.friendlyDate(past)).toBe("15 June 2013");
	});

	it("friendlyDateLong() returns a long friendly formatted date string", () => {
		expect(dates.friendlyDateLong(past)).toBe("Saturday, 15 June 2013");
	});

	it("friendlyTime() returns a friendly formatted time string", () => {
		expect(dates.friendlyTime(past, false)).toBe("13:21");
		expect(dates.friendlyTime(past)).toBe(
			`13:21 <abbr title="British Summer Time (UTC+1)">BST <span aria-hidden="true">🇬🇧</span></abbr>`,
		);
	});

	it("ianaTimezone() returns an IANA timezone identifier", () => {
		expect(dates.ianaTimezone(past)).toBe("Europe/London");
	});

	it("rfc3339Date() returns an RFC 3339 formatted date string", () => {
		expect(dates.rfc3339Date(past)).toBe("2013-06-15T13:21:00+01:00");
	});

	it("w3cDate() returns a W3C formatted date string", () => {
		expect(dates.w3cDate(past)).toBe("2013-06-15T13:21:00+01:00");
	});

	it("epoch() returns the Unix epoch timestamp in milliseconds", () => {
		expect(dates.epoch(past)).toBe(1371298860000);
	});

	const itemsWithDates = [
		{
			data: {
				date: past,
			},
		},
		{
			data: {
				date: future,
			},
		},
	];

	it("dateSort() sorts items by date in descending order", () => {
		const sorted = itemsWithDates.slice().sort(dates.dateSort);
		expect(new Date(sorted[0].data.date).getTime()).toBeGreaterThan(
			new Date(sorted[1].data.date).getTime(),
		);
	});

	it("sortByDate() returns an array sorted by date in descending order", () => {
		const sorted = dates.sortByDate(itemsWithDates.slice());
		expect(new Date(sorted[0].data.date).getTime()).toBeGreaterThan(
			new Date(sorted[1].data.date).getTime(),
		);
	});

	it("msToDays() converts milliseconds to days", () => {
		expect(dates.msToDays(oneDay)).toBe(1);
		expect(dates.msToDays(oneDay * 2)).toBe(2);
	});

	it("isPast() returns true for dates in the past", () => {
		expect(dates.isPast(past)).toBe(true);
		expect(dates.isPast(future)).toBe(false);
	});

	it("isFuture() returns true for dates in the future", () => {
		expect(dates.isFuture(past)).toBe(false);
		expect(dates.isFuture(future)).toBe(true);
	});

	it("isUpcoming() returns true for dates within the upcoming period", () => {
		expect(dates.isUpcoming(tomorrow.toISOString(), 7)).toBe(true);
		expect(dates.isUpcoming(farFuture.toISOString(), 7)).toBe(false);
	});

	it("isRecent() returns true for dates within the recent period", () => {
		expect(dates.isRecent(yesterday.toISOString(), 7)).toBe(true);
		expect(dates.isRecent(farPast.toISOString(), 7)).toBe(false);
	});

	it("recentFilter() filters items by recent dates", () => {
		const items = [
			{
				data: {
					date: yesterday.toISOString(),
				},
			},
			{
				data: {
					date: farPast,
				},
			},
		];
		expect(dates.recentFilter(items, "data.date", 7).length).toBe(1);
	});

	it("noRSSOnlyFilter() filters out recent rss-only items", () => {
		const items = [
			{
				data: {
					date: yesterday.toISOString(),
					tags: ["rss-only"],
				},
			},
			{
				data: {
					date: past,
					tags: ["rss-only"],
				},
			},
		];
		expect(dates.noRSSOnlyFilter(items, 7).length).toBe(1);
	});

	it("getRelativeTime() returns a relative time string", () => {
		const result = dates.getRelativeTime(tomorrow);
		expect(typeof result).toBe("string");
		expect(result).toMatch(/day|hour/);
	});

	it("getRSVPValueString() returns an appropriate RSVP string based on time and value", () => {
		expect(dates.getRSVPValueString(past, past, "yes")).toContain(
			"attended",
		);
		expect(dates.getRSVPValueString(future, future, "yes")).toContain(
			"attending",
		);
		expect(dates.getRSVPValueString(future, future, "maybe")).toContain(
			"hoping",
		);
		expect(dates.getRSVPValueString(future, future, "no")).toContain(
			"unable",
		);
	});

	it("getRSVPValueHTML() returns HTML with RSVP data attributes", () => {
		const result = dates.getRSVPValueHTML(past, past, "yes");
		expect(result).toContain("data-start");
		expect(result).toContain("data-end");
		expect(result).toContain("data-value");
		expect(result).toContain("attended");
	});

	it("getRSVPDateString() returns an appropriate string based on event status", () => {
		expect(dates.getRSVPDateString(past)).toBe("took place");
		expect(dates.getRSVPDateString(future)).toBe("taking place");
	});
});
