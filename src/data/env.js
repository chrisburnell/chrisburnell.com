require("dotenv").config()

module.exports = {
	DIRECTORY_OUTPUT: process.env.DIRECTORY_OUTPUT,
	ELEVENTY_PRODUCTION: process.env.ELEVENTY_PRODUCTION,
	PREGENERATE_IMAGES: process.env.PREGENERATE_IMAGES,
}
