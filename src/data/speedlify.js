const EleventyFetch = require("@11ty/eleventy-fetch")

const {
	urls: { speedlify },
} = require("#data/author")
const { cacheDurations } = require("#data/site")

module.exports = async () => {
	let url = `${speedlify}/api/urls.json`
	let json = await EleventyFetch(url, {
		duration: cacheDurations.weekly,
		type: "json",
	})
	return json
}
