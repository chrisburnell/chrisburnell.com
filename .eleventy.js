const fs = require("fs");

// Import 11ty plugins
const rssPlugin = require("@11ty/eleventy-plugin-rss");
const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
const RemoteCache = require('@11ty/eleventy-cache-assets');
const Image = require("@11ty/eleventy-img");
const imageAvatarPlugin = require("./src/_includes/plugins/imageAvatarPlugin.js");

// Import formats
const markdownFormat = require("./src/_includes/formats/markdownFormat.js");
const dateFormat = require("./src/_includes/formats/dateFormat.js");
const timeFormat = require("./src/_includes/formats/timeFormat.js");
const w3DateFormat = require("./src/_includes/formats/w3DateFormat.js");
const epochFormat = require("./src/_includes/formats/epochFormat.js");
const newBase60Format = require("./src/_includes/formats/newBase60Format.js");
const timezoneFormat = require("./src/_includes/formats/timezoneFormat.js");
const numberStringFormat = require("./src/_includes/formats/numberStringFormat.js");
const capitalizeFormat = require("./src/_includes/formats/capitalizeFormat.js");

// Import filters
const publishedFilter = require("./src/_includes/filters/publishedFilter.js");
const limitFilter = require("./src/_includes/filters/limit.js");
const keySortFilter = require("./src/_includes/filters/keySort.js");
const keyFilter = require("./src/_includes/filters/keyFilter.js");
const titleSortFilter = require("./src/_includes/filters/titleSort.js");
const tagFilter = require("./src/_includes/filters/tagFilter.js");
const categoryFilter = require("./src/_includes/filters/categoryFilter.js");
const toArrayFilter = require("./src/_includes/filters/toArray.js");
const getHostFilter = require("./src/_includes/filters/getHost.js");
const getPathFilter = require("./src/_includes/filters/getPath.js");
const getTargetFilter = require("./src/_includes/filters/getTarget.js");
const getMethodFilter = require("./src/_includes/filters/getMethod.js");
const getConsoleFilter = require("./src/_includes/filters/getConsole.js");
const getPersonFilter = require("./src/_includes/filters/getPerson.js");
const getMastodonHandleFilter = require("./src/_includes/filters/getMastodonHandle.js");
const getTwitterHandleFilter = require("./src/_includes/filters/getTwitterHandle.js");
const getPlaceFilter = require("./src/_includes/filters/getPlace.js");
const getInternalTargetFilter = require("./src/_includes/filters/getInternalTarget.js");
const getPostsTodayFilter = require("./src/_includes/filters/getPostsToday.js");
const getWebmentionsFilter = require("./src/_includes/filters/getWebmentions.js");
const getWebmentionReactionsFilter = require("./src/_includes/filters/getWebmentionReactions.js");
const getWebmentionRepliesFilter = require("./src/_includes/filters/getWebmentionReplies.js");
const getCountByYearFilter = require("./src/_includes/filters/getCountByYear.js");

// Import transforms
const htmlMinTransform = require("./src/_includes/transforms/html-min.js");
const parseTransform = require("./src/_includes/transforms/parse.js");

// Import builders
const categoriesBuilder = require("./src/_includes/builders/categories.js");
const tagsBuilder = require("./src/_includes/builders/tags.js");

// Import data
const global = require("./src/_data/global.js");
const helpers = require("./src/_data/helpers.js");
const site = require("./src/_data/site.json");
const author = require("./src/_data/author.json");
const webmentions = require("./src/_data/webmentions.json");

