const EleventyFetch = require("@11ty/eleventy-fetch")

const author = require("#data/author")
const site = require("#data/site")

module.exports = async () => {
	let url = `${author.urls.speedlify}/api/urls.json`
	let json = await EleventyFetch(url, {
		duration: site.cacheDurations.long,
		type: "json",
	})
	return json
}
