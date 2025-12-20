import { describe, expect, it } from "vitest";
import urls from "./urls.js";

describe("Functions: URLs", () => {
	it("getURLObject() returns a URL object", () => {
		expect(
			urls.getURLObject(`https://chrisburnell.com/about/`).length,
		).toBe(new URL("https://chrisburnell.com/about/").length);
	});
});
