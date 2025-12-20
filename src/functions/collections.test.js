import { describe, expect, it } from "vitest";
import { nowEpoch } from "../eleventy/data/global.js";
import collections from "./collections.js";

describe("Functions: Collections", () => {
	it("isPublished() returns a boolean indicating if an item is published", () => {
		expect(collections.isPublished({})).toBe(false);
		expect(
			collections.isPublished({
				url: "/example",
			}),
		).toBe(true);
		expect(
			collections.isPublished({
				url: "/example",
				data: {
					draft: true,
				},
			}),
		).toBe(false);
		expect(
			collections.isPublished({
				url: "/example",
				data: {
					published: false,
				},
			}),
		).toBe(false);
		expect(
			collections.isPublished({
				url: "/example",
				data: {
					tags: ["ignore"],
				},
			}),
		).toBe(false);
		expect(
			collections.isPublished({
				url: "/example",
				data: {
					date: new Date(nowEpoch + 1).toISOString(),
				},
			}),
		).toBe(false);
	});

	it("notReply() returns a boolean based on reply data", () => {
		expect(collections.notReply({})).toBe(true);
		expect(
			collections.notReply({
				data: {
					in_reply_to: "https://chrisburnell.com",
				},
			}),
		).toBe(true);
		expect(
			collections.notReply({
				data: {
					in_reply_to: "https://example.com",
				},
			}),
		).toBe(false);
	});

	it("getPropertyData() returns *_of data", () => {
		expect(
			collections.getPropertyData({
				bookmark_of: {},
			}),
		).not.toBe(null);
		expect(collections.getPropertyData({})).toBe(null);
	});

	it("getPropertyTitle() returns a *_of title", () => {
		expect(
			collections.getPropertyTitle({
				bookmark_of: {
					title: "Title",
				},
			}),
		).toBe("Title");
		expect(
			collections.getPropertyTitle({
				bookmark_of: {},
			}),
		).toBe(null);
	});

	it("getPropertyURL() returns a *_of URL or data object", () => {
		expect(
			collections.getPropertyURL({
				bookmark_of: {
					url: "https://example.com",
				},
			}),
		).toBe("https://example.com");
		const data = {
			title: "Title",
		};
		expect(
			collections.getPropertyURL({
				bookmark_of: data,
			}),
		).toBe(data);
	});

	it("getAuthors() returns an array of authors", () => {
		const data = ["Author A", "Author B"];
		expect(
			collections.getAuthors({
				authors: data,
			}),
		).toBe(data);
	});

	it("getAuthorData() returns an author data object", () => {
		expect(
			collections.getAuthorData({
				title: "Author A",
				url: "https://example.com",
			}).title,
		).toBe("Author A");
		expect(
			collections.getAuthorData({
				title: "Author A",
				url: "https://example.com",
			}).url,
		).toBe("https://example.com");
	});

	it("getAuthorsString() returns a comma-delimited string of author titles and URLs", () => {
		expect(
			collections.getAuthorsString({
				authors: [
					{
						title: "Author A",
						url: "https://example.com/a/",
					},
					{
						title: "Author B",
					},
					{
						title: "Author C",
					},
				],
			}),
		).toBe(
			`<a href="https://example.com/a/" class=" [ h-cite ] " rel="external noopener">Author A</a>, <strong class=" [ h-cite ] ">Author B</strong>, and <strong class=" [ h-cite ] ">Author C</strong>`,
		);
	});

	it("getReplyTitle() returns an in_reply_to title", () => {
		expect(
			collections.getReplyTitle({
				in_reply_to: {
					title: "Example",
				},
			}),
		).toBe("Example");
	});

	it("getReplyURL() returns an in_reply_to URL", () => {
		expect(
			collections.getReplyTitle({
				in_reply_to: {
					url: "https://example.com",
				},
			}),
		).toBe("https://example.com");
	});

	it("getReplyAuthor() returns an in_reply_to author data object", () => {
		expect(
			collections.getReplyAuthor({
				in_reply_to: "https://flamedfury.com",
			}).title,
		).toBe("fLaMEd");
	});

	it("getReplyAuthorString() returns a formatted string based on reply author data", () => {
		expect(
			collections.getReplyAuthorString({
				in_reply_to: "https://flamedfury.com",
			}),
		).toBe(
			`<a href="https://flamedfury.com" class=" [ h-cite ] " rel="external noopener">fLaMEd</a>`,
		);
	});

	it("getRSVPString() returns an RSVP string with data attributes", () => {
		expect(
			collections.getRSVPString({
				rsvp: {
					value: "yes",
					date: "2024-05-09T23:00:00+0800",
					end: "2024-05-10T05:00:00+0800",
				},
			}),
		).toBe(
			`<span data-start="2024-05-09T23:00:00+08:00" data-end="2024-05-10T05:00:00+08:00" data-value="yes" data-relative-rsvp-value><span class=" [ emoji ] " aria-hidden="true">✅</span> <small>attended</small></span>`,
		);
	});

	it("getMetaTitle() returns a meta title string based on property data", () => {
		expect(
			collections.getMetaTitle({
				title: "Example",
			}),
		).toBe("Example");
		expect(
			collections.getMetaTitle({
				rsvp: {},
				in_reply_to: {
					title: "Example",
				},
			}),
		).toBe("RSVP to Example");
		expect(
			collections.getMetaTitle({
				rsvp: {},
				in_reply_to: {
					url: "https://example.com",
				},
			}),
		).toBe("RSVP to https://example.com");
		expect(
			collections.getMetaTitle({
				in_reply_to: {
					title: "Example",
				},
			}),
		).toBe("Reply to Example");
		expect(
			collections.getMetaTitle({
				in_reply_to: {
					url: "https://example.com",
				},
			}),
		).toBe("Reply to https://example.com");
		expect(
			collections.getMetaTitle({
				category: "bookmark",
				date: "2024-05-09T23:00:00+0800",
				bookmark_of: {
					title: "Example",
				},
			}),
		).toBe("Bookmark: Example");
		expect(
			collections.getMetaTitle({
				category: "bookmark",
				date: "2024-05-09T23:00:00+0800",
				bookmark_of: "https://example.com",
			}),
		).toBe("Bookmark: https://example.com");
		expect(
			collections.getMetaTitle({
				category: "article",
				date: "2024-05-09T23:00:00+0800",
			}),
		).toBe("Article from 9 May 2024");
		expect(collections.getMetaTitle({})).toBe("A page on chrisburnell.com");
	});

	it("getMetaImage() returns the meta image URL for a page", () => {
		expect(
			collections.getMetaImage({
				og_image: "/example.jpeg",
			}),
		).toBe("https://chrisburnell.com/example.jpeg");
		expect(collections.getMetaImage({})).toBe(
			"https://chrisburnell.com/images/favicon-256.png",
		);
	});
});
