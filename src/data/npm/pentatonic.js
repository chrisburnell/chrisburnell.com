const Cache = require("@11ty/eleventy-fetch")

module.exports = async () => {
	let url = "https://api.npmjs.org/downloads/point/last-month/@chrisburnell/pentatonic"
	let json = await Cache(url, {
		duration: "1w",
		type: "json",
	})

	return json
}
