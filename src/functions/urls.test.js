import { describe, expect, it } from "vitest";
import urls from "./urls.js";

describe("Functions: URLs", () => {
	it("getURLObject() should return a URL object", () => {
		expect(
			urls.getURLObject(`https://chrisburnell.com/about/`).length,
		).toBe(new URL("https://chrisburnell.com/about/").length);
	});

	it("getPathname() should return a URL’s path", () => {
		expect(urls.getPathname(`https://chrisburnell.com/about/`)).toBe(
			"/about/",
		);
	});
});
