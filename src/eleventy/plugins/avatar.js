require("dotenv").config()
const Image = require("@11ty/eleventy-img")

const { cacheDurations, url: siteUrl } = require("#data/site")

const { getHost, getMastodonHandle } = require("#filters/queries")

// Avatar Dimensions
const size = 96 // 48 * 2

const getImageOptions = (lookup) => {
	return {
		widths: [size],
		formats: process.env.ELEVENTY_PRODUCTION ? ["avif", "webp", "jpg"] : ["webp", "jpg"],
		urlPath: "/images/avatars/",
		outputDir: "./_site/images/avatars/",
		duration: cacheDurations.monthly,
		sharpOptions: {
			quality: 100,
		},
		filenameFormat: (id, src, width, format, options) => {
			return `${String(lookup).toLowerCase()}.${format}`
		},
	}
}

const fetchImageData = (options, src) => {
	if (!src) {
		throw new Error("src property required in `img` shortcode.")
	}

	Image(src, getImageOptions(options)).then(() => {
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
			alt: `${id}’s avatar`,
			title: `${id}’s avatar`,
			class: " [ avatar ] [ u-author ] " + (classes ? `[ ${classes} ] ` : ""),
			sizes: "100vw",
			loading: "lazy",
			decoding: "async",
		},
		{
			whitespaceMode: "inline",
		},
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
			console.log(`[${getHost(siteUrl)}] Generating ${array.length} Mastodon avatars.`)
			for (let mastodonHandle of array) {
				fetchImageData(mastodonHandle.handle, mastodonHandle.photo)
			}

			array = Array.from(domains)
			console.log(`[${getHost(siteUrl)}] Generating ${array.length} domain avatars.`)
			for (let domain of array) {
				fetchImageData(domain.url, domain.photo)
			}
		})
	}

	eleventyConfig.addNunjucksAsyncShortcode("avatar", async (photo, url, authorUrl, classes = "") => {
		if (authorUrl?.includes("chrisburnell.com") || authorUrl?.includes("repc.co/@chrisburnell") || authorUrl?.includes("twitter.com/iamchrisburnell")) {
			return `<picture><source srcset="/images/avatar.avif 1x, /images/avatar@2x.avif 2x, /images/avatar@3x.avif 3x, /images/avatar@4x.avif 4x" type="image/avif"><source srcset="/images/avatar.webp 1x, /images/avatar@2x.webp 2x, /images/avatar@3x.webp 3x, /images/avatar@4x.webp 4x" type="image/webp"><img alt="Chris Burnell" src="/images/avatar.jpeg" srcset="/images/avatar.jpeg 1x, /images/avatar@2x.jpeg 2x, /images/avatar@3x.jpeg 3x, /images/avatar@4x.jpeg 4x" class="[ avatar ] [ canada ]" width="48" height="48"></picture>`
		}
		const mastodonHandle = authorUrl ? getMastodonHandle(authorUrl) : null
		if (photo && mastodonHandle && mastodonHandle != authorUrl) {
			mastodonHandles.add({
				handle: mastodonHandle,
				photo: photo.toLowerCase(),
			})
			return storeAvatar(mastodonHandle, classes)
		} else if (photo && !url.includes("https://twitter.com")) {
			let domain = getHost(authorUrl || url)
			domains.add({
				url: domain,
				photo: photo.toLowerCase(),
			})
			return storeAvatar(domain, classes)
		}

		return `<picture><source type="image/avif" srcset="/images/default-profile.avif 48w"><source type="image/webp" srcset="/images/default-profile.webp 48w"><img alt="default/anonymous avatar" class="[ avatar ]" loading="lazy" decoding="async" src="/images/default-profile.jpeg" width="48" height="48"></picture>`
	})
}
