const getPath = require("./getPath.js");
const toArray = require("./toArray.js");

const site = require("../../_data/site.json");

module.exports = function getInternalTarget(value, pages) {

    // Mastodon
    if (value.includes('https://mastodon.social/users/chrisburnell/statuses/')) {
        return 'a previous toot';
    }
    // Twitter
    else if (value.includes('https://twitter.com/iamchrisburnell/status/')) {
        return 'a previous tweet';
    }
    // Internal URL
    else if (value.includes(site.url) || value.includes('localhost')) {

        let page = pages.filter(item => {
            if (getPath(value) == item.url) {
                return true;
            }
            return false;
        });

        if (page.length > 0) {
            page = page[0];
            // posts with a `title` and `category`
            if ("title" in page.data && "category" in page.data) {
                return `${page.data.title}, a previous ${page.data.categoryProper || page.data.category}`;
            }
            // pages/posts with a `title`
            else if ("title" in page.data) {
                return `${page.data.title}`;
            }
            // posts
            else if ("category" in page.data) {
                return `a previous ${page.data.categoryProper || page.data.category}`;
            }
        }
        // pages
        return `a previous page`;
    }

    return value;
};
