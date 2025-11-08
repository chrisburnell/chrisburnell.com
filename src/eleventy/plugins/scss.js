import dotenv from "dotenv";
dotenv.config({ quiet: true });

import path from "node:path";
import postcss from "postcss";
import * as sass from "sass";
import postcssConfig from "../../../postcss.config.js";

/** @type {Map<[key: string]: Array<object>>} */
let cachedCSS = new Map();

/**
 * @param {import("@11ty/eleventy/src/UserConfig").default} eleventyConfig
 * @returns {void}
 */
export default function (eleventyConfig) {
	// Recognise SCSS as a "template language"
	eleventyConfig.addTemplateFormats("scss");

	// Compile SCSS
	eleventyConfig.addExtension("scss", {
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

				// Pass SCSS through sass to resolve imports and minify
				const sassResult = sass.compileString(inputContent, {
					loadPaths: [parsed.dir || ".", "src/css", "node_modules"],
					style: "compressed",
					sourceMap: false,
				});

				// For builds, pass CSS through PostCSS and plugins
				if (process.env.ELEVENTY_RUN_MODE === "build") {
					const postcssResult = await postcss(
						postcssConfig.plugins,
					).process(sassResult.css, {
						from: inputPath,
					});

					// Cache the result
					cachedCSS.set(inputPathNormalized, postcssResult.css);

					return postcssResult.css;
				}

				// Cache the result
				cachedCSS.set(inputPathNormalized, sassResult.css);

				return sassResult.css;
			};
		},
	});
}
