require("dotenv").config()

module.exports = {
	ELEVENTY_PRODUCTION: process.env.ELEVENTY_PRODUCTION,
	PREGENERATE_IMAGES: process.env.PREGENERATE_IMAGES,
}
