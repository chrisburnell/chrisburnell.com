import autoprefixer from "autoprefixer"
import path from "node:path"
import postcss from "postcss"
import * as sass from "sass"

export default function(eleventyConfig) {
	// Recognize Sass as a "template languages"
	eleventyConfig.addTemplateFormats("scss")

	// Compile Sass
	eleventyConfig.addExtension("scss", {
		outputFileExtension: "css",
		compile: async function (inputContent, inputPath) {
			if (!inputPath.includes("src/css/")) {
				return
			}

			let parsed = path.parse(inputPath)
			if (parsed.name.startsWith("_")) {
				return
			}

			return async (data) => {
				const sassResult = sass.compileString(inputContent, {
					loadPaths: [parsed.dir || ".", "src/css", "node_modules"],
					// style: process.env.ELEVENTY_RUN_MODE === "build" ? "compressed" : "expanded",
					style: "compressed",
					sourceMap: false,
				})

				if (process.env.ELEVENTY_RUN_MODE === "build") {
					const postcssResult = await postcss([
						autoprefixer,
					]).process(sassResult.css, {
						from: inputPath,
					})

					return postcssResult.css
				}
				return sassResult.css
			}
		},
	})
}
