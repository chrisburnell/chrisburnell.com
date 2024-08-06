import markdown from "../config/markdown.js";

export default function (eleventyConfig) {
	eleventyConfig.setLibrary("md", markdown);
}
