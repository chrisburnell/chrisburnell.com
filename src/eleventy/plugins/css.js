import dotenv from "dotenv";
dotenv.config({ quiet: true });

import path from "node:path";
import postcss from "postcss";
import postcssConfig from "../../../postcss.config.js";

/** @type {Map<[key: string]: Array<object>>} */
let cachedCSS = new Map();

/**
 * @param {import("@11ty/eleventy/src/UserConfig").default} eleventyConfig
 * @returns {void}
 */
export default function (eleventyConfig) {
	// Recognise SCSS as a "template language"
	eleventyConfig.addTemplateFormats("css");

	// Compile SCSS
	eleventyConfig.addExtension("css", {
		outputFileExtension: "css",
		compile: async function (inputContent, inputPath) {
			// Ignore anything outside the front end CSS folder
			if (!inputPath.includes("src/css/")) {
				return;
			}

			// Ignore partials
			let parsed = path.parse(inputPath);
			if (parsed.name.startsWith("_")) {
				return;
			}

			return async () => {
				const inputPathNormalized = inputPath.replace(/^\.\//, "");
				// Skip processing and grab from the memoized cache
				if (cachedCSS.has(inputPathNormalized)) {
					return cachedCSS.get(inputPathNormalized);
				}

				// Pass CSS through PostCSS and plugins
				const postcssResult = await postcss(
					postcssConfig.plugins,
				).process(inputContent, {
					from: inputPath,
				});

				// Cache the result
				cachedCSS.set(inputPathNormalized, postcssResult.css);

				return postcssResult.css;
			};
		},
	});
}
