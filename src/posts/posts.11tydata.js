const EleventyFetch = require("@11ty/eleventy-fetch")
const { getWebmentions } = require("@chrisburnell/eleventy-cache-webmentions")()

const { cacheDurations, favicon, title: siteTitle, url: siteUrl } = require("#data/site")
const { untappd } = require("#data/author")
const configWebmentions = require("#datajs/config/webmentions")
const people = require("#datajs/people")

const { friendlyDateLong } = require("#filters/dates")
const { getHost, getPerson } = require("#filters/queries")
const { markdownFormat } = require("#filters/strings")

const getType = (data) => {
	const type = data?.bookmark_of || data?.drink_of || data?.like_of || data?.listen_of || data?.play_of || data?.read_of || data?.watch_of || data?.link
	return {
		url: type?.url || type || false,
		title: type?.title || type?.url || type || false,
	}
}

module.exports = {
	layout: "post",
	tags: ["post"],
	list: "deck",
	mf_root: "entry",
	show_responses: true,
	eleventyComputed: {
		canonical: (data) => siteUrl + data.page.url,
		of_url: (data) => getType(data).url,
		of_title: (data) => getType(data).title,
		meta_title: (data) => {
			let category
			if (data.category) {
				category = (data.categoryProper || data.category).charAt(0).toUpperCase() + (data.categoryProper || data.category).substring(1)
			}
			if (data.category && getType(data).title) {
				return `${category} of “${(data.title || getType(data).title).replace(/(<([^>]+)>)/gi, "")}”`
			} else if (data.title) {
				return data.title.replace(/(<([^>]+)>)/gi, "")
			} else if (data.category) {
				return `${category} from ${friendlyDateLong(data.page.date)}`
			}
			return siteTitle.replace(/(<([^>]+)>)/gi, "")
		},
		meta_description: (data) => {
			if (data.description) {
				return markdownFormat(data.description)
					.replace("\n", " ")
					.replace(/(<([^>]+)>)/gi, "")
			} else if (data.category) {
				const category = (data.categoryProper || data.category).charAt(0).toUpperCase() + (data.categoryProper || data.category).substring(1)
				return `A ${category} on ${getHost(siteUrl)}`
			}
			return `A page on ${getHost(siteUrl)}`
		},
		meta_image: (data) => {
			if (data.banner || data.cover) {
				return `${siteUrl}/images/built/${(data.banner || data.cover).replace("jpg", "jpeg")}`
			} else if (data.photo) {
				const photo = Array.isArray(data.photo) ? data.photo[0] : data.photo
				return `${siteUrl}/images/built/${(photo.url || photo).replace("jpg", "jpeg")}`
			}
			return siteUrl + favicon
		},
		authors: async (data) => {
			if (data.authors) {
				return data.authors
			} else if (getType(data).url) {
				let typeAuthors = getPerson(await people(), getType(data).url, "object")
				if (typeAuthors != getType(data).url) {
					return typeAuthors
				}
			}
			return []
		},
		in_reply_to_url: (data) => data?.in_reply_to?.url || data?.in_reply_to || false,
		in_reply_to_title: (data) => data?.in_reply_to?.title || data?.in_reply_to?.url || data?.in_reply_to || false,
		syndicate_to: (data) => {
			if (data.drink_of) {
				return [`https://untappd.com/user/${untappd}/checkin/${data.page.fileSlug}`]
			} else if (data.listen_of) {
				return [`https://album.link/s/${data.listen_of}`]
			} else if (data.read_of) {
				return [`https://openlibrary.org/isbn/${data.read_of}`]
			}
			return data.syndicate_to || []
		},
		webmentions: (data) => {
			return data.page.url ? getWebmentions(configWebmentions, configWebmentions.domain + data.page.url) : []
		},
		// <head> links currently broken because this logic lives in browse.njk
		// previous_post: collections[category] | arrayKeyIncludes('data.tags', 'post') | arePublished | getPreviousCollectionItem(page),
		// next_post: collections[category] | arrayKeyIncludes('data.tags', 'post') | arePublished | getNextCollectionItem(page),
	},
}
