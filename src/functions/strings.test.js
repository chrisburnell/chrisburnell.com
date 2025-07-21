import { describe, expect, it } from "vitest";
import strings from "./strings.js";

describe("Functions: Strings", () => {
	it("capitalize() should return a capitalized string", () => {
		expect(strings.capitalize("lorem ipsum")).toBe("Lorem Ipsum");
	});

	it("stripHTML() should return a string with HTML tags stripped", () => {
		expect(strings.stripHTML("<p>lorem ipsum</p>")).toBe("lorem ipsum");
	});

	it("numberNthFormat() should return a sequence-based English variant of a number", () => {
		expect(strings.numberNthFormat(1)).toBe("first");
		expect(strings.numberNthFormat(20)).toBe("twentieth");
		expect(strings.numberNthFormat(21)).toBe("twenty-first");
	});
});
