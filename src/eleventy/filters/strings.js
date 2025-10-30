import { load } from "cheerio";
import dotenv from "dotenv";
import he from "he";
import Natural from "natural";
import randomCase from "random-case";
import truncate from "truncate-html";
import markdown from "../config/markdown.js";
import capitalizers from "../data/capitalizers.js";
import { limits } from "../data/site.js";
dotenv.config({ quiet: true });

const stringNumbers = [
	"zero",
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
];

const sentimentAnalyzer = new Natural.SentimentAnalyzer(
	"English",
	Natural.PorterStemmer,
	"afinn",
);

/**
 * @param {Array<string>} strings
 * @param {string} style
 * @returns {string}
 */
export const conjunction = (strings, style = "long") => {
	// en-US is used because (for some reason) it’s need for Oxford commas
	const conjunctionFormat = new Intl.ListFormat("en-US", {
		style: style,
		type: "conjunction",
	});
	return conjunctionFormat.format(strings);
};

/**
 * @param {Array<string>} strings
 * @param {string} style
 * @returns {string}
 */
export const disjunction = (strings, style = "long") => {
	// en-US is used because (for some reason) it’s need for Oxford commas
	const disjunctionFormat = new Intl.ListFormat("en-US", {
		style: style,
		type: "disjunction",
	});
	return disjunctionFormat.format(strings);
};

/**
 * @param {string} string
 * @returns {string}
 */
export const supertitle = (string) => {
	let formatted = string
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");

	capitalizers.forEach((word) => {
		const regex = new RegExp(word, "gi");
		if (formatted.match(regex)) {
			formatted = formatted.replace(regex, word);
		}
	});

	return formatted;
};

/**
 * @param {string} string
 * @returns {string}
 */
export const cleanTags = (string) => {
	const $ = load(string, null, false);
	$("pre, form, link, s, script, style, .support, .palette").remove();
	return $.html().trim();
};

/**
 * @param {string} string
 * @param {string} tagName
 * @returns {string}
 */
export const wrapTextNodes = (string, tagName) => {
	const $ = load(string, null, false);
	$.root()
		.contents()
		.each((_, node) => {
			if (node.type === "text" && node.data.trim() !== "") {
				const element = $(`<${tagName}></${tagName}>`).text(node.data);
				$(node).replaceWith(element);
			}
		});
	return $.html().trim();
};

/**
 * @param {string} string
 * @returns {string}
 */
export const removeTagsForWordcount = (string) => {
	const $ = load(cleanTags(string), null, false);
	$(".skip-wordcount, [data-skip-wordcount], pre, .demo").remove();
	return $.html().trim();
};

/**
 * @param {string} string
 * @returns {string}
 */
export const cleanTagsForRSS = (string) => {
	const $ = load(string, null, false);
	$("link, script, style, .no-rss, [data-no-rss]").remove();
	const attributes = [
		"class",
		"style",
		"data-ignore-wordcount",
		"data-pagefind-ignore",
	];
	attributes.forEach((attribute) => {
		$(`[${attribute}]`).removeAttr(attribute);
	});
	return $.html().trim();
};

/**
 * @param {string} string
 * @returns {string}
 */
export const encodeHTML = (string) => {
	return he.encode(string);
};

/**
 * @param {string} string
 * @returns {string}
 */
export const decodeHTML = (string) => {
	return he.decode(string);
};

/**
 * @param {string} string
 * @returns {string}
 */
export const stripImages = (string) => {
	const $ = load(string, null, false);
	$("picture, img").remove();
	$("a:empty").remove();
	return $.html().trim();
};

/**
 * @param {string} string
 * @param {string} replacement
 * @returns {string}
 */
export const replaceLineBreaks = (string, replacement = " ") => {
	return string.replace("\n", replacement);
};

/**
 * @param {string} string
 * @returns {string}
 */
export const removeStrikethrough = (string) => {
	const $ = load(string, null, false);
	$("s").remove();
	return $.html().trim();
};

/**
 * @param {string} string
 * @returns {string}
 */
export const removeTrailingSlash = (string) => {
	return string.replace(/\/$/g, "");
};

/**
 * @param {string} string
 * @param {number} count
 * @param {boolean} [condition]
 * @returns {string}
 */
