const site = require("../../data/site.json")
const categories = require("../../data/categories.json")
const ignoredTags = require("../../data/ignoredTags.json")

module.exports = {
    isPublished: item => {
        if ("data" in item && "draft" in item.data) {
            return false
        }
        return true
    },
    arePublished: (array) => array.filter(module.exports.isPublished),
    categoryFilter: (array) => {
        array = array.filter(item => {
            if (categories.includes(item)) {
                return false
            }
            return true
        })
        return array
    },
    tagFilter: (array) => {
        return array.filter(item => {
            if (ignoredTags.includes(item)) {
                return false
            }
            return true
        })
    },
    dateFilter: (a, b) => b.date - a.date,
    notReply: item => !item.data.in_reply_to || (item.data.in_reply_to.url && item.data.in_reply_to.url.includes(site.url)) || (item.data.in_reply_to && typeof item.data.in_reply_to === 'string' && item.data.in_reply_to.includes(site.url))
}
