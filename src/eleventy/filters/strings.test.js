import { describe, expect, it } from "vitest";
import strings from "./strings.js";

describe("Filters: Strings", () => {
	it("conjunction() should return a string of conjuncted items", () => {
		expect(strings.conjunction(["One", "Two", "Three"])).toBe(
			"One, Two, and Three",
		);
	});

	it("disjunction() should return a string of disjuncted items", () => {
		expect(strings.disjunction(["One", "Two", "Three"])).toBe(
			"One, Two, or Three",
		);
	});

	it("supertitle() should return a title-case string with special capitalized terms", () => {
		expect(strings.supertitle(`lorem ipsum css`)).toBe("Lorem Ipsum CSS");
	});

	it("cleanTags() should return a string with certain HTML elements stripped", () => {
		expect(strings.cleanTags(`lorem <s>ipsum</s>`)).toBe("lorem");
	});

	it("cleanTagsForWordcount() should return a string with certain selectors stripped", () => {
		expect(
			strings.cleanTagsForWordcount(
				`lorem <s>ipsum</s> <span data-skip-wordcount>dolor</span>`,
			),
		).toBe("lorem");
	});

	it("cleanTagsForRSS() should return a string with certain selectors stripped", () => {
		expect(
			strings.cleanTagsForRSS(
				`lorem <span class="">ipsum</span> <span class="no-rss">dolor</span>`,
			),
		).toBe("lorem <span>ipsum</span>");
	});

	it("encodeHTML() should return an HTML-encoded string", () => {
		expect(strings.encodeHTML(`<p>Lorem</p>`)).toBe(
			"&#x3C;p&#x3E;Lorem&#x3C;/p&#x3E;",
		);
	});

	it("encodeHTML() should return an HTML-decoded string", () => {
		expect(strings.decodeHTML(`&#x3C;p&#x3E;Lorem&#x3C;/p&#x3E;`)).toBe(
			"<p>Lorem</p>",
		);
	});

	it("stripImages() should return a string with image-like selectors stripped", () => {
		expect(strings.stripImages(`<a><img></a> <p>Lorem</p>`)).toBe(
			"<p>Lorem</p>",
		);
	});

	it("replaceLineBreaks() should return a string with line breaks replaced by a specified string", () => {
		expect(strings.replaceLineBreaks(`Lorem\nipsum`)).toBe("Lorem ipsum");
		expect(strings.replaceLineBreaks(`Lorem\nipsum`, "-")).toBe(
			"Lorem-ipsum",
		);
	});

	it("removeStrikethrough() should return a string with strikethrough elements stripped", () => {
		expect(strings.removeStrikethrough(`Lorem <s>ipsum</s>`)).toBe("Lorem");
	});

	it("removeTrailingSlash() should return a string with any trailing slash stripped", () => {
		expect(strings.removeTrailingSlash(`https://chrisburnell.com/`)).toBe(
			"https://chrisburnell.com",
		);
	});

	it("maxWords() should return a string stripped to a specified number of words", () => {
		expect(strings.maxWords(`Lorem ipsum dolor`, 2)).toBe("Lorem ipsum...");
	});

	it("maxChars() should return a string stripped to a specified number of characters", () => {
		expect(strings.maxChars(`Lorem`, 4)).toBe("Lore...");
	});

	it("numberStringFormat() should return a string with an English-formatted variant of a specified number", () => {
		expect(strings.numberStringFormat(3)).toBe("three");
		expect(strings.numberStringFormat(1000)).toBe("1,000");
	});

	it("markdownFormat() should return a string of HTML parsed as Markdown", () => {
		expect(strings.markdownFormat(`**Lorem**`)).toBe(
			"<p><strong>Lorem</strong></p>\n",
		);
	});

	it("excerptize() should return a string with specified selectors stripped and/or modified", () => {
		expect(strings.excerptize(`<p>Lorem</p><p>ipsum</p>`)).toBe(
			"Lorem<br>ipsum",
		);
	});
});