export const maxWords = (string, count = limits.maxWords, condition = true) => {
	return condition ? truncate(string, count, { byWords: true }) : string;
};

/**
 * @param {string} string
 * @param {number} count
 * @param {boolean} [condition]
 * @returns {string}
 */
export const maxChars = (string, count, condition = true) => {
	return condition ? truncate(string, count) : string;
};

/**
 * @param {number} number
 * @param {boolean} forceNumeral
 * @returns {string}
 */
export const numberStringFormat = (number, forceNumeral = false) => {
	if (!forceNumeral && number < stringNumbers.length) {
		return stringNumbers[number];
	}
	return Math.floor(Number(number)).toLocaleString();
};

/**
 * @param {string} string
 * @returns {string}
 */
export const markdownFormat = (string) => {
	return markdown.render(string);
};

/**
 * @param {string} string
 * @param {boolean} keepImages
 * @returns {string}
 */
export const excerptize = (string, keepImages = false) => {
	let $ = load(string.split("<!-- end excerpt -->")[0], null, false);
	// Remove empty <p> elements
	$("p").each(function () {
		if ($(this).text().trim() === "") {
			$(this).remove();
		}
	});
	// Remove <iframe>, <script>, and <style> elements completely
	$("iframe, script, style").remove();
	// Optionally remove images and <figure> elements
	if (!keepImages) {
		const withoutImages = stripImages($.html());
		$ = load(withoutImages, null, false);
		$("figure").remove();
	}
	// Insert line breaks in between <p> and <blockquote> elements
	$("p, blockquote").each(function () {
		if (
			$(this).next("p").length > 0 ||
			$(this).next("blockquote").length > 0
		) {
			$(this).after("<br>");
		}
	});
	// Remove <p> and <blockquote> elements but preserve the content
	$("p, blockquote").each(function () {
		$(this).replaceWith($(this).html());
	});
	return $.html();
};

/**
 * @param {string} string
 * @returns {string}
 */
export const spongebob = (string) => {
	return randomCase(string);
};

/**
 * @param {string} string
 * @param {number} threshold
 * @returns {string}
 */
export const sentimentCheck = (string, threshold = -0.3) => {
	const words = string.match(/\b(\w+)\b/g);
	if (sentimentAnalyzer.getSentiment(words) <= threshold) {
		return randomCase(string);
	}
	return string;
};

/**
 * @param {string} content
 * @param {string} keyword
 * @param {string} secret
 * @returns {string}
 */
export const vigenere = (
	content,
	keyword = "RAVENOUS",
	secret = process.env.VIGENERE_SECRET,
) => {
	content = content.toUpperCase().replace(/[^A-Z]/g, "");
	keyword = keyword.toUpperCase().replace(/[^A-Z]/g, "");
	secret = secret.toUpperCase().replace(/[^A-Z]/g, "");

	let caesarCipher = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	keyword
		.split("")
		.reverse()
		.forEach((letter) => {
			caesarCipher = letter + caesarCipher.replace(letter, "");
		});

	let vigenereTableRow = caesarCipher;
	const vigenereTable = [];
	caesarCipher.split("").forEach((letter) => {
		vigenereTable.push(vigenereTableRow);
		vigenereTableRow = vigenereTableRow.replace(letter, "") + letter;
	});

	let secretRepeated = "";
	content.split("").forEach((_, index) => {
		secretRepeated += secret.split("")[index % secret.length];
	});

	let encrypted = "";
	secretRepeated.split("").forEach((_, index) => {
		const row = caesarCipher.indexOf(secretRepeated[index]);
		const column = caesarCipher.indexOf(content[index]);
		encrypted += vigenereTable[row][column];
	});

	return encrypted;
};

export default {
	conjunction,
	disjunction,
	supertitle,
	cleanTags,
	wrapTextNodes,
	removeTagsForWordcount,
	cleanTagsForRSS,
	encodeHTML,
	decodeHTML,
	stripImages,
	replaceLineBreaks,
	removeStrikethrough,
	removeTrailingSlash,
	maxWords,
	maxChars,
	numberStringFormat,
	markdownFormat,
	excerptize,
	spongebob,
	sentimentCheck,
	vigenere,
};
