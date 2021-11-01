const CacheAsset = require("@11ty/eleventy-cache-assets")

module.exports = async function() {
    let url = "https://api.github.com/repos/chrisburnell/spark-line"
    let json = await CacheAsset(url, {
        duration: "1d",
        type: "json",
    })

    return json
}
