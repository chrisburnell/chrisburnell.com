import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { DateToSexagesimal, DecimalToSexagesimal } from "./NewBase60.js";

export default async () => {
	describe("Filters: NewBase60", () => {
		it("DecimalToSexagesimal() should return a string representing a decimal number as a sexegesimal number", () => {
			assert.strictEqual(DecimalToSexagesimal(19946), "5YS");
		});

		it("DecimalToSexagesimal() should return a string representing a decimal number as a sexegesimal number", () => {
			assert.strictEqual(
				DateToSexagesimal(new Date("2024-08-11T12:00:00Z")),
				"5YS",
			);
		});
	});
};
