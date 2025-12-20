import { describe, expect, it } from "vitest";
import urls from "./urls.js";

describe("Functions: URLs", () => {
	it("getURLObject() returns a URL object", () => {
		expect(
			urls.getURLObject(`https://chrisburnell.com/about/`).length,
		).toBe(new URL("https://chrisburnell.com/about/").length);
	});

	it("getPathname() returns a URL's pathname", () => {
		expect(urls.getPathname(`https://chrisburnell.com/about/`)).toBe(
			"/about/",
		);
	});
});
