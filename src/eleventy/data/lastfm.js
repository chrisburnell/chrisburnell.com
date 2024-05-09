import EleventyFetch from "@11ty/eleventy-fetch"
import dotenv from "dotenv"
import { lastfm } from "./author.js"
import { cacheDurations } from "./site.js"
dotenv.config()

const recentTracks = async function () {
	let url = `https://api.chrisburnell.com/lastfm-recenttracks?username=${lastfm}&limit=10&secret=${process.env.PERSONAL_API_KEY}`
	let json = await EleventyFetch(url, {
		duration: cacheDurations.hourly,
		type: "json",
	})
	return json.map((track) => {
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
	let url = `https://api.chrisburnell.com/lastfm-topalbums?username=${lastfm}&limit=5&period=7day&secret=${process.env.PERSONAL_API_KEY}`
	let json = await EleventyFetch(url, {
		duration: cacheDurations.hourly,
		type: "json",
	})
	return json.map((album) => {
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
	let url = `https://api.chrisburnell.com/lastfm-topartists?username=${lastfm}&limit=5&period=7day&secret=${process.env.PERSONAL_API_KEY}`
	let json = await EleventyFetch(url, {
		duration: cacheDurations.hourly,
		type: "json",
	})
	return json.map((artist) => {
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
			topArtists: await topArtists(),
		}
	}
	return {
		recentTracks: [],
		topAlbums: [],
		topArtists: [],
	}
}
