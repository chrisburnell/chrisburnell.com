import assert from "node:assert/strict";
import { describe, it } from "node:test";
import strings from "../../src/eleventy/filters/strings.js";

export default async () => {
	describe("Filters: Strings", () => {
		it("conjunction() should return a string of conjuncted items", () => {
			assert.strictEqual(
				strings.conjunction(["One", "Two", "Three"]),
				"One, Two, and Three",
			);
		});

		it("disjunction() should return a string of disjuncted items", () => {
			assert.strictEqual(
				strings.disjunction(["One", "Two", "Three"]),
				"One, Two, or Three",
			);
		});

		it("supertitle() should return a title-case string with special capitalized terms", () => {
			assert.strictEqual(
				strings.supertitle(`lorem ipsum css`),
				"Lorem Ipsum CSS",
			);
		});

		it("cleanTags() should return a string with certain HTML elements stripped", () => {
			assert.strictEqual(
				strings.cleanTags(`lorem <s>ipsum</s>`),
				"lorem",
			);
		});

		it("cleanTagsForWordcount() should return a string with certain selectors stripped", () => {
			assert.strictEqual(
				strings.cleanTagsForWordcount(
					`lorem <s>ipsum</s> <span data-skip-wordcount>dolor</span>`,
				),
				"lorem",
			);
		});

		it("cleanTagsForRSS() should return a string with certain selectors stripped", () => {
			assert.strictEqual(
				strings.cleanTagsForRSS(
					`lorem <span class="">ipsum</span> <span class="no-rss">dolor</span>`,
				),
				"lorem <span>ipsum</span>",
			);
		});

		it("encodeHTML() should return an HTML-encoded string", () => {
			assert.strictEqual(
				strings.encodeHTML(`<p>Lorem</p>`),
				"&#x3C;p&#x3E;Lorem&#x3C;/p&#x3E;",
			);
		});

		it("encodeHTML() should return an HTML-decoded string", () => {
			assert.strictEqual(
				strings.decodeHTML(`&#x3C;p&#x3E;Lorem&#x3C;/p&#x3E;`),
				"<p>Lorem</p>",
			);
		});

		it("stripImages() should return a string with image-like selectors stripped", () => {
			assert.strictEqual(
				strings.stripImages(`<a><img></a> <p>Lorem</p>`),
				"<p>Lorem</p>",
			);
		});

		it("replaceLineBreaks() should return a string with line breaks replaced by a specified string", () => {
			assert.strictEqual(
				strings.replaceLineBreaks(`Lorem\nipsum`),
				"Lorem ipsum",
			);
			assert.strictEqual(
				strings.replaceLineBreaks(`Lorem\nipsum`, "-"),
				"Lorem-ipsum",
			);
		});

		it("removeStrikethrough() should return a string with strikethrough elements stripped", () => {
			assert.strictEqual(
				strings.removeStrikethrough(`Lorem <s>ipsum</s>`),
				"Lorem",
			);
		});

		it("removeTrailingSlash() should return a string with any trailing slash stripped", () => {
			assert.strictEqual(
				strings.removeTrailingSlash(`https://chrisburnell.com/`),
				"https://chrisburnell.com",
			);
		});

		it("maxWords() should return a string stripped to a specified number of words", () => {
			assert.strictEqual(
				strings.maxWords(`Lorem ipsum dolor`, 2),
				"Lorem ipsum...",
			);
		});

		it("maxChars() should return a string stripped to a specified number of characters", () => {
			assert.strictEqual(strings.maxChars(`Lorem`, 4), "Lore...");
		});

		it("numberStringFormat() should return a string with an English-formatted variant of a specified number", () => {
			assert.strictEqual(strings.numberStringFormat(3), "three");
			assert.strictEqual(strings.numberStringFormat(1000), "1,000");
		});

		it("markdownFormat() should return a string of HTML parsed as Markdown", () => {
			assert.strictEqual(
				strings.markdownFormat(`**Lorem**`),
				"<p><strong>Lorem</strong></p>\n",
			);
		});

		it("excerptize() should return a string with specified selectors stripped and/or modified", () => {
			assert.strictEqual(
				strings.excerptize(`<p>Lorem</p><p>ipsum</p>`),
				"Lorem<br>ipsum",
			);
		});
	});
};