module.exports = function(config) {
    const now = new Date();
    config.setDataDeepMerge(true);

    // Simple Filters & Sorts
    const isPublished = item => !item.data.draft;
    const isNotReply = item => !item.data.in_reply_to;
    const dateSort = (a, b) => b.date - a.date;
    const isTodayRSVP = item => item.data.rsvp && dateFormat(item.data.rsvp.date) == dateFormat(now);
    const isFutureRSVP = item => item.data.rsvp && item.data.rsvp.date > now && dateFormat(item.data.rsvp.date) != dateFormat(now);

    // 11ty Plugins
    config.addPlugin(rssPlugin);
    config.addPlugin(syntaxHighlightPlugin);
    config.addPlugin(imageAvatarPlugin);

    // Formats
    config.addFilter("markdownFormat", markdownFormat);
    config.addFilter("dateFormat", dateFormat);
    config.addFilter("timeFormat", timeFormat);
    config.addFilter("w3DateFormat", w3DateFormat);
    config.addFilter("epochFormat", epochFormat);
    config.addFilter("newBase60Format", newBase60Format);
    config.addFilter("timezoneFormat", timezoneFormat);
    config.addFilter("numberStringFormat", numberStringFormat);
    config.addFilter("capitalizeFormat", capitalizeFormat);

    // Filters
    config.addFilter("publishedFilter", publishedFilter);
    config.addFilter("limit", limitFilter);
    config.addFilter("keySort", keySortFilter);
    config.addFilter("keyFilter", keyFilter);
    config.addFilter("titleSort", titleSortFilter);
    config.addFilter("tagFilter", tagFilter);
    config.addFilter("categoryFilter", categoryFilter);
    config.addFilter("toArray", toArrayFilter);
    config.addFilter("getHost", getHostFilter);
    config.addFilter("getPath", getPathFilter);
    config.addFilter("getTarget", getTargetFilter);
    config.addFilter("getMethod", getMethodFilter);
    config.addFilter("getConsole", getConsoleFilter);
    config.addFilter("getPerson", getPersonFilter);
    config.addFilter("getMastodonHandle", getMastodonHandleFilter);
    config.addFilter("getTwitterHandle", getTwitterHandleFilter);
    config.addFilter("getPlace", getPlaceFilter);
    config.addFilter("getInternalTarget", getInternalTargetFilter);
    config.addFilter("getPostsToday", getPostsTodayFilter);
    config.addFilter("getWebmentions", getWebmentionsFilter);
    config.addFilter("getWebmentionReactions", getWebmentionReactionsFilter);
    config.addFilter("getWebmentionReplies", getWebmentionRepliesFilter);
    config.addFilter("getCountByYear", getCountByYearFilter);

    // Transforms
    config.addTransform("htmlmin", htmlMinTransform);
    config.addTransform("parse", parseTransform);

    // Layouts
    config.addLayoutAlias("base", "layouts/base.njk");
    config.addLayoutAlias("page", "layouts/page.njk");
    config.addLayoutAlias("archive", "layouts/archive.njk");
    config.addLayoutAlias("post", "layouts/post.njk");
    config.addLayoutAlias("feed", "layouts/feed.njk");

    // Static Files
    config.addPassthroughCopy("css");
    config.addPassthroughCopy("fonts");
    config.addPassthroughCopy("images");
    config.addPassthroughCopy("src/js");
    config.addPassthroughCopy("src/serviceworker.js");
    config.addPassthroughCopy("static");

    // Pages Collection
    config.addCollection("pages", collection => {
        return collection.getFilteredByGlob("./src/pages/*.md")
            .filter(isPublished);
    });

    // HTTP Status Pages Collection
    config.addCollection("httpstatusPages", collection => {
        return collection.getFilteredByGlob("./src/pages/httpstatuses/*.md");
    });

    // Posts Collection
    config.addCollection("posts", collection => {
        return collection.getFilteredByGlob("./src/posts/**/*.md")
            .filter(isPublished)
            .sort(dateSort);
    });

    // Writing Posts Collection
    config.addCollection("writingPosts", collection => {
        return collection.getFilteredByTags("writing")
            .filter(isPublished)
            .sort(dateSort);
    });

    // Feature Posts Collection
    config.addCollection("featurePosts", collection => {
        return collection.getFilteredByTags("feature")
            .filter(isPublished)
            .filter(isNotReply)
            .sort(dateSort);
    });
    config.addCollection("featurePostsNotWriting", collection => {
        return collection.getFilteredByTags("feature")
            .filter(isPublished)
            // .filter(isNotReply)
            .filter(item => {
                return !item.data.tags.includes("writing");
            })
            .sort(dateSort)
            .slice(0, 3);
    });

    // Throwback Posts Collection
    config.addCollection("throwbackPosts", collection => {
        return collection.getFilteredByTags("throwback")
            .filter(isPublished)
            .filter(item => {
                if (item.data.rsvp || !item.data.in_reply_to) {
                    return true;
                }
                return false;
            })
            .filter(item => {
                if (item.date
                    && dateFormat(item.date, 'dd LLLL') == dateFormat(now, 'dd LLLL')
                    && dateFormat(item.date, 'yyyy') != dateFormat(now, 'yyyy')) {
                    return true;
                }
                else if (item.data.rsvp
                    && dateFormat(item.data.rsvp.date, 'dd LLLL') == dateFormat(now, 'dd LLLL')
                    && dateFormat(item.data.rsvp.date, 'yyyy') != dateFormat(now, 'yyyy')) {
                    return true;
                }
                else if (item.data.rsvp
                    && dateFormat(item.data.rsvp.finish, 'dd LLLL') == dateFormat(now, 'dd LLLL')
                    && dateFormat(item.data.rsvp.finish, 'yyyy') != dateFormat(now, 'yyyy')) {
                    return true;
                }
                return false;
            })
            .sort(dateSort);
    });

    // All Checkins Collection
    config.addCollection("checkins", collection => {
        return collection.getFilteredByGlob("./src/posts/**/*.md")
            .filter(isPublished)
            .filter(item => {
                return "checkin" in item.data;
            })
            .sort(dateSort);
    });

    // All RSVP Collection
    config.addCollection("replies", collection => {
        return collection.getFilteredByTags("note")
            .filter(isPublished)
            .filter(item => {
                return "in_reply_to" in item.data;
            })
            .filter(item => {
                if ("rsvp" in item.data) {
                    return false;
                }
                return true;
            })
            .sort(dateSort);
    });

    // Notes without Replies Collection
    config.addCollection("notesWithoutReplies", collection => {
        return collection.getFilteredByTags("note")
            .filter(isPublished)
            .filter(item => {
                if ("in_reply_to" in item.data) {
                    return false;
                }
                return true;
            })
            .sort(dateSort);
    });

    // All RSVP Collection
    config.addCollection("rsvps", collection => {
        return collection.getFilteredByGlob("./src/posts/**/*.md")
            .filter(isPublished)
            .filter(item => {
                return "rsvp" in item.data;
            })
            .sort(dateSort);
    });

    // Today RSVP Collection
    config.addCollection("todayRSVPs", collection => {
        return collection.getFilteredByGlob("./src/posts/**/*.md")
            .filter(isPublished)
            .filter(isTodayRSVP);
    });

    // Future RSVP Collection
    config.addCollection("futureRSVPs", collection => {
        return collection.getFilteredByGlob("./src/posts/**/*.md")
            .filter(isPublished)
            .filter(isFutureRSVP);
    });

    // Builder Collections
    config.addCollection("categories", categoriesBuilder);
    config.addCollection("tags", tagsBuilder);

    // 404
    config.setBrowserSyncConfig({
        callbacks: {
            ready: function(err, browserSync) {
                const content_404 = fs.readFileSync("_site/404.html");
                browserSync.addMiddleware("*", (req, res) => {
                    // Provides the 404 content without redirect.
                    res.write(content_404);
                    res.end();
                });
            }
        },
        ui: false,
        ghostMode: false
    });

    // Can I Use Embed
    config.addShortcode("caniuse", (feature, periods = 'future_1,current,past_1,past_2') => {
        return `<p class="ciu_embed" data-feature="${feature}" data-periods="${periods}">
        <a href="http://caniuse.com/#feat=${feature}">Can I Use ${feature}?</a> Data on support for the ${feature} feature across the major browsers from caniuse.com.
    </p><noscript>Please enable JavaScript to view the latest Can I Use Stats.</noscript>`;
    });

    // CodePen Embed
    config.addShortcode("codepen", (slug, tabfree = false, height = 400) => {
        return `<pre class="codepen" data-slug-hash="${slug}" data-default-tab="result" data-theme-id="${tabfree ? '8863' : '119'}" data-user="${author.codepen}" data-safe="true" data-height="${height.toString().replace('px','')}px">
        <code></code>
    </pre>`;
    });

    // Tweet Embed
    config.addShortcode("tweet", (body, url, showConversation = false) => {
        return `<blockquote class="twitter-tweet" data-conversation="${showConversation ? 'true' : 'false'}"><p>${body}</p><a href="${url}">Link to full tweet</a></blockquote><noscript>Please enable JavaScript to see Twitter-specific components.</noscript>`;
    });

    // Emoji
    config.addShortcode("emoji", (emoji, title = null) => {
        if (title) {
            return `<span class="emoji" title="${title}" aria-hidden="true">${emoji}</span><span class="hidden">${title}</span>`;
        }
        return `<span class="emoji" aria-hidden="true">${emoji}</span>`;
    });

    // SVG
    config.addShortcode("svg", (type) => {
        return `<svg class="icon  icon--${type}" role="img" aria-label="${type}"><use xlink:href="/images/sprites.svg#svg--${type}" /></svg>`
    });

    // Sparkline
    config.addShortcode("sparkline", (title, values) => {
        return `<canvas id="sparkline-${title}" class="sparkline" data-values="${values}" width="160" height="24" tabindex="0" hidden></canvas>`;
    });

    // Magic Image
    config.addNunjucksAsyncShortcode("picture", async function(src, alt, pictureClass = "", imgClass = "") {
        if (alt === undefined) {
            throw new Error(`Missing \`alt\` on {{ image }} from: ${src}`);
        }

        let stats = await Image(src, {
            widths: [null],
            urlPath: "/src/images/",
            outputDir: "images/"
        });
        let lowestImage = stats.jpeg ? stats.jpeg[0] : stats.png[0];

        return `<picture class="${pictureClass}">
                    ${Object.values(stats).map(type => {
                        return `<source type="image/${type[0].format}" srcset="${type.map(entry => `${entry.url} ${entry.url.includes('@') ? entry.url.split('@')[1].split('.')[0] : '1x'}`).join(", ")}">`;
                    }).join("\n")}
                    <img src="${lowestImage.url}"
                         class="${imgClass}"
                         alt="${alt}" loading="lazy">
                </picture>`
    });

    // Truncate Words
    const truncate = (() => {
        const truncate = (at, str = "", count = 1, end = "…") =>
            (at === "" ? str.substring(0, count) : str.split(at).splice(0, count).join(at)) + (str.split(at).length > count ? end : '');
        return Object.freeze({
            sentences: (...args) => truncate(".", ...args),
            words: (...args) => truncate(" ", ...args),
            characters: (...args) => truncate("", ...args)
        });
    })();
    config.addFilter("maxSentences", (string, count, condition = true) => {
        return (condition ? truncate.sentences(string, count) : string);
    });
    config.addFilter("maxWords", (string, count, condition = true) => {
        return (condition ? truncate.words(string, count) : string);
    });
    config.addFilter("maxChars", (string, count, condition = true) => {
        return (condition ? truncate.characters(string, count) : string);
    });

    return {
        dataTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
        passthroughFileCopy: true,
        dir: {
            input: "src"
        }
    };
};
