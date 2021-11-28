const Cache = require("@11ty/eleventy-cache-assets")

module.exports = async () => {
	let url = "https://api.github.com/repos/chrisburnell/bowhead"
	let json = await Cache(url, {
		duration: "1w",
		type: "json",
	})

	return json
}
