const EleventyFetch = require("@11ty/eleventy-fetch")

const author = require("#data/author")

module.exports = async () => {
	let url = `${author.urls.speedlify}/api/urls.json`
	let json = await EleventyFetch(url, {
		duration: "1w",
		type: "json",
	})
	return json
}
