const fs = require("fs");

// Import Eleventy plugins
const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
const Image = require("@11ty/eleventy-img");
const imageAvatarPlugin = require("./src/eleventy/plugins/imageAvatarPlugin.js");

// Import transforms
const htmlMinTransform = require("./src/eleventy/transforms/html-min.js");
const parseTransform = require("./src/eleventy/transforms/parse.js");

// Import filters
const dateFilters = require("./src/eleventy/filters/dates.js");
const stringFilters = require("./src/eleventy/filters/strings.js");
const queryFilters = require("./src/eleventy/filters/queries.js");
const collectionFilters = require("./src/eleventy/filters/collections.js");
const utilityFilters = require("./src/eleventy/filters/utils.js");
const newBase60 = require("./src/eleventy/filters/newBase60.js");

// Import builders
const categoriesBuilder = require("./src/eleventy/builders/categories.js");
const tagsBuilder = require("./src/eleventy/builders/tags.js");

// Import collections logic
const collections = require("./src/eleventy/collections.js");

// Import shortcodes logic
const shortcodes = require("./src/eleventy/shortcodes.js");

module.exports = function(config) {
    config.setDataDeepMerge(true);

    // Eleventy Plugins
    config.addPlugin(syntaxHighlightPlugin);
    config.addPlugin(imageAvatarPlugin);

    // Transforms
    config.addTransform("htmlmin", htmlMinTransform);
    config.addTransform("parse", parseTransform);

    // Date Filters
    config.addFilter("friendlyDate", dateFilters.friendly);
    config.addFilter("isoDate", dateFilters.iso);
    config.addFilter("httpDate", dateFilters.http);
    config.addFilter("epoch", dateFilters.epoch);
    config.addFilter("friendlyTime", dateFilters.time);
    config.addFilter("friendlyTimezone", dateFilters.timezone);

    // String Filters
    config.addFilter("capitalizeFormat", stringFilters.capitalize);
    config.addFilter("markdownFormat", stringFilters.markdown);
    config.addFilter("numberStringFormat", stringFilters.numberString);
    config.addFilter("maxSentences", stringFilters.maxSentences);
    config.addFilter("maxWords", stringFilters.maxWords);
    config.addFilter("maxChars", stringFilters.maxChars);

    // Query Filters
    config.addFilter("getConsole", queryFilters.console);
    config.addFilter("getCountByYear", queryFilters.countByYear);
    config.addFilter("getHost", queryFilters.host);
    config.addFilter("getInternalTarget", queryFilters.internal);
    config.addFilter("getMastodonHandle", queryFilters.mastodonHandle);
    config.addFilter("getPerson", queryFilters.person);
    config.addFilter("getPlace", queryFilters.place);
    config.addFilter("getPostingMethod", queryFilters.postingMethod);
    config.addFilter("getTarget", queryFilters.target);
    config.addFilter("getTwitterHandle", queryFilters.twitterHandle);
    config.addFilter("getWebmentionReactions", queryFilters.webmentionReactions);
    config.addFilter("getWebmentionReplies", queryFilters.webmentionReplies);
    config.addFilter("getWebmentions", queryFilters.webmentions);

    // Collection Filters
    config.addFilter("publishedFilter", (array) => array.filter(collectionFilters.published));
    config.addFilter("tagFilter", collectionFilters.tag);
    config.addFilter("categoryFilter", collectionFilters.category);

    // Utility Filters
    config.addFilter("keySort", utilityFilters.keySort);
    config.addFilter("limit", utilityFilters.limit);
    config.addFilter("toArray", utilityFilters.toArray);

    // NewBase60 Magic Filter
    config.addFilter("newBase60", newBase60);

    // Layouts
    config.addLayoutAlias("base", "base.njk");
    config.addLayoutAlias("page", "page.njk");
    config.addLayoutAlias("archive", "archive.njk");
    config.addLayoutAlias("post", "post.njk");
    config.addLayoutAlias("feed", "feed.njk");

    // Static Files
    config.addPassthroughCopy("css");
    config.addPassthroughCopy("fonts");
    config.addPassthroughCopy("images");
    config.addPassthroughCopy("static");
    config.addPassthroughCopy("src/js");

    // Collections
    config.addCollection("pages", collections.page);
    config.addCollection("posts", collections.post);
    config.addCollection("writingPosts", collections.writing);
    config.addCollection("featurePosts", collections.feature);
    config.addCollection("featurePostsNotWriting", collections.featureWithoutWriting);
    config.addCollection("throwbackPosts", collections.throwback);
    config.addCollection("checkins", collections.checkin);
    config.addCollection("replies", collections.reply);
    config.addCollection("notesWithoutReplies", collections.noteWithoutReply);
    config.addCollection("rsvps", collections.rsvp);
    config.addCollection("todayRSVPs", collections.rsvpToday);
    config.addCollection("futureRSVPs", collections.rsvpFuture);

    // Builder Collections
    config.addCollection("categories", categoriesBuilder);
    config.addCollection("tags", tagsBuilder);

    // Shortcodes
    config.addShortcode("caniuse", shortcodes.caniuse);
    config.addShortcode("codepen", shortcodes.codepen);
    config.addShortcode("tweet", shortcodes.tweet);
    config.addShortcode("emoji", shortcodes.emoji);
    config.addShortcode("sparkline", shortcodes.sparkline);

    // Watch targets
    config.addWatchTarget("./src/css/");
    config.addWatchTarget("./js/");

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
            input: "src",
			includes: "includes",
			layouts: "layouts",
			data: "data"
        }
    };
};
