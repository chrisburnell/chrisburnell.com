const Cache = require("@11ty/eleventy-fetch")

const author = require("./author.json")

module.exports = async () => {
	let url = `${author.urls.speedlify}/api/urls.json`
	let json = await Cache(url, {
		duration: "1w",
		type: "json",
	})
	return json
}
