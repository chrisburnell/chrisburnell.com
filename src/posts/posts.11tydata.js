const EleventyFetch = require("@11ty/eleventy-fetch")
const { getWebmentions } = require("@chrisburnell/eleventy-cache-webmentions")()

const author = require("#data/author")
const site = require("#data/site")
const configWebmentions = require("../data/config/webmentions.js")
const people = require("../data/people.js")
const dateFilters = require("#filters/dates")
const queryFilters = require("#filters/queries")
const stringFilters = require("#filters/strings")

const getType = (data) => {
	const type = data?.bookmark_of || data?.drink_of || data?.like_of || data?.listen_of || data?.play_of || data?.read_of || data?.watch_of || data?.link
	return {
		url: type?.url || type || false,
		title: type?.title || type?.url || type || false
	}
}

const getExternalLikes = async (syndicationLinks) => {
	if (syndicationLinks) {
		const matchingLinks = syndicationLinks.filter((link) => {
			return link.includes("https://dev.to")
		})

		if (matchingLinks.length) {
			const articles = await EleventyFetch(`https://dev.to/api/articles?username=${author["dev_to"]}`, {
				duration: site.cacheDurations.weekly,
				type: "json",
				fetchOptions: {
					method: "GET",
				},
			})

			const matchingArticles = articles.filter((article) => {
				return matchingLinks[0] === article["url"]
			})

			if (matchingArticles.length) {
				return matchingArticles[0]["positive_reactions_count"] || 0
			}
		}
	}
	return 0
}

module.exports = {
	layout: "post",
	tags: ["post"],
	list: "deck",
	mf_root: "entry",
	show_responses: true,
	eleventyComputed: {
		canonical: (data) => site.url + data.page.url,
		of_url: (data) => getType(data).url,
		of_title: (data) => getType(data).title,
		meta_title: (data) => {
			if (data.category && getType(data).title) {
				return `${data.categoryProper || data.category} of “${(data.title || getType(data).title).replace(/(<([^>]+)>)/gi, "")}”`
			} else if (data.title) {
				return data.title.replace(/(<([^>]+)>)/gi, "")
			} else if (data.category) {
				return `${data.categoryProper || data.category} from ${dateFilters.friendlyDateLong(data.page.date)}`
			}
			return site.title.replace(/(<([^>]+)>)/gi, "")
		},
		meta_description: (data) => {
			if (data.description) {
				return stringFilters.markdownFormat(data.description).replace("\n", " ").replace(/(<([^>]+)>)/gi, "")
			} else if (data.category) {
				return `A ${data.categoryProper || data.category} on ${queryFilters.getHost(site.url)}`
			}
			return `A page on ${queryFilters.getHost(site.url)}`
		},
		meta_image: (data) => {
			if (data.banner || data.cover) {
				return `${site.url}/images/built/${(data.banner || data.cover).replace("jpg", "jpeg")}`
			} else if (data.photo) {
				const photo = [...data.photo][0]
				return `${site.url}/images/built/${(photo.url || photo).replace("jpg", "jpeg")}`
			}
			return site.url + site.favicon
		},
		authors: async (data) => {
			if (data.authors) {
				return data.authors
			} else if (getType(data).url) {
				const typeAuthors = queryFilters.getPerson(await people(), getType(data).url, "object")
				if (typeAuthors != getType(data).url) {
					return typeAuthors
				}
			}
			return []
		},
		in_reply_to_url: (data) => data?.in_reply_to?.url || data?.in_reply_to || false,
		in_reply_to_title: (data) => data?.in_reply_to?.title || data?.in_reply_to?.url || data?.in_reply_to || false,
		in_reply_to_authors: async (data) => {
			if (!data?.in_reply_to?.authors) {
				const replyAuthors = queryFilters.getPerson(await people(), data.in_reply_to?.url || data.in_reply_to, "object")
				if (replyAuthors != (data.in_reply_to?.url || data.in_reply_to)) {
					return replyAuthors
				}
			}
			return data?.in_reply_to?.authors || false
		},
		syndicate_to: (data) => {
			if (data.drink_of) {
				return [`https://untappd.com/user/${author.untappd}/checkin/${data.page.fileSlug}`]
			} else if (data.listen_of) {
				return [`https://album.link/s/${data.listen_of}`]
			} else if (data.read_of) {
				return [`https://openlibrary.org/isbn/${data.read_of}`]
			}
			return data.syndicate_to || []
		},
		webmentions: (data) => {
			return data.show_responses ? getWebmentions(configWebmentions, configWebmentions.domain + data.page.url) : []
		},
		externalLikes: async (data) => {
			if (data.show_responses) {
				const externalLikes = await getExternalLikes(data?.syndicate_to)
					.then((externalLikes) => externalLikes)
					.catch(() => 0)

				return externalLikes
			}
			return []
		},
	},
}
