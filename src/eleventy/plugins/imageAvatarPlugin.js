// Load .env variables with dotenv
require("dotenv").config()

const site = require("../../data/site.json")
const author = require("../../data/author.json")
const twitterReplacements = require("../../data/twitterReplacements.json")
const queryFilters = require("../filters/queries.js")
const TwitterAvatarUrl = require("twitter-avatar-url")
const Image = require("@11ty/eleventy-img")

// Avatar Dimensions
const size = 96 // 48 * 2

const fixTwitterUsername = (twitterUsername) => {
	return Object.entries(twitterReplacements).reduce((accumulator, [key, value]) => {
		return accumulator.replace(key, value)
	}, twitterUsername)
}

const getImageOptions = (lookup) => {
	return {
		widths: [size],
		formats: process.env.ELEVENTY_PRODUCTION ? ["avif", "webp", "jpg"] : ["webp", "jpg"],
		urlPath: "/images/avatars/",
		outputDir: "./_site/images/avatars",
		duration: "4w",
		sharpOptions: {
			quality: 100,
		},
		filenameFormat: (id, src, width, format) => {
			return `${String(lookup).toLowerCase()}.${format}`
		},
	}
}

const fetchImageData = (lookup, url) => {
	if (!url) {
		throw new Error("src property required in `img` shortcode.")
	}

	Image(url, getImageOptions(lookup)).then(() => {
		// return nothing, even though this returns a promise
	})
}

const storeAvatar = async (id, classes = "") => {
	// We know where the images will be
	let fakeUrl = `/images/avatars/${id}.jpg`
	let imgData = Image.statsByDimensionsSync(fakeUrl, size, size, getImageOptions(id))
	let markup = Image.generateHTML(
		imgData,
		{
			alt: `Avatar for ${id}`,
			class: " [ avatar ] [ u-author ] " + (classes ? `[ ${classes} ] ` : ""),
			loading: "lazy",
			decoding: "async",
		},
		{
			whitespaceMode: "inline",
		}
	)

	return markup
}

module.exports = (eleventyConfig) => {
	let twitterUsernames, mastodonHandles, domains

	eleventyConfig.on("beforeBuild", () => {
		twitterUsernames = new Set()
		mastodonHandles = new Set()
		domains = new Set()
	})

	if (process.env.ELEVENTY_PRODUCTION) {
		eleventyConfig.on("afterBuild", () => {
			let array = Array.from(twitterUsernames)
			console.log(`[${queryFilters.getHost(site.url)}] Generating ${array.length} Twitter avatars.`)
			TwitterAvatarUrl(array).then((results) => {
				for (let result of results) {
					fetchImageData(result.username, result.url.large)
				}
			})

			array = Array.from(mastodonHandles)
			console.log(`[${queryFilters.getHost(site.url)}] Generating ${array.length} Mastodon avatars.`)
			for (let mastodonHandle of array) {
				fetchImageData(mastodonHandle.handle, mastodonHandle.photo)
			}

			array = Array.from(domains)
			console.log(`[${queryFilters.getHost(site.url)}] Generating ${array.length} domain avatars.`)
			for (let domain of array) {
				fetchImageData(domain.url, domain.photo)
			}
		})
	}

	eleventyConfig.addNunjucksAsyncShortcode("avatar", async (photo, url, authorUrl, classes = "") => {
		const mastodonHandle = queryFilters.getMastodonHandle(authorUrl)
		if (url.includes("twitter.com")) {
			let target = url.includes(author.twitter) ? (authorUrl.includes(site.url) ? url : authorUrl) : url
			let username = fixTwitterUsername(target.split("twitter.com/")[1].split("/")[0])
			twitterUsernames.add(username.toLowerCase())
			return storeAvatar(username, classes)
		} else if (mastodonHandle !== authorUrl) {
			mastodonHandles.add({
				handle: mastodonHandle,
				photo: photo.toLowerCase(),
			})
			return storeAvatar(mastodonHandle, classes)
		} else if (photo) {
			let domain = queryFilters.getHost(authorUrl || url)
			domains.add({
				url: domain,
				photo: photo.toLowerCase(),
			})
			return storeAvatar(domain, classes)
		}

		return `<picture><source type="image/avif" srcset="/images/default-profile.avif 48w"><source type="image/webp" srcset="/images/default-profile.webp 48w"><img alt="" class="[ avatar ]" loading="lazy" decoding="async" src="/images/default-profile.jpg" width="48" height="48"></picture>`
	})
}
