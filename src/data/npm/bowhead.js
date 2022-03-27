const EleventyFetch = require("@11ty/eleventy-fetch")

module.exports = async () => {
	let url = "https://api.npmjs.org/downloads/point/last-month/@chrisburnell/bowhead"
	let json = await EleventyFetch(url, {
		duration: "1w",
		type: "json",
	})

	return json
}
