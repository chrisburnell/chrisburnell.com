import assert from "node:assert";
import test from "node:test";
import strings from "../../src/eleventy/filters/strings.js";

export default async () => {
	test("Filters: Strings", () => {
		assert.strictEqual(
			strings.conjunction(["One", "Two", "Three"]),
			"One, Two, and Three",
		);

		assert.strictEqual(
			strings.disjunction(["One", "Two", "Three"]),
			"One, Two, or Three",
		);

		assert.strictEqual(
			strings.supertitle(`lorem ipsum css`),
			"Lorem Ipsum CSS",
		);

		assert.strictEqual(strings.cleanTags(`lorem <s>ipsum</s>`), "lorem");

		assert.strictEqual(
			strings.cleanTagsForWordcount(
				`lorem <s>ipsum</s> <span data-skip-wordcount>dolor</span>`,
			),
			"lorem",
		);

		assert.strictEqual(
			strings.cleanTagsForRSS(
				`lorem <span class="">ipsum</span> <span class="no-rss">dolor</span>`,
			),
			"lorem <span>ipsum</span>",
		);

		assert.strictEqual(
			strings.encodeHTML(`<p>Lorem</p>`),
			"&#x3C;p&#x3E;Lorem&#x3C;/p&#x3E;",
		);

		assert.strictEqual(
			strings.decodeHTML(`&#x3C;p&#x3E;Lorem&#x3C;/p&#x3E;`),
			"<p>Lorem</p>",
		);

		assert.strictEqual(
			strings.stripImages(`<a><img></a> <p>Lorem</p>`),
			"<p>Lorem</p>",
		);

		assert.strictEqual(
			strings.replaceLineBreaks(`Lorem\nipsum`),
			"Lorem ipsum",
		);

		assert.strictEqual(
			strings.removeStrikethrough(`Lorem <s>ipsum</s>`),
			"Lorem",
		);

		assert.strictEqual(
			strings.removeTrailingSlash(`https://chrisburnell.com/`),
			"https://chrisburnell.com",
		);

		assert.strictEqual(
			strings.maxWords(`Lorem ipsum dolor`, 2),
			"Lorem ipsum...",
		);

		assert.strictEqual(strings.maxChars(`Lorem`, 4), "Lore...");

		assert.strictEqual(strings.numberStringFormat(3), "three");
		assert.strictEqual(strings.numberStringFormat(1000), "1,000");

		assert.strictEqual(
			strings.markdownFormat(`**Lorem**`),
			"<p><strong>Lorem</strong></p>\n",
		);

		assert.strictEqual(
			strings.excerptize(`<p>Lorem</p><p>ipsum</p>`),
			"Lorem<br>ipsum",
		);
	});
};
