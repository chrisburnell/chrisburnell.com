import categories from "../../data/categories.js"
import ignoredTags from "../../data/ignoredTags.js"
import people from "../../data/people.js"
import blogroll from "../data/blogroll.js"
import emojis from "../data/emojis.js"
import { now } from "../data/global.js"
import { favicon, url as siteURL } from "../data/site.js"
import { epoch, friendlyDate } from "./dates.js"
import { capitalize, conjunction, stripHTML } from "./strings.js"
import { getHost, tweetback } from "./urls.js"
import { getMastodonHandle, getTwitterHandle, toArray } from "./utils.js"

const allPeople = [...blogroll, ...people]

const getPerson = (title, url) => {
	allPeople.forEach((person) => {
		if (title && title === person.title) {
			return person
		}
		if (url && person.url) {
			toArray(person.url).forEach((personURL) => {
				if (url.includes(personURL)) {
					return person
				}
			})
		}
	})
	return null
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
 * @param {object[]} array
 * @returns {object[]}
 */
export const arePublished = (array) => {
	return array.filter(isPublished)
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
 * @returns {string}
 */
export const getCategoryName = (data) => {
	return capitalize(data?.categoryProper || data?.category)
}

/**
 * @param {object[]} array
 * @param {object[]} filterList
 * @returns {object[]}
 */
const filterOut = (array, filterList) => {
	return array.filter((item) => {
		return !filterList.includes(item)
	})
}

/**
 * @param {object[]} array
 * @returns {object[]}
 */
export const categoryFilter = (array) => {
	return filterOut(array, categories)
}

/**
 * @param {object[]} array
 * @returns {object[]}
 */
export const tagFilter = (array) => {
	return filterOut(array, ignoredTags)
}

/**
 * @param {object[]} items
 * @param {string} year
 * @param {boolean} [blogOnly]
 * @returns {number}
 */
export const getCollectionCount = (items, year, blogOnly = false) => {
	return items
		.filter((item) => {
			if ("data" in item) {
				if ("draft" in item.data && item.data.draft === true) {
					return false
				}
				if ("published" in item.data && item.data.published === false) {
					return false
				}
				if (!("date" in item.data)) {
					return false
				}
				if (item.data.tags.includes("ignore") || (blogOnly && !item.data.tags.includes("blog"))) {
					return false
				}
			}
			return !!item.url
		})
		.filter((item) => {
			return !year || item.date.getFullYear() === parseInt(year, 10)
		}).length
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
export const getPropertyTitle = (data) => {
	const propertyData = getPropertyData(data)
	return propertyData?.title || propertyData?.url
}

/**
 * @param {object} data
 * @returns {string}
 */
export const getPropertyURL = (data) => {
	if (data.listen_of) {
		return `https://album.link/s/${data.listen_of}`
	} else if (data.read_of) {
		return `https://openlibrary.org/isbn/${data.read_of}`
	}
	const propertyData = getPropertyData(data)
	const url = propertyData?.url || propertyData
	return url ? tweetback(url) : null
}

/**
 * @param {object} data
 * @returns {object[]}
 */
export const getAuthors = (data) => {
	return getPropertyData(data)?.authors || data?.authors
}

/**
 * @param {object|string} author
 * @returns {object}
 */
export const getAuthorData = (author) => {
	const authorTitle = author?.title || author
	const authorURL = author?.url

	if (!authorTitle || !authorURL) {
		const personLookup = getPerson(authorTitle, authorURL)
		if (personLookup) {
			return personLookup
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
	author.title = getMastodonHandle(getTwitterHandle(author.title))
	if (author.url) {
		return `<a href="${author.url}" class=" [ h-cite ] "${!author.url.includes(siteURL) && ` rel="external"`}>${author.title}</a>`
	}
	return `<span class=" [ h-cite ] ">${author.title}</span>`
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

const getReplyData = (data) => {
	return data?.in_reply_to
}

export const getReplyTitle = (data) => {
	const replyData = getReplyData(data)
	if (replyData) {
		if (!replyData.title) {
			const replyURL = getReplyURL(data)
			const personLookup = getPerson(replyURL, replyURL)
			if (personLookup) {
				console.log(personLookup)
				return personLookup
			}
		}
		return replyData?.url || replyData
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
		const personLookup = getPerson(null, replyURL)
		if (personLookup) {
			return personLookup
		}
	}
	return null
}

/**
 * @param {object} data
 * @returns {string}
 */
export const getReplyAuthorString = (data) => {
	const replyAuthor = getReplyAuthor(data)
	if (replyAuthor) {
		return authorString(replyAuthor)
	}
	return null
}

const emojiFuture = `<c-emoji>${emojis.future}</c-emoji>`
const emojiGoing = `<c-emoji>${emojis.going}</c-emoji>`
const emojiHopefully = `<c-emoji>${emojis.hopefully}</c-emoji>`
const emojiNotGoing = `<c-emoji>${emojis.not_going}</c-emoji>`

export const getRSVPString = (data) => {
	const rsvp = data.rsvp
	if (rsvp) {
		if (rsvp.value === "yes") {
			if (epoch(rsvp.date) > now) {
				return `${emojiFuture} <small>going to</small>`
			}
			if (epoch(rsvp.date) <= now && now <= epoch(rsvp.end)) {
				return `${emojiGoing} <small>currently attending</small>`
			}
			return `${emojiGoing} <small>went to</small>`
		}
		if (rsvp.value === "maybe" || rsvp.value === "interested") {
			if (epoch(rsvp.date) > now) {
				return `${emojiHopefully} <small>hoping to go to</small>`
			}
			return `${emojiHopefully} <small>was hoping to go to</small>`
		}
		if (epoch(rsvp.date) > now) {
			return `${emojiNotGoing} <small>unable to go to</small>`
		}
		return `${emojiNotGoing} <small>was unable to go to</small>`
	}
	return null
}

/**
 * @param {object} data
 * @returns {string}
 */
export const getMetaTitle = async (data) => {
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

export const getMetaImage = async (data) => {
	if (data.banner || data.cover || data.photo) {
		const image = toArray(data.banner || data.cover || data.photo)[0]
		return `${siteURL}/images/built/${(image.url || image).replace("jpg", "jpeg")}`
	}

	return siteURL + favicon
}

export default {
	isPublished,
	arePublished,
	notReply,
	getCategoryName,
	categoryFilter,
	tagFilter,
	getCollectionCount,
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
