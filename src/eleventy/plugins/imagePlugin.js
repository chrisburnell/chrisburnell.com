const path = require("path")
const Image = require("@11ty/eleventy-img")

// Load .env variables with dotenv
require("dotenv").config()

const imageShortcode = (src, alt, classes = "", widths = [null]) => {
	let formats
	if (src.includes(".svg")) {
		formats = ["svg"]
	} else {
		const originalFormat = src.includes("png") ? "png" : "jpg"
		formats = process.env.ELEVENTY_PRODUCTION ? ["avif", "webp", originalFormat] : ["webp", originalFormat]
	}

	let options = Object.assign(
		{},
		{
			width: widths,
			formats: formats,
			urlPath: "/images/built/",
			outputDir: "./_site/images/built",
			duration: "4w",
			filenameFormat: (id, src, width, format) => {
				const extension = path.extname(src)
				const name = path.basename(src, extension)
				return `${name}.${format}`
			},
		},
		{}
	)

	Image(src, options)

	let imageAttributes = Object.assign(
		{
			alt: alt,
			class: classes,
			loading: "lazy",
			decoding: "async",
		},
		{}
	)

	let metadata = Image.statsSync(src, options)

	// You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
	return Image.generateHTML(metadata, imageAttributes, {
		whitespaceMode: "inline",
	})
}

module.exports = (config) => {
	config.addNunjucksShortcode("img", imageShortcode)
}
