import EleventyFetch from "@11ty/eleventy-fetch"
import dotenv from "dotenv"
import { lastfm } from "./author.js"
import { cacheDurations } from "./site.js"
dotenv.config()

const recentTracks = async function () {
	let url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&username=${lastfm}&api_key=${process.env.LASTFM_API_TOKEN}&format=json&extended=1&limit=50`
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
	let url = `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&username=${lastfm}&api_key=${process.env.LASTFM_API_TOKEN}&format=json&limit=50&period=7day`
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

const topAlbumsAll = async function () {
	let url = `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&username=${lastfm}&api_key=${process.env.LASTFM_API_TOKEN}&format=json&limit=50&period=overall`
	let json = await EleventyFetch(url, {
		duration: cacheDurations.weekly,
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
	let url = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&username=${lastfm}&api_key=${process.env.LASTFM_API_TOKEN}&format=json&limit=50&period=7day`
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

const topArtistsAll = async function () {
	let url = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&username=${lastfm}&api_key=${process.env.LASTFM_API_TOKEN}&format=json&limit=50&period=overall`
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
	if (process.env.LASTFM_API_TOKEN) {
		return {
			recentTracks: await recentTracks(),
			topAlbums: await topAlbums(),
			topAlbumsAll: await topAlbumsAll(),
			topArtists: await topArtists(),
			topArtistsAll: await topArtistsAll(),
		}
	}
	return {
		recentTracks: [],
		topAlbums: [],
		topAlbumsAll: [],
		topArtists: [],
		topArtistsAll: [],
	}
}
