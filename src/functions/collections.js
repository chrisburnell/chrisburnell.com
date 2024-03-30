import EleventyFetch from "@11ty/eleventy-fetch"
import breweries from "../data/breweries.js"
import gamePublishers from "../data/gamePublishers.js"
import mastodonInstances from "../data/mastodonInstances.js"
import meetups from "../data/meetups.js"
import musicalArtists from "../data/musicalArtists.js"
import publications from "../data/publications.js"
import blogroll from "../eleventy/data/blogroll.js"
import { now } from "../eleventy/data/global.js"
import { cacheDurations, favicon, url as siteURL } from "../eleventy/data/site.js"
import { getCategoryName } from "../eleventy/filters/collections.js"
import { epoch, friendlyDate, getRSVPValueHTML } from "../eleventy/filters/dates.js"
import { conjunction } from "../eleventy/filters/strings.js"
import { getHost, tweetback } from "../eleventy/filters/urls.js"
import { getSyndicationTitle, toArray } from "../eleventy/filters/utils.js"
import { stripHTML } from "./strings.js"
import { getPathname } from "./urls.js"
import { getMastodonHandle, getTwitterHandle } from "./utils.js"

// Create an array of references
const allPeople = [...blogroll, ...breweries, ...publications, ...musicalArtists, ...gamePublishers, ...meetups]

// Get data about all pages
const pages = await EleventyFetch("https://chrisburnell.com/all.json", {
	duration: cacheDurations.hourly,
	type: "json",
	fetchOptions: {
		method: "GET",
	},
})

/**
 *
 * @param {string} [title]
 * @param {string} [url]
 * @returns {null|string}
 */
const getPerson = (title, url) => {
	return allPeople.find((person) => {
		// Match by Title
		if (title && title.localeCompare(person.title, undefined, { sensitivity: "accent" }) === 0) {
			return true
		}
		// Match by Mastodon handle
		if (url && person.mastodon && mastodonInstances.includes(getHost(url))) {
			return toArray(person.mastodon).find((personMastodon) => {
				return getMastodonHandle(url) === `@${personMastodon}`
			})
		}
		// Match by Twitter handle
		if (url && person.twitter && url.includes("https://twitter.com")) {
			return toArray(person.twitter).find((personTwitter) => {
				return getTwitterHandle(url) === `@${personTwitter}`
			})
		}
		// Match by URL
		if (url && person.url) {
			return toArray(person.url).find((personURL) => {
				if (getHost(url) === getHost(personURL)) {
					return true
				}

				return false
			})
		}
		return false
	})
}

/**
 * @param {object} item
 * @returns {boolean}
 */
export const isPublished = (item) => {
	if ("data" in item) {
		if ("draft" in item.data && item.data.draft === true) {
			return false
		}
		if ("published" in item.data && item.data.published === false) {
			return false
		}
		if ("tags" in item.data && item.data.tags.includes("ignore")) {
			return false
		}
		if ("date" in item.data && epoch(item.data.date) > now) {
			return false
		}
	}
	return !!item.url
}

/**
 * @param {object} item
 * @returns {boolean}
 */
export const notReply = (item) => {
	const isReply = item.data.in_reply_to
	if (!isReply) {
		return true
	}
	// Don't count internal replies
	if ((isReply?.url || isReply).includes(siteURL)) {
		return true
	}
	return false
}

/**
 * @param {object} data
 * @returns {object|string}
 */
export const getPropertyData = (data) => {
	return data?.bookmark_of || data?.drink_of || data?.like_of || data?.listen_of || data?.play_of || data?.read_of || data?.watch_of || null
}

/**
 * @param {object} data
 * @returns {string}
 */
export const getPropertyURL = (data) => {
	const propertyData = getPropertyData(data)
	return propertyData?.url || propertyData
}

/**
 * @param {object} data
 * @returns {string|null}
 */
export const getPropertyTitle = (data) => {
	const propertyData = getPropertyData(data)
	return propertyData?.title || null
}

/**
 * @param {object} data
 * @returns {string}
 */
export const getPropertyTitleFallback = (data) => {
	if (getPropertyData(data)) {
		return `${getCategoryName(data)}: ${stripHTML(getPropertyURL(data))}`
	}
	return null
}

/**
 * @param {object} data
 * @returns {string}
 */
export const getPropertyLabel = (data) => {
	if (getPropertyData(data)) {
		let labelPrefix = getPropertyTitle(data) ? "Read" : "Read more on"
		if (data.drink_of) {
			labelPrefix = "Also on"
		} else if (data.listen_of) {
			labelPrefix = "Find out where to listen with"
		}
		return `${labelPrefix} ${getPropertyTitle(data) || getSyndicationTitle(getPropertyURL(data))}`
	}
	return null
}

/**
 * @param {object} data
 * @returns {object[]}
 */
export const getAuthors = (data) => {
	return data?.authors || getPropertyData(data)?.authors
}

/**
 * @param {object|string} author
 * @returns {object}
 */
export const getAuthorData = (author) => {
	const authorTitle = author?.title || author
	const authorURL = author?.url

	if (!authorTitle || !authorURL) {
		const person = getPerson(authorTitle, authorURL)
		if (person) {
			return person
		}
	}

	return {
		title: authorTitle,
		url: authorURL,
	}
}

/**
 * @param {object} author
 * @returns {string}
 */
