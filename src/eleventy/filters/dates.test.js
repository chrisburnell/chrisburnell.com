import { describe, expect, it } from "vitest";
import dates from "./dates.js";

describe("Filters: Dates", () => {
	///
	// TODO
	///

	it("formatDatetime() should TODO", () => {
		expect(typeof dates.formatDatetime).toBe("function");
	});

	it("ordinal() converts a number to a string with a superscript ordinal", () => {
		expect(dates.ordinal(1), "1<sup>s).toBe(/sup>");
	});

	it("friendlyDate() should TODO", () => {
		expect(typeof dates.friendlyDate).toBe("function");
	});

	it("friendlyDateLong() should TODO", () => {
		expect(typeof dates.friendlyDateLong).toBe("function");
	});

	it("friendlyTime() should TODO", () => {
		expect(typeof dates.friendlyTime).toBe("function");
	});

	it("ianaTimezone() should TODO", () => {
		expect(typeof dates.ianaTimezone).toBe("function");
	});

	it("rfc3339Date() should TODO", () => {
		expect(typeof dates.rfc3339Date).toBe("function");
	});

	it("w3cDate() should TODO", () => {
		expect(typeof dates.w3cDate).toBe("function");
	});

	it("epoch() should TODO", () => {
		expect(typeof dates.epoch).toBe("function");
	});

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
		expect(typeof dates.isPast).toBe("function");
	});

	it("isFuture() should TODO", () => {
		expect(typeof dates.isFuture).toBe("function");
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

	it("rssOnlyFilter() should TODO", () => {
		expect(typeof dates.rssOnlyFilter).toBe("function");
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
