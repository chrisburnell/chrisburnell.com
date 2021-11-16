const author = require("../data/author.json")
const dateFilters = require("./filters/dates.js")

const now = new Date()

module.exports = {
    caniuse: (feature, periods = 'future_1,current,past_1,past_2') => {
        return `<p class="ciu_embed" data-feature="${feature}" data-periods="${periods}"><a href="http://caniuse.com/#feat=${feature}">Can I Use ${feature}?</a> Data on support for the ${feature} feature across the major browsers from caniuse.com.</p><noscript>Please enable JavaScript to view the latest Can I Use Stats.</noscript>`
    },
    codepen: (slug, tabfree = false, height = 400) => {
        return `<pre class="codepen" data-slug-hash="${slug}" data-default-tab="result" data-theme-id="${tabfree ? '8863' : '119'}" data-user="${author.codepen}" data-safe="true" data-height="${height.toString().replace('px','')}px"><code></code></pre>`
    },
    tweet: (body, url, showConversation = false) => {
        return `<blockquote class="twitter-tweet" data-conversation="${showConversation ? 'true' : 'false'}"><p>${body}</p><a href="${url}">Link to full tweet</a></blockquote><noscript>Please enable JavaScript to see Twitter-specific components.</noscript>`
    },
    emoji: (emoji, title = null) => {
        if (title) {
            return `<span class="emoji" title="${title}" aria-hidden="true">${emoji}</span><span class="hidden">${title}</span>`
        }
        return `<span class="emoji" aria-hidden="true">${emoji}</span>`
    },
    sparkline: (title, collection, startLabel, endLabel) => {
        const startYear = parseFloat(dateFilters.friendlyDate(collection[collection.length - 1].date, "yyyy"))
        const endYear = parseFloat(dateFilters.friendlyDate(now, "yyyy"))
        let values = []
        let count
        for (let i = startYear; i <= endYear; i++) {
            count = 0
            for (let item of collection) {
                if (i === parseFloat(dateFilters.friendlyDate(item.date, "yyyy"))) {
                    count++
                }
            }
            values.push(Math.min(count, 12))
        }
        return `<spark-line values="${values.join(',')}" endpoint-color="#eb2d36" ${startLabel ? "start-label=\"" + startLabel + "\"" : ""} ${endLabel ? "end-label=\"" + endLabel + "\"" : ""} class="pentatonic"></spark-line>`
    }
}
