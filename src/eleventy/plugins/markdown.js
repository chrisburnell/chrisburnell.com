import markdown from "../config/markdown.js";

/**
 * @param {import("@11ty/eleventy/src/UserConfig").default} eleventyConfig
 * @returns {void}
 */
export default function (eleventyConfig) {
	eleventyConfig.setLibrary("md", markdown);
}
