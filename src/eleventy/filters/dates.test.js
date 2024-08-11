import assert from "node:assert/strict";
import { describe, it } from "node:test";
import dates from "./dates.js";

export default async () => {
	describe("Filters: Dates", () => {
		///
		// TODO
		///

		it("formatDatetime() should TODO", () => {
			assert.strictEqual(typeof dates.formatDatetime, "function");
		});

		it("ordinal() converts a number to a string with a superscript ordinal", () => {
			assert.strictEqual(dates.ordinal(1), "1<sup>st</sup>");
		});

		it("friendlyDate() should TODO", () => {
			assert.strictEqual(typeof dates.friendlyDate, "function");
		});

		it("friendlyDateLong() should TODO", () => {
			assert.strictEqual(typeof dates.friendlyDateLong, "function");
		});

		it("friendlyTime() should TODO", () => {
			assert.strictEqual(typeof dates.friendlyTime, "function");
		});

		it("ianaTimezone() should TODO", () => {
			assert.strictEqual(typeof dates.ianaTimezone, "function");
		});

		it("rfc3339Date() should TODO", () => {
			assert.strictEqual(typeof dates.rfc3339Date, "function");
		});

		it("w3cDate() should TODO", () => {
			assert.strictEqual(typeof dates.w3cDate, "function");
		});

		it("epoch() should TODO", () => {
			assert.strictEqual(typeof dates.epoch, "function");
		});

		it("dateSort() should TODO", () => {
			assert.strictEqual(typeof dates.dateSort, "function");
		});

		it("sortByDate() should TODO", () => {
			assert.strictEqual(typeof dates.sortByDate, "function");
		});

		it("msToDays() should TODO", () => {
			assert.strictEqual(typeof dates.msToDays, "function");
		});

		it("isPast() should TODO", () => {
			assert.strictEqual(typeof dates.isPast, "function");
		});

		it("isFuture() should TODO", () => {
			assert.strictEqual(typeof dates.isFuture, "function");
		});

		it("isUpcoming() should TODO", () => {
			assert.strictEqual(typeof dates.isUpcoming, "function");
		});

		it("isRecent() should TODO", () => {
			assert.strictEqual(typeof dates.isRecent, "function");
		});

		it("recentFilter() should TODO", () => {
			assert.strictEqual(typeof dates.recentFilter, "function");
		});

		it("rssOnlyFilter() should TODO", () => {
			assert.strictEqual(typeof dates.rssOnlyFilter, "function");
		});

		it("getRelativeTime() should TODO", () => {
			assert.strictEqual(typeof dates.getRelativeTime, "function");
		});

		it("getRSVPValueString() should TODO", () => {
			assert.strictEqual(typeof dates.getRSVPValueString, "function");
		});

		it("getRSVPValueHTML() should TODO", () => {
			assert.strictEqual(typeof dates.getRSVPValueHTML, "function");
		});

		it("getRSVPDateString() should TODO", () => {
			assert.strictEqual(typeof dates.getRSVPDateString, "function");
		});
	});
};
