const CacheAsset = require("@11ty/eleventy-cache-assets")

const author = require("./author.json")

module.exports = async function() {
    let url = `${author.urls.speedlify}/api/urls.json`
    let json = await CacheAsset(url, {
        duration: "1h",
        type: "json",
    })
    return json
}
