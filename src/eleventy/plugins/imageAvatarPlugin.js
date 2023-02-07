require("dotenv").config()

const site = require("#data/site")
const queryFilters = require("#filters/queries")

const Image = require("@11ty/eleventy-img")

// Avatar Dimensions
const size = 96 // 48 * 2

const getImageOptions = (lookup) => {
	return {
		widths: [size],
		formats: process.env.ELEVENTY_PRODUCTION ? ["avif", "webp", "jpg"] : ["webp", "jpg"],
		urlPath: "/images/avatars/",
		outputDir: "./_site/images/avatars/",
		duration: site.cacheDurations.monthly,
		sharpOptions: {
			quality: 100,
		},
		filenameFormat: (id, src, width, format, options) => {
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
	let metadata = Image.statsByDimensionsSync(fakeUrl, size, size, getImageOptions(id))
	let markup = Image.generateHTML(
		metadata,
		{
			alt: `Avatar for ${id}`,
			class: " [ avatar ] [ u-author ] " + (classes ? `[ ${classes} ] ` : ""),
			sizes: "100vw",
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
	let mastodonHandles, domains

	eleventyConfig.on("beforeBuild", () => {
		mastodonHandles = new Set()
		domains = new Set()
	})

	if (process.env.ELEVENTY_PRODUCTION) {
		eleventyConfig.on("afterBuild", () => {
			let array

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
		const mastodonHandle = authorUrl ? queryFilters.getMastodonHandle(authorUrl) : null
		if (photo && mastodonHandle && mastodonHandle != authorUrl) {
			mastodonHandles.add({
				handle: mastodonHandle,
				photo: photo.toLowerCase(),
			})
			return storeAvatar(mastodonHandle, classes)
		} else if (photo && !url.includes("https://twitter.com")) {
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
