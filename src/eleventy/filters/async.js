module.exports = {
	tweetback: async (url) => {
		try {
			const { transform } = await import("@tweetback/canonical")
			return transform(url)
		} catch (e) {
			return url
		}
	},
}
