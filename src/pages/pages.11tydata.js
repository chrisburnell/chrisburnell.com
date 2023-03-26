const { getWebmentions } = require("@chrisburnell/eleventy-cache-webmentions")()

const site = require("#data/site")
const configWebmentions = require("#datajs/config/webmentions")

const { getHost } = require("#filters/queries")
const { markdownFormat } = require("#filters/strings")

module.exports = {
	layout: "page",
	tags: ["page"],
	permalink: "/{{ page.fileSlug }}/index.html",
	eleventyComputed: {
		canonical: (data) => site.url + data.page.url,
		meta_title: (data) => {
			return (data.title || site.tagline).replace(/(<([^>]+)>)/gi, "")
		},
		meta_description: (data) => {
			if (data.description) {
				return markdownFormat(data.description)
					.replace("\n", " ")
					.replace(/(<([^>]+)>)/gi, "")
			}
			return `A page on ${getHost(site.url)}`
		},
		meta_image: (data) => {
			if (data.banner || data.cover) {
				return `${site.url}/images/built/${(data.banner || data.cover).replace("jpg", "jpeg")}`
			} else if (data.photo) {
				const photo = Array.isArray(data.photo) ? data.photo[0] : data.photo
				return `${site.url}/images/built/${(photo.url || photo).replace("jpg", "jpeg")}`
			}
			return site.url + site.favicon
		},
		webmentions: (data) => {
			return data.show_responses ? getWebmentions(configWebmentions, configWebmentions.domain + data.page.url) : []
		},
	},
}
