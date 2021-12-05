const Cache = require("@11ty/eleventy-cache-assets")

module.exports = async () => {
	// let url = "https://api.npmjs.org/downloads/point/last-month/@chrisburnell/eleventy-cache-webmentions"
	// let json = await Cache(url, {
	// 	duration: "1w",
	// 	type: "json",
	// })

	// return json

	return {
		downloads: 0,
		start: "2021-11-05",
		end: "2021-12-04",
		package: "@chrisburnell/eleventy-cache-webmentions",
	}
}
