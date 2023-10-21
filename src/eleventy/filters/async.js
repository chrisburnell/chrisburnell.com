module.exports = {
	/**
	 * Gets a Tweetback URL from a Twitter URL if it exists.
	 * @param {String} url
	 * @returns {String}
	 */
	tweetback: async (url) => {
		try {
			const { transform } = await import("@tweetback/canonical")
			return transform(url)
		} catch (e) {
			return url
		}
	},
}
