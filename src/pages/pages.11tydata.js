const { getWebmentions } = require("@chrisburnell/eleventy-cache-webmentions")

const { favicon, tagline: siteTagline, url: siteUrl } = require("#data/site")
const configWebmentions = require("#datajs/config/webmentions")

const { getHost } = require("#filters/queries")
const { markdownFormat } = require("#filters/strings")

module.exports = {
	layout: "page",
	tags: ["page"],
	permalink: "/{{ page.fileSlug }}/index.html",
	eleventyComputed: {
		canonical: (data) => siteUrl + data.page.url,
		meta_title: (data) => {
			return (data.title || siteTagline).replace(/(<([^>]+)>)/gi, "")
		},
		meta_description: (data) => {
			if (data.description) {
				return markdownFormat(data.description)
					.replace("\n", " ")
					.replace(/(<([^>]+)>)/gi, "")
			}
			return `A page on ${getHost(siteUrl)}`
		},
		meta_image: (data) => {
			if (data.banner || data.cover) {
				return `${siteUrl}/images/built/${(data.banner?.url || data.banner || data.cover?.url || data.cover).replace("jpg", "jpeg")}`
			} else if (data.photo) {
				const photo = Array.isArray(data.photo) ? data.photo[0] : data.photo
				return `${siteUrl}/images/built/${(photo.url || photo).replace("jpg", "jpeg")}`
			}
			return siteUrl + favicon
		},
		webmentions: (data) => {
			return data.page.url ? getWebmentions(configWebmentions, configWebmentions.domain + data.page.url) : []
		},
	},
}
