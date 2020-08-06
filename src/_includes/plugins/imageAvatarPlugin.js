const author = require("../../_data/author.json");
const getHost = require("../filters/getHost.js");
const getTwitterAvatarUrl = require("twitter-avatar-url");
const Image = require("@11ty/eleventy-img");
const RemoteCache = require("@11ty/eleventy-cache-assets");
const AssetCache = RemoteCache.AssetCache;

function getImageMarkup(imageData, props = {}) {
    if(!props.alt) {
        throw new Error("alt property required in `img` shortcode.")
    }

    let webp = imageData.webp[0];
    let jpeg = imageData.jpeg[0];

    return [
`<picture class=" [ avatar ] ">`,
    `<source type="${webp.sourceType}" srcset="${webp.url}" />`,
    `<img class=" [ u-photo ] " alt="${props.alt}" src="${jpeg.url}" width="${jpeg.width}" height="${jpeg.height}" loading="lazy">`,
"</picture>"].join("");
};

async function getImageData(url) {
    if (!url) {
        throw new Error("src property required in `img` shortcode.");
    }

    let imageData = await Image(url, {
        widths: [48],
        urlPath: "/images/avatars/",
        outputDir: "images/avatars",
        formats: ["webp", "jpeg"],
        cacheOptions: {
            duration: "8w"
        }
    });

    return imageData;
}

module.exports = function(config) {
    config.addNunjucksAsyncShortcode("avatar", async function(photo, url, authorUrl) {
        // normalise author URL
        authorUrl = authorUrl ? authorUrl : url;

        let twitterUsername, host, asset, imgData;

        // Webmention is from Twitter
        if (url.includes('https://twitter.com')) {
            // Webmention is by me
            if (authorUrl == 'https://chrisburnell.com' || authorUrl == 'https://twitter.com/iamchrisburnell') {
                return [
                    `<picture class=" [ avatar ] ">`,
                        `<source type="webp" srcset="/images/avatar.webp" />`,
                        `<img alt="" src="/images/avatar.jpg" width="48" height="48" loading="lazy">`,
                    `</picture>`
                ].join("");
            }
            // Webmention is an interaction against my tweet, so username lives in author URL
            else if (url.includes('https://twitter.com/iamchrisburnell')) {
                twitterUsername = authorUrl.split('twitter.com/')[1];
            }
            // Webmention is an original tweet by another Twitter user
            else {
                twitterUsername = url.split('twitter.com/')[1].split('/status/')[0];
            }
            asset = new AssetCache(`avatar-twitter-${twitterUsername}`);
        }
        // Webmention is from my website
        else if (url.includes('https://chrisburnell.com')) {
            return [
                `<picture class=" [ avatar ] ">`,
                    `<source type="webp" srcset="/images/avatar.webp" />`,
                    `<img alt="" src="/images/avatar.jpg" width="48" height="48" loading="lazy">`,
                `</picture>`
            ].join("");
        }
        // Webmention is from a personal URL and has a photo attached
        else if (photo) {
            host = getHost(authorUrl);
            asset = new AssetCache(`avatar-url-${host}`);
        }
        // Webmention is from a personal URL and has no photo
        else {
            return [
                `<picture class=" [ avatar ] ">`,
                    `<source type="webp" srcset="/images/default-profile.webp" />`,
                    `<img alt="" src="/images/default-profile.jpg" width="48" height="48" loading="lazy">`,
                `</picture>`
            ].join("");
        }

        // Check if asset is in cache and past valid date
        if (asset.isCacheValid("8w")) {
            return asset.getCachedValue();
        }

        if (twitterUsername) {
            // Attempt to get the profile picture if the account still exists
            try {
                let twitterAvatarInfo = await getTwitterAvatarUrl(twitterUsername);
                imgData = await getImageData(twitterAvatarInfo.url.small);
                console.log(`Twitter image for @${twitterUsername}:`, twitterAvatarInfo.url.small);
            }
            // Serve the default if not
            catch {
                return [
                    `<picture class=" [ avatar ] ">`,
                        `<source type="webp" srcset="/images/default-profile.webp" />`,
                        `<img alt="" src="/images/default-profile.jpg" width="48" height="48" loading="lazy">`,
                    `</picture>`
                ].join("");
            }
        }
        else {
            imgData = await getImageData(photo);
            console.log(`Host image for ${host}:`, photo);
        }


        let markup = getImageMarkup(imgData, {
            alt: `Avatar for ${twitterUsername || host}`
        });
        asset.save(markup, "text");
        return markup;
    });
};
