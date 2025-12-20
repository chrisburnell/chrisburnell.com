import { describe, expect, it } from "vitest";
import urls from "./urls.js";

describe("Filters: URLs", () => {
	it("tweetback() returns the Twitter Archive version of a Twitter status URL", () => {
		expect(
			urls.tweetback(
				`https://twitter.com/iamchrisburnell/status/345878691110334466`,
			),
		).toBe("https://twitter.chrisburnell.com/345878691110334466");
	});

	it("getHost() returns a URL's hostname", () => {
		expect(urls.getHost(`https://chrisburnell.com/`)).toBe(
			"chrisburnell.com",
		);
	});

	it("getOrigin() returns a URL's origin", () => {
		expect(urls.getOrigin(`https://chrisburnell.com/`)).toBe(
			"https://chrisburnell.com",
		);
	});

	it("getProtocol() returns a URL's protocol", () => {
		expect(urls.getProtocol(`https://chrisburnell.com/`)).toBe("https:");
	});
});
