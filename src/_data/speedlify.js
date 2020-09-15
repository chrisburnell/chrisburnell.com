const CacheAsset = require("@11ty/eleventy-cache-assets");

module.exports = async function() {
    let url = "https://speedlify.chrisburnell.com/api/urls.json";
    let json = await CacheAsset(url, {
        duration: "1w",
        type: "json",
    });

    return json;
};
