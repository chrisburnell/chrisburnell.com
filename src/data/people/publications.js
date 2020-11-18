const CacheAsset = require("@11ty/eleventy-cache-assets");

// Load .env variables with dotenv
require("dotenv").config();

// Define Cache Location and API Endpoint
const API_ORIGIN = `${process.env.PERSONAL_API_URL}/publications.json`
const TOKEN = process.env.PERSONAL_API_TOKEN

module.exports = async function() {
    // If we dont have a token, abort
    if (!TOKEN) {
        console.warn("Unable to fetch WebMentions: no access token specified in environment!")
        return false
    }

    let url = `${API_ORIGIN}?token=${TOKEN}`;
    let json = await CacheAsset(url, {
        duration: "1w",
        type: "json",
    });
    return json;
};
