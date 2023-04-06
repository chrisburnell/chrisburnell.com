const { favicon, url } = require("#data/site")
const { getHost } = require("#filters/queries")
const { markdownFormat } = require("#filters/strings")

module.exports = {
	layout: "archive",
	by_year: true,
	hfeed: true,
	show_photos: true,
	eleventyComputed: {
		canonical: (data) => url + data.page.url,
		meta_title: (data) => {
			return data.title.replace(/(<([^>]+)>)/gi, "")
		},
		meta_description: (data) => {
			if (data.description) {
				return markdownFormat(data.description)
					.replace("\n", " ")
					.replace(/(<([^>]+)>)/gi, "")
			}
			return `A page on ${getHost(url)}`
		},
		meta_image: (data) => {
			if (data.banner || data.cover) {
				return `${url}/images/built/${(data.banner || data.cover).replace("jpg", "jpeg")}`
			}
			return url + favicon
		},
	},
}
