import EleventyFetch from "@11ty/eleventy-fetch"
import dotenv from "dotenv"
import { lastfm } from "./author.js"
import { cacheDurations } from "./site.js"
dotenv.config()

const lastfmApiUrl = `https://ws.audioscrobbler.com/2.0/?user=${lastfm}&api_key=${process.env.LASTFM_API_TOKEN}&format=json`

const recentTracks = async function () {
	let url = `${lastfmApiUrl}&method=user.getrecenttracks&limit=10&extended=1`
	let json = await EleventyFetch(url, {
		duration: cacheDurations.hourly,
		type: "json",
	})
	return json.recenttracks.track.map((track) => {
		const datetime = track.date ? new Date(Number(track.date.uts) * 1000).toISOString() : new Date().toISOString()
		let image = track.image[3]?.["#text"]
		if (!image || image.includes("2a96cbd8b46e442fc41c2b86b821562f.png")) {
			image = "/images/default-album-cover.png"
		}
		return Object.assign({}, track, {
			datetime: datetime,
			imageUrl: image,
		})
	})
}

const topAlbums = async function () {
	let url = `${lastfmApiUrl}&method=user.gettopalbums&limit=5&period=7day`
	let json = await EleventyFetch(url, {
		duration: cacheDurations.hourly,
		type: "json",
	})
	return json.topalbums.album.map((album) => {
		let image = album.image[3]?.["#text"]
		if (!image || image.includes("2a96cbd8b46e442fc41c2b86b821562f.png")) {
			image = "/images/default-album-cover.png"
		}
		return Object.assign({}, album, {
			imageUrl: image,
		})
	})
}

const topArtists = async function () {
	let url = `${lastfmApiUrl}&method=user.gettopartists&limit=5&period=7day`
	let json = await EleventyFetch(url, {
		duration: cacheDurations.hourly,
		type: "json",
	})
	return json.topartists.artist.map((artist) => {
		let image = artist.image[3]?.["#text"]
		if (!image || image.includes("2a96cbd8b46e442fc41c2b86b821562f.png")) {
			image = "/images/default-album-cover.png"
		}
		return Object.assign({}, artist, {
			imageUrl: image,
		})
	})
}

export default async function () {
	return {
		recentTracks: await recentTracks(),
		topAlbums: await topAlbums(),
		topArtists: await topArtists(),
	}
}
