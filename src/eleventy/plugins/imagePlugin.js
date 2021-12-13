// Load .env variables with dotenv
require("dotenv").config()

const site = require("../../data/site.json")
const queryFilters = require("../filters/queries.js")

const path = require("path")
const Image = require("@11ty/eleventy-img")

module.exports = (eleventyConfig) => {
	let localImages

	eleventyConfig.on("beforeBuild", () => {
		localImages = new Set()
	})

	if (process.env.ELEVENTY_PRODUCTION) {
		eleventyConfig.on("afterBuild", () => {
			let images = Array.from(localImages)
			console.log(`[${queryFilters.getHost(site.url)}] Generating ${images.length} local images.`)
			for (let image of images) {
				Image(image.src, image.options)
			}
		})
	}

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

		localImages.add({
			src: src,
			options: options,
		})
		let imgData = Image.statsSync(src, options)
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
