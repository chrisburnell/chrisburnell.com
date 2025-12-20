import { describe, expect, it } from "vitest";
import { DateToSexagesimal, DecimalToSexagesimal } from "./NewBase60.js";

describe("Filters: NewBase60", () => {
	it("DecimalToSexagesimal() converts a decimal number to a sexagesimal string", () => {
		expect(DecimalToSexagesimal(19946)).toBe("5YS");
	});

	it("DateToSexagesimal() converts a Date to a sexagesimal string", () => {
		expect(DateToSexagesimal(new Date("2024-08-11T12:00:00Z"))).toBe("5YS");
	});
});
