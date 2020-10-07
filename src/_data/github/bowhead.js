const CacheAsset = require("@11ty/eleventy-cache-assets");

module.exports = async function() {
    let url = "https://api.github.com/repos/chrisburnell/bowhead";
    let json = await CacheAsset(url, {
        duration: "1w",
        type: "json",
    });

    return json;
};