const authorString = (author) => {
	if (!author.title) {
		const person = getPerson(null, author.url)
		if (person) {
			author.title = person.title
		}
		author.title = author.url
	}
	if (author.url) {
		return `<a href="${author.url}" class=" [ h-cite ] "${!author.url.includes(siteURL) && ` rel="external noopener"`}>${author.title}</a>`
	}
	return `<strong class=" [ h-cite ] ">${author.title}</strong>`
}

/**
 * @param {object} data
 * @returns {string}
 */
export const getAuthorsString = (data) => {
	if (getAuthors(data)) {
		return conjunction([...getAuthors(data)].map(getAuthorData).map(authorString))
	}
	return null
}

/**
 * @param {object} data
 * @returns {object|string}
 */
const getReplyData = (data) => {
	return data?.in_reply_to
}

/**
 * @param {object} data
 * @returns {string|null}
 */
export const getReplyTitle = (data) => {
	const replyData = getReplyData(data)
	if (replyData) {
		const replyURL = getReplyURL(data)
		if (!replyData.title) {
			const person = getPerson(null, replyURL)
			if (person) {
				return person.title
			}
			const internalTarget = getInternalTarget(replyURL)
			if (internalTarget) {
				return internalTarget
			}
		}
		return replyData?.title || replyData?.url || replyData
	}
	return null
}

/**
 * @param {object} data
 * @returns {string|null}
 */
export const getReplyURL = (data) => {
	const replyData = getReplyData(data)
	if (replyData) {
		const replyURL = replyData?.url || replyData
		if (replyURL) {
			return tweetback(replyURL)
		}
	}
	return null
}

/**
 * @param {object} data
 * @returns {string|null}
 */
export const getReplyAuthor = (data) => {
	const replyURL = getReplyURL(data)
	if (replyURL) {
		const person = getPerson(null, replyURL)
		if (person) {
			return person
		}
	}
	return null
}

/**
 * @param {object} data
 * @returns {string|null}
 */
export const getReplyAuthorString = (data) => {
	const replyAuthor = getReplyAuthor(data)
	if (replyAuthor) {
		return authorString(replyAuthor)
	}
	return null
}

/**
 * @param {object} data
 * @returns {string|null}
 */
export const getRSVPString = (data) => {
	const rsvp = data.rsvp
	if (rsvp) {
		return getRSVPValueHTML(rsvp.date, rsvp.end, rsvp.value)
	}
	return null
}

/**
 * @param {string} value
 * @returns {string}
 */
export const getInternalTarget = (url) => {
	// Mastodon
	if (url.includes("https://fediverse.repc.co") || url.includes("https://mastodon.social/users/chrisburnell/statuses/")) {
		return "a previous Mastodon post"
	}
	// Mastodon, external
	else if (mastodonInstances.includes(getHost(url))) {
		return getMastodonHandle(url)
	}
	// Twitter
	else if (url.includes("https://twitter.com/iamchrisburnell/status/") || url.includes("https://twitter.chrisburnell.com/")) {
		return "a previous Twitter post"
	}
	// Twitter, external
	else if (url.includes("https://twitter.com")) {
		return getTwitterHandle(url)
	}
	// Internal URL
	else if (url.includes(siteURL) || url.includes("localhost")) {
		const matchingPage = pages.find((page) => {
			return getPathname(url) === getPathname(page.url)
		})
		if (matchingPage) {
			// Posts with a `title` and `category`
			if ("title" in matchingPage && "category" in matchingPage) {
				return `${matchingPage.title}, a previous ${getCategoryName(matchingPage)}`
			}
			// Pages/Posts with a `title`
			else if ("title" in matchingPage) {
				return `${matchingPage.title}`
			}
			// Posts with a `category`
			else if ("category" in matchingPage) {
				return `a previous ${getCategoryName(matchingPage)}`
			}
		}
		// pages
		return `a previous page`
	}
	return null
}

/**
 * @param {object} data
 * @returns {string}
 */
export const getMetaTitle = (data) => {
	if ("title" in data) {
		return stripHTML(data.title)
	} else if ("rsvp" in data) {
		return `RSVP to ${stripHTML(getReplyTitle(data) || getReplyURL(data))}`
	} else if ("in_reply_to" in data) {
		return `Reply to ${stripHTML(getReplyTitle(data) || getReplyURL(data))}`
	} else if ("category" in data && getPropertyData(data)) {
		return `${getCategoryName(data)}: ${stripHTML(getPropertyTitle(data) || getPropertyURL(data))}`
	} else if ("category" in data) {
		return `${getCategoryName(data)} from ${friendlyDate(data.date)}`
	}
	return `A page on ${getHost(siteURL)}`
}
/**
 * @param {object} data
 * @returns {string}
 */
export const getMetaImage = (data) => {
	if (data.og_image) {
		return `${siteURL}${data.og_image}`
	} else if (data.banner || data.cover || data.photo) {
		const image = toArray(data.banner || data.cover || data.photo)[0]
		return `${siteURL}/images/built/${(image.url || image).replace("jpg", "jpeg")}`
	}
	return siteURL + favicon
}

export default {
	isPublished,
	notReply,
	getPropertyData,
	getPropertyTitle,
	getPropertyURL,
	getAuthors,
	getAuthorData,
	getAuthorsString,
	getReplyTitle,
	getReplyURL,
	getReplyAuthor,
	getReplyAuthorString,
	getRSVPString,
	getMetaTitle,
	getMetaImage,
}
