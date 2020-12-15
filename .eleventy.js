const fs = require("fs")

// Import Eleventy plugins
const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight")
const imageAvatarPlugin = require("./src/eleventy/plugins/imageAvatarPlugin.js")

// Import transforms
const htmlMinTransform = require("./src/eleventy/transforms/html-min.js")
const parseTransform = require("./src/eleventy/transforms/parse.js")

// Import filters
const dateFilters = require("./src/eleventy/filters/dates.js")
const stringFilters = require("./src/eleventy/filters/strings.js")
const queryFilters = require("./src/eleventy/filters/queries.js")
const utilityFilters = require("./src/eleventy/filters/utils.js")
const collectionFilters = require("./src/eleventy/filters/collections.js")
const newBase60 = require("./src/eleventy/filters/newBase60.js")

// Import shortcodes
const shortcodes = require("./src/eleventy/shortcodes.js")

// Import collections
const collections = require("./src/eleventy/collections.js")

// Import collectionsbuilders
const categoriesBuilder = require("./src/eleventy/builders/categories.js")
const tagsBuilder = require("./src/eleventy/builders/tags.js")

module.exports = function(config) {
    // Eleventy Plugins
    config.addPlugin(syntaxHighlightPlugin)
    config.addPlugin(imageAvatarPlugin)

    // Transforms
    config.addTransform("htmlmin", htmlMinTransform)
    config.addTransform("parse", parseTransform)

    // Filters
    Object.keys(dateFilters).forEach(filterName => {
        config.addFilter(filterName, dateFilters[filterName])
    })
    Object.keys(stringFilters).forEach(filterName => {
        config.addFilter(filterName, stringFilters[filterName])
    })
    Object.keys(queryFilters).forEach(filterName => {
        config.addFilter(filterName, queryFilters[filterName])
    })
    Object.keys(utilityFilters).forEach(filterName => {
        config.addFilter(filterName, utilityFilters[filterName])
    })
    Object.keys(collectionFilters).forEach(filterName => {
        config.addFilter(filterName, collectionFilters[filterName])
    })
    config.addFilter("newBase60", newBase60)

    // Shortcodes
    Object.keys(shortcodes).forEach(shortcodeName => {
        config.addShortcode(shortcodeName, shortcodes[shortcodeName])
    })

    // Collections
    Object.keys(collections).forEach(collectionName => {
        config.addCollection(collectionName, collections[collectionName])
    })

    // Builder Collections
    config.addCollection("categories", categoriesBuilder)
    config.addCollection("tags", tagsBuilder)

    // Layouts
    config.addLayoutAlias("base", "base.njk")
    config.addLayoutAlias("page", "page.njk")
    config.addLayoutAlias("archive", "archive.njk")
    config.addLayoutAlias("post", "post.njk")
    config.addLayoutAlias("feed", "feed.njk")

    // Static Files
    config.addPassthroughCopy("css")
    config.addPassthroughCopy("fonts")
    config.addPassthroughCopy("images")
    config.addPassthroughCopy("static")
    config.addPassthroughCopy("src/js")

    // Watch targets
    config.addWatchTarget("./src/css/")
    config.addWatchTarget("./src/js/")

    // 404
    config.setBrowserSyncConfig({
        callbacks: {
            ready: function(err, browserSync) {
                const content_404 = fs.readFileSync("_site/404.html")
                browserSync.addMiddleware("*", (req, res) => {
                    // Provides the 404 content without redirect.
                    res.write(content_404)
                    res.end()
                })
            }
        },
        ui: false,
        ghostMode: false
    })

    config.setDataDeepMerge(true)

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
    }
}
