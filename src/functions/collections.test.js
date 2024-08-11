import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { nowEpoch } from "../eleventy/data/global.js";
import collections from "./collections.js";

export default async () => {
	describe("Functions: Collections", () => {
		it("isPublished() should return a boolean", () => {
			assert.strictEqual(collections.isPublished({}), false);
			assert.strictEqual(
				collections.isPublished({
					url: "/example",
				}),
				true,
			);
			assert.strictEqual(
				collections.isPublished({
					url: "/example",
					data: {
						draft: true,
					},
				}),
				false,
			);
			assert.strictEqual(
				collections.isPublished({
					url: "/example",
					data: {
						published: false,
					},
				}),
				false,
			);
			assert.strictEqual(
				collections.isPublished({
					url: "/example",
					data: {
						tags: ["ignore"],
					},
				}),
				false,
			);
			assert.strictEqual(
				collections.isPublished({
					url: "/example",
					data: {
						date: new Date(nowEpoch + 1).toISOString(),
					},
				}),
				false,
			);
		});

		it("notReply() should return a boolean based on reply data", () => {
			assert.strictEqual(collections.notReply({}), true);
			assert.strictEqual(
				collections.notReply({
					data: {
						in_reply_to: "https://chrisburnell.com",
					},
				}),
				true,
			);
			assert.strictEqual(
				collections.notReply({
					data: {
						in_reply_to: "https://example.com",
					},
				}),
				false,
			);
		});

		it("getPropertyData() should return *_of data", () => {
			assert.notStrictEqual(
				collections.getPropertyData({
					bookmark_of: {},
				}),
				null,
			);
			assert.strictEqual(collections.getPropertyData({}), null);
		});

		it("getPropertyTitle() should return a *_of title", () => {
			assert.strictEqual(
				collections.getPropertyTitle({
					bookmark_of: {
						title: "Title",
					},
				}),
				"Title",
			);
			assert.strictEqual(
				collections.getPropertyTitle({
					bookmark_of: {},
				}),
				null,
			);
		});

		it("getPropertyURL() should return a *_of URL or data object", () => {
			assert.strictEqual(
				collections.getPropertyURL({
					bookmark_of: {
						url: "https://example.com",
					},
				}),
				"https://example.com",
			);
			const data = {
				title: "Title",
			};
			assert.strictEqual(
				collections.getPropertyURL({
					bookmark_of: data,
				}),
				data,
			);
		});

		it("getAuthors() should return an array of authors", () => {
			const data = ["Author A", "Author B"];
			assert.strictEqual(
				collections.getAuthors({
					authors: data,
				}),
				data,
			);
		});

		it("getAuthorData() should return an author data object", () => {
			assert.strictEqual(
				collections.getAuthorData({
					title: "Author A",
					url: "https://example.com",
				}).title,
				"Author A",
			);
			assert.strictEqual(
				collections.getAuthorData({
					title: "Author A",
					url: "https://example.com",
				}).url,
				"https://example.com",
			);
		});

		it("getAuthorsString() should return a string of comma-delimited author titles and URLs", () => {
			assert.strictEqual(
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
				`<a href="https://example.com/a/" class=" [ h-cite ] " rel="external noopener">Author A</a>, <strong class=" [ h-cite ] ">Author B</strong>, and <strong class=" [ h-cite ] ">Author C</strong>`,
			);
		});

		it("getReplyTitle() should return an in_reply_to title", () => {
			assert.strictEqual(
				collections.getReplyTitle({
					in_reply_to: {
						title: "Example",
					},
				}),
				"Example",
			);
		});

		it("getReplyURL() should return an in_reply_to URL", () => {
			assert.strictEqual(
				collections.getReplyTitle({
					in_reply_to: {
						url: "https://example.com",
					},
				}),
				"https://example.com",
			);
		});

		it("getReplyAuthor() should return an in_reply_to author data object", () => {
			assert.strictEqual(
				collections.getReplyAuthor({
					in_reply_to: "https://flamedfury.com",
				}).title,
				"fLaMEd",
			);
		});

		it("getReplyAuthorString() should return a formatted string based on reply author data", () => {
			assert.strictEqual(
				collections.getReplyAuthorString({
					in_reply_to: "https://flamedfury.com",
				}),
				`<a href="https://flamedfury.com" class=" [ h-cite ] " rel="external noopener">fLaMEd</a>`,
			);
		});

		it("getRSVPString() should return", () => {
			assert.strictEqual(
				collections.getRSVPString({
					rsvp: {
						value: "yes",
						date: "2024-05-09T23:00:00+0800",
						end: "2024-05-10T05:00:00+0800",
					},
				}),
				`<span data-start="2024-05-09T23:00:00+08:00" data-end="2024-05-10T05:00:00+08:00" data-value="yes" data-relative-rsvp-value><span class=" [ emoji ] " aria-hidden="true">✅</span> <small>attended</small></span>`,
			);
		});

		it("getMetaTitle() should return a string based on property data", () => {
			assert.strictEqual(
				collections.getMetaTitle({
					title: "Example",
				}),
				"Example",
			);
			assert.strictEqual(
				collections.getMetaTitle({
					rsvp: {},
					in_reply_to: {
						title: "Example",
					},
				}),
				"RSVP to Example",
			);
			assert.strictEqual(
				collections.getMetaTitle({
					rsvp: {},
					in_reply_to: {
						url: "https://example.com",
					},
				}),
				"RSVP to https://example.com",
			);
			assert.strictEqual(
				collections.getMetaTitle({
					in_reply_to: {
						title: "Example",
					},
				}),
				"Reply to Example",
			);
			assert.strictEqual(
				collections.getMetaTitle({
					in_reply_to: {
						url: "https://example.com",
					},
				}),
				"Reply to https://example.com",
			);
			assert.strictEqual(
				collections.getMetaTitle({
					category: "bookmark",
					date: "2024-05-09T23:00:00+0800",
					bookmark_of: {
						title: "Example",
					},
				}),
				"Bookmark: Example",
			);
			assert.strictEqual(
				collections.getMetaTitle({
					category: "bookmark",
					date: "2024-05-09T23:00:00+0800",
					bookmark_of: "https://example.com",
				}),
				"Bookmark: https://example.com",
			);
			assert.strictEqual(
				collections.getMetaTitle({
					category: "article",
					date: "2024-05-09T23:00:00+0800",
				}),
				"Article from 9 May 2024",
			);
			assert.strictEqual(
				collections.getMetaTitle({}),
				"A page on chrisburnell.com",
			);
		});

		it("getMetaImage() should return a string containing the meta image URL for a page", () => {
			assert.strictEqual(
				collections.getMetaImage({
					og_image: "/example.jpg",
				}),
				"https://chrisburnell.com/example.jpg",
			);
			assert.strictEqual(
				collections.getMetaImage({}),
				"https://chrisburnell.com/images/favicon-256.png",
			);
		});
	});
};
