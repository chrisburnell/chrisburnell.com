const path = require("path")
const Image = require("@11ty/eleventy-img")
const { ELEVENTY_PRODUCTION } = require("#datajs/env")
const { cacheDurations } = require("#data/site")

module.exports = (eleventyConfig) => {
	eleventyConfig.addNunjucksShortcode("image", (src, alt, classes = "", widths = [800]) => {
		let formats
		if (src.includes(".svg")) {
			formats = ["svg"]
		} else {
			const originalFormat = src.includes("png") ? "png" : "jpg"
			formats = ELEVENTY_PRODUCTION ? ["avif", "webp", originalFormat] : ["webp", originalFormat]
		}

		let options = {
			widths: widths,
			formats: formats,
			urlPath: "/images/built/",
			outputDir: "./_site/images/built/",
			duration: cacheDurations.monthly,
			sharpOptions: {
				animated: true,
				quality: 100,
			},
			filenameFormat: (id, src, width, format, options) => {
				const extension = path.extname(src)
				const name = path.basename(src, extension)
				return `${name}${widths.length > 1 ? "-" + width : ""}.${format}`
			},
		}

		Image(src, options)

		let metadata = Image.statsSync(src, options)
		let attributes = {
			alt: alt,
			title: alt,
			class: classes,
			sizes: "100vw",
			loading: "lazy",
			decoding: "async",
		}
		return Image.generateHTML(metadata, attributes)
	})
}
