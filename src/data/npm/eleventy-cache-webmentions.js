const Cache = require("@11ty/eleventy-cache-assets")

module.exports = async () => {
	let url = "https://api.npmjs.org/downloads/point/last-month/@chrisburnell/eleventy-cache-webmentions"
	let json = await Cache(url, {
		duration: "1w",
		type: "json",
	})

	return json
}
