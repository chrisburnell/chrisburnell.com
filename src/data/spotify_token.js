const { AssetCache } = require("@11ty/eleventy-fetch")

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET

const duration = "59m"

const fetchSpotifyTokenData = async () => {
	let asset = new AssetCache("spotify_token", ".cache", {
		duration: duration,
	})
	asset.ensureDir()

	if (asset.isCacheValid(duration)) {
		return await asset.getCachedValue()
	}

	// TODO
	// const authorization_request = await fetch(`https://accounts.spotify.com/api/token`, {
	// 	method: "POST",
	// 	headers: {
	// 		Authorization: `Basic ${Buffer.from(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString("base64")}`,
	// 		"Content-Type": "application/json",
	// 	},
	// 	body: {
	// 		grant_type: "client_credentials",
	// 	},
	// })
	// if (authorization_request.ok) {
	// 	const authorization_response = await authorization_request.json()
	// 	await asset.save(authorization_response, "json")
	// 	return authorization_response
	// }

	if (asset.isCacheValid("9001y")) {
		return await asset.getCachedValue()
	}

	return false
}

module.exports = async () => {
	const data = await fetchSpotifyTokenData()

	return data.access_token
}
