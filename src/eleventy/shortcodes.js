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
    sparkline: (title, collection, weekRange = 52) => {
        const MS = 1000
        const WEEK = 60 * 60 * 24 * 7
        let values = []
        let end, before, count
        for (let i = 0; i < weekRange; i++) {
            end = dateFilters.epoch(now) - (i * WEEK * MS)
            before = dateFilters.epoch(now) - ((i + 1) * WEEK * MS)
            count = 0
            for (let item of collection) {
                if (before < dateFilters.epoch(item.date) && dateFilters.epoch(item.date) < end) {
                    count++
                }
            }
            values.push(Math.min(count, 12))
            end = before - 1
            before = before - WEEK
        }
        return `<spark-line values="${values.reverse().join(',')}" endpoint-color="hsla(357, 83%, 55%, 0.5)" class="pentatonic"></spark-line>`
    }
}
