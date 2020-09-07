const fs = require("fs");

// Import 11ty plugins
const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
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
const tagFilter = require("./src/_includes/filters/tagFilter.js");
const categoryFilter = require("./src/_includes/filters/categoryFilter.js");
const toArrayFilter = require("./src/_includes/filters/toArray.js");
const getHostFilter = require("./src/_includes/filters/getHost.js");
const getTargetFilter = require("./src/_includes/filters/getTarget.js");
const getPostingMethodFilter = require("./src/_includes/filters/getPostingMethod.js");
const getConsoleFilter = require("./src/_includes/filters/getConsole.js");
const getPersonFilter = require("./src/_includes/filters/getPerson.js");
const getMastodonHandleFilter = require("./src/_includes/filters/getMastodonHandle.js");
const getTwitterHandleFilter = require("./src/_includes/filters/getTwitterHandle.js");
const getPlaceFilter = require("./src/_includes/filters/getPlace.js");
const getInternalTargetFilter = require("./src/_includes/filters/getInternalTarget.js");
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
// const global = require("./src/_data/global.js");
// const helpers = require("./src/_data/helpers.js");
// const site = require("./src/_data/site.json");
const author = require("./src/_data/author.json");
// const webmentions = require("./src/_data/webmentions.json");

// Simple Filters & Sorts
const isPublished = item => !item.data.draft;
const isNotReply = item => !item.data.in_reply_to || (item.data.in_reply_to.url && item.data.in_reply_to.url.includes('https://chrisburnell.com')) || (item.data.in_reply_to && typeof item.data.in_reply_to === 'string' && item.data.in_reply_to.includes('https://chrisburnell.com'));
const dateSort = (a, b) => b.date - a.date;

module.exports = function(config) {
    const now = new Date();
    config.setDataDeepMerge(true);

    // 11ty Plugins
    config.addPlugin(syntaxHighlightPlugin);
    config.addPlugin(imageAvatarPlugin);

    // Transforms
    config.addTransform("htmlmin", htmlMinTransform);
    config.addTransform("parse", parseTransform);

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
    config.addFilter("tagFilter", tagFilter);
    config.addFilter("categoryFilter", categoryFilter);
    config.addFilter("toArray", toArrayFilter);
    config.addFilter("getHost", getHostFilter);
    config.addFilter("getTarget", getTargetFilter);
    config.addFilter("getPostingMethod", getPostingMethodFilter);
    config.addFilter("getConsole", getConsoleFilter);
    config.addFilter("getPerson", getPersonFilter);
    config.addFilter("getMastodonHandle", getMastodonHandleFilter);
    config.addFilter("getTwitterHandle", getTwitterHandleFilter);
    config.addFilter("getPlace", getPlaceFilter);
    config.addFilter("getInternalTarget", getInternalTargetFilter);
    config.addFilter("getWebmentions", getWebmentionsFilter);
    config.addFilter("getWebmentionReactions", getWebmentionReactionsFilter);
    config.addFilter("getWebmentionReplies", getWebmentionRepliesFilter);
    config.addFilter("getCountByYear", getCountByYearFilter);

    // Truncate Text Filters
    const truncate = (() => {
        const truncate = (at, str = "", count = 1, end = "…") =>
            (at === "" ? str.substring(0, count) : str.split(at).splice(0, count).join(at)) + (str.split(at).length > count ? end : '');
        return Object.freeze({
            sentences: (...args) => truncate(".", ...args),
            words: (...args) => truncate(" ", ...args),
            characters: (...args) => truncate("", ...args)
        });
    })();
    // config.addFilter("maxSentences", (string, count, condition = true) => {
    //     return (condition ? truncate.sentences(string, count) : string);
    // });
    config.addFilter("maxWords", (string, count, condition = true) => {
        return (condition ? truncate.words(string, count) : string);
    });
    // config.addFilter("maxChars", (string, count, condition = true) => {
    //     return (condition ? truncate.characters(string, count) : string);
    // });

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
    config.addPassthroughCopy("static");
    config.addPassthroughCopy("src/serviceworker.js");

    // Pages Collection
    config.addCollection("pages", collection => {
        return collection.getFilteredByTag("page")
            .filter(isPublished);
    });

    // HTTP Status Pages Collection
    config.addCollection("httpstatusPages", collection => {
        return collection.getFilteredByTag("httpstatus");
    });

    // Posts Collection
    config.addCollection("posts", collection => {
        return collection.getFilteredByTag("post")
            .filter(isPublished)
            .sort(dateSort);
    });

    // Writing Posts Collection
    config.addCollection("writingPosts", collection => {
        return collection.getFilteredByTag("writing")
            .filter(isPublished)
            .sort(dateSort);
    });

    // Feature Posts Collection
    config.addCollection("featurePosts", collection => {
        return collection.getFilteredByTag("feature")
            .filter(isPublished)
            .filter(isNotReply)
            .sort(dateSort);
    });
    config.addCollection("featurePostsNotWriting", collection => {
        return collection.getFilteredByTag("feature")
            .filter(item => {
                return !item.data.tags.includes("writing");
            })
            .filter(isPublished)
            .filter(isNotReply)
            .sort(dateSort)
            .slice(0, 3);
    });

    // Throwback Posts Collection
    config.addCollection("throwbackPosts", collection => {
        return collection.getFilteredByTag("throwback")
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
        return collection.getFilteredByTag("post")
            .filter(isPublished)
            .filter(item => {
                return "checkin" in item.data;
            })
            .sort(dateSort);
    });

    // All RSVP Collection
    config.addCollection("replies", collection => {
        return collection.getFilteredByTag("note")
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
        return collection.getFilteredByTag("note")
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
        return collection.getFilteredByTag("post")
            .filter(isPublished)
            .filter(item => {
                return "rsvp" in item.data;
            })
            .sort(dateSort);
    });

    // Today RSVP Collection
    config.addCollection("todayRSVPs", collection => {
        return collection.getFilteredByTag("post")
            .filter(isPublished)
            .filter(item => item.data.rsvp && dateFormat(item.data.rsvp.date) == dateFormat(now));
    });

    // Future RSVP Collection
    config.addCollection("futureRSVPs", collection => {
        return collection.getFilteredByTag("post")
            .filter(isPublished)
            .filter(item => item.data.rsvp && epochFormat(item.data.rsvp.date) > now && dateFormat(item.data.rsvp.date) != dateFormat(now));
    });

    // Builder Collections
    config.addCollection("categories", categoriesBuilder);
    config.addCollection("tags", tagsBuilder);

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

    // Sparkline
    config.addShortcode("sparkline", (title, collection) => {
        let values = [];
        let week = (1000 * 60 * 60 * 24  * 7);
        let end, before, count;
        for (let i = 0; i < 26; i++) {
            end = epochFormat(now) - (i * week);
            before = epochFormat(now) - ((i + 1) * week);
            count = 0;
            for (let item of collection) {
                if (before < epochFormat(item.date) && epochFormat(item.date) < end) {
                    count++;
                }
            }
            values.push(count);
            end = before - 1;
            before = before - (60 * 60 * 24  * 7);
        }
        return `<canvas id="sparkline-${title}" class="sparkline" data-values="${values.reverse().join(',')}" width="160" height="24" tabindex="0"></canvas>`;
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
