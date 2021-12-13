// Load .env variables with dotenv
require("dotenv").config()

const path = require("path")
const Image = require("@11ty/eleventy-img")

module.exports = (eleventyConfig) => {
	eleventyConfig.addNunjucksAsyncShortcode("img", async (src, alt, classes = "", widths = [null]) => {
		let formats
		if (src.includes(".svg")) {
			formats = ["svg"]
		} else {
			const originalFormat = src.includes("png") ? "png" : "jpg"
			formats = process.env.ELEVENTY_PRODUCTION ? ["avif", "webp", originalFormat] : ["webp", originalFormat]
		}

		let options = {
			width: widths,
			sizes: "100vw",
			formats: formats,
			urlPath: "/images/built/",
			outputDir: "./_site/images/built",
			duration: "4w",
			sharpOptions: {
				quality: 100,
			},
			filenameFormat: (id, src, width, format) => {
				const extension = path.extname(src)
				const name = path.basename(src, extension)
				return `${name}${widths.length > 1 ? `-${width}` : ``}.${format}`
			},
		}

		let imgData = await Image(src, options)
		let markup = Image.generateHTML(
			imgData,
			{
				alt: alt,
				class: classes,
				loading: "lazy",
				decoding: "async",
			},
			{
				whitespaceMode: "inline",
			}
		)

		return markup
	})
}
