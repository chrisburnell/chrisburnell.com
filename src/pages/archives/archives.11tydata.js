const { favicon, url: siteUrl } = require("#data/site")
const { getHost } = require("#filters/queries")
const { markdownFormat } = require("#filters/strings")

module.exports = {
	layout: "archive",
	by_year: true,
	hfeed: true,
	show_photos: true,
	eleventyComputed: {
		canonical: (data) => siteUrl + data.page.url,
		meta_title: (data) => {
			return data.title.replace(/(<([^>]+)>)/gi, "")
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
			}
			return siteUrl + favicon
		},
	},
}
