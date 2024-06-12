// import EleventyFetch from "@11ty/eleventy-fetch"
import dotenv from "dotenv"
// import { cacheDurations } from "./site.js"
dotenv.config()

export default async function () {
	return true
}

// export default async function () {
// 	const url = "https://api.darkvisitors.com/robots-txts"
// 	const text = await EleventyFetch(url, {
// 		duration: cacheDurations.daily,
// 		type: "text",
// 		fetchOptions: {
// 			method: "POST",
// 			headers: {
// 				Authorization: "Bearer " + process.env.DARK_VISITORS_API_TOKEN,
// 			},
// 			body: {
// 				agent_types: ["AI Data Scraper", "AI Search Crawler"],
// 				disallow: "/",
// 			},
// 		},
// 	})
// 	console.log(text)
// 	return text
// }
