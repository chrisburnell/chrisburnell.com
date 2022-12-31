const path = require("path")
const URL = require("url").URL
const mapping = require("./mapping.js")

function isFullUrl(url) {
	try {
		new URL(url)
		return true
	} catch (e) {
		return false
	}
}

function parseSource(source) {
	let urlObject = new URL(source)
	if (urlObject.hostname === "twitter.com") {
		let [noop, username, statusStr, statusId] = urlObject.pathname.split("/")
		return {
			username: username,
			url: source,
			status: statusId,
		}
	}

	return {
		url: source,
	}
}

function normalizeUrlSlashes(...args) {
	let joined = path.join(...args.filter((entry) => !!entry))
	return joined.split(path.sep).join("/")
}

// source can be a path or a full tweet URL
module.exports = (source) => {
	// passthrough
	if (!isFullUrl(source)) {
		return source
	}

	let { username, status } = parseSource(source)

	if (username && mapping[username]) {
		let urlObject = new URL(mapping[username])
		urlObject.pathname = normalizeUrlSlashes(urlObject.pathname, status)

		let urlString = urlObject.toString()
		let hasTrailingSlash = source.endsWith("/")

		return urlString + (!urlString.endsWith("/") && hasTrailingSlash ? "/" : "")
	}

	return source
}
