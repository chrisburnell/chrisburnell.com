import { describe, expect, it } from "vitest";
import { DateToSexagesimal, DecimalToSexagesimal } from "./NewBase60.js";

describe("Filters: NewBase60", () => {
	it("DecimalToSexagesimal() should return a string representing a decimal number as a sexegesimal number", () => {
		expect(DecimalToSexagesimal(19946)).toBe("5YS");
	});

	it("DecimalToSexagesimal() should return a string representing a decimal number as a sexegesimal number", () => {
		expect(DateToSexagesimal(new Date("2024-08-11T12:00:00Z"))).toBe("5YS");
	});
});
