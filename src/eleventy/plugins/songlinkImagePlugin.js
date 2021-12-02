const fetch = require("node-fetch")

const site = require("../../data/site.json")
const queryFilters = require("../filters/queries.js")
const Image = require("@11ty/eleventy-img")

// Load .env variables with dotenv
require("dotenv").config()

const TOKEN = process.env.ODESLI_TOKEN

// Avatar Dimensions
const size = 400

const getImageOptions = (lookup) => {
	return {
		widths: [size],
		formats: process.env.ELEVENTY_PRODUCTION ? ["avif", "webp", "jpg"] : ["webp", "jpg"],
		urlPath: "/images/built/",
		outputDir: "./_site/images/built",
		cacheDuration: "1y",
		filenameFormat: (id, src, width, format) => {
			return `${String(lookup).toLowerCase()}.${format}`
		},
	}
}

const fetchImageData = (url) => {
	if (!url) {
		throw new Error("src property required in `img` shortcode.")
	}

	Image(url, getImageOptions()).then(() => {
		// return nothing, even though this returns a promise
	})
}

const storeAlbumCover = async (id, classes = "") => {
	// We know where the images will be
	let fakeUrl = `/images/built/${id}.jpg`
	let imgData = Image.statsByDimensionsSync(fakeUrl, size, size, getImageOptions(id))
	let markup = Image.generateHTML(
		imgData,
		{
			alt: `Album cover for ${id}`,
			class: " [ u-photo ] " + (classes ? `[ ${classes} ] ` : ""),
			loading: "lazy",
			decoding: "async",
		},
		{
			whitespaceMode: "inline",
		}
	)

	return markup
}

const fetchAlbumCoverUrl = async (id) => {
	const response = await fetch(`https://api.song.link/v1-alpha.1/links?key=${TOKEN}&userCountry=UK&platform=spotify&type=album&id=${id}`)
	if (response.ok) {
		const album = await response.json()
		console.log(album)
		return album.entitiesByUniqueId[`SPOTIFY_ALBUM::${id}`].thumbnailUrl
	}

	return ""
}

module.exports = async (config) => {
	let ids

	config.on("beforeBuild", () => {
		ids = new Set()
	})

	config.on("afterBuild", () => {
		let array = Array.from(ids)
		console.log(`[${queryFilters.getHost(site.url)}] Generating ${array.length} Songlink album covers.`)
		for (let id of array) {
			fetchImageData(fetchAlbumCoverUrl(id))
		}
	})

	config.addNunjucksAsyncShortcode("songlink_img", async (id, classes = "") => {
		ids.add(id)
		return storeAlbumCover(id, classes)
	})
}
