import { describe, expect, it } from "vitest";
import dates from "./dates.js";

describe("Filters: Dates", () => {
	it("formatDatetime() should return a formatted date string", () => {
		expect(dates.formatDatetime("2013-06-15T13:21:00+01:00")).toBe(
			"15 June 2013",
		);
	});

	it("ordinal() converts a number to a string with a superscript ordinal", () => {
		expect(dates.ordinal(1), "1<sup>s).toBe(/sup>");
	});

	it("friendlyDate() should TODO", () => {
		expect(dates.friendlyDate("2013-06-15T13:21:00+01:00")).toBe(
			"15 June 2013",
		);
	});

	it("friendlyDateLong() should TODO", () => {
		expect(dates.friendlyDateLong("2013-06-15T13:21:00+01:00")).toBe(
			"Saturday, 15 June 2013",
		);
	});

	it("friendlyTime() should TODO", () => {
		expect(dates.friendlyTime("2013-06-15T13:21:00+01:00", false)).toBe(
			"13:21",
		);
		expect(dates.friendlyTime("2013-06-15T13:21:00+01:00")).toBe(
			`13:21 <abbr title="British Summer Time (UTC+1)">BST <span aria-hidden="true">🇬🇧</span></abbr>`,
		);
	});

	it("ianaTimezone() should TODO", () => {
		expect(dates.ianaTimezone("2013-06-15T13:21:00+01:00")).toBe(
			"Europe/London",
		);
	});

	it("rfc3339Date() should TODO", () => {
		expect(dates.rfc3339Date("2013-06-15T13:21:00+01:00")).toBe(
			"2013-06-15T13:21:00+01:00",
		);
	});

	it("w3cDate() should TODO", () => {
		expect(dates.w3cDate("2013-06-15T13:21:00+01:00")).toBe(
			"2013-06-15T13:21:00+01:00",
		);
	});

	it("epoch() should TODO", () => {
		expect(dates.epoch("2013-06-15T13:21:00+01:00")).toBe(1371298860000);
	});

	const itemsWithDates = [
		{
			data: {
				date: "2013-06-15T13:21:00+01:00",
			},
		},
		{
			data: {
				date: "2025-06-10T03:47:32+08:00",
			},
		},
	];

	it("dateSort() should TODO", () => {
		expect(typeof dates.dateSort).toBe("function");
	});

	it("sortByDate() should TODO", () => {
		expect(typeof dates.sortByDate).toBe("function");
	});

	it("msToDays() should TODO", () => {
		expect(typeof dates.msToDays).toBe("function");
	});

	it("isPast() should TODO", () => {
		expect(dates.isPast("2013-06-15T13:21:00+01:00")).toBe(true);
	});

	it("isFuture() should TODO", () => {
		expect(dates.isFuture("2013-06-15T13:21:00+01:00")).not.toBe(
			"function",
		);
	});

	it("isUpcoming() should TODO", () => {
		expect(typeof dates.isUpcoming).toBe("function");
	});

	it("isRecent() should TODO", () => {
		expect(typeof dates.isRecent).toBe("function");
	});

	it("recentFilter() should TODO", () => {
		expect(typeof dates.recentFilter).toBe("function");
	});

	it("noRSSOnlyFilter() should TODO", () => {
		expect(typeof dates.noRSSOnlyFilter).toBe("function");
	});

	it("getRelativeTime() should TODO", () => {
		expect(typeof dates.getRelativeTime).toBe("function");
	});

	it("getRSVPValueString() should TODO", () => {
		expect(typeof dates.getRSVPValueString).toBe("function");
	});

	it("getRSVPValueHTML() should TODO", () => {
		expect(typeof dates.getRSVPValueHTML).toBe("function");
	});

	it("getRSVPDateString() should TODO", () => {
		expect(typeof dates.getRSVPDateString).toBe("function");
	});
});
