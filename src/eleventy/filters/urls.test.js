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

	it("getPathname() returns a URL's pathname", () => {
		expect(urls.getPathname(`https://chrisburnell.com/about/`)).toBe(
			"/about/",
		);
		expect(urls.getPathname(`http://www.example.org:8080/path/`)).toBe(
			"/path/",
		);
	});

	it("getHost() returns a URL's hostname", () => {
		expect(urls.getHost(`https://chrisburnell.com/about/`)).toBe(
			"chrisburnell.com",
		);
		expect(urls.getHost(`http://www.example.org:8080/path/`)).toBe(
			"www.example.org",
		);
	});

	it("getOrigin() returns a URL's origin", () => {
		expect(urls.getOrigin(`https://chrisburnell.com/about/`)).toBe(
			"https://chrisburnell.com",
		);
		expect(urls.getOrigin(`http://www.example.org:8080/path/`)).toBe(
			"http://www.example.org:8080",
		);
	});

	it("getProtocol() returns a URL's protocol", () => {
		expect(urls.getProtocol(`https://chrisburnell.com/about/`)).toBe(
			"https:",
		);
		expect(urls.getProtocol(`http://example.org:8080/path/`)).toBe("http:");
	});
});
