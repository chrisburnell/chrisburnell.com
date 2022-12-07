const site = require("#data/site")
const queryFilters = require("#filters/queries")
const stringFilters = require("#filters/strings")

module.exports = {
	layout: "archive",
	by_year: true,
	hfeed: true,
	show_photos: true,
	eleventyComputed: {
		canonical: (data) => site.url + data.page.url,
		meta_title: (data) => {
			return data.title.replace(/(<([^>]+)>)/gi, "")
		},
		meta_description: (data) => {
			if (data.description) {
				return stringFilters.markdownFormat(data.description).replace("\n", " ").replace(/(<([^>]+)>)/gi, "")
			}
			return `A page on ${queryFilters.getHost(site.url)}`
		},
		meta_image: (data) => {
			if (data.banner || data.cover) {
				return `${site.url}/images/built/${(data.banner || data.cover).replace("jpg", "jpeg")}`
			}
			return site.url + site.favicon
		},
	},
}
