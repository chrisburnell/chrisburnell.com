const toArray = function(value) {
    if (Array.isArray(value)) {
        return value;
    }
    return [value];
};

const getPath = function(url) {
    let urlObject = new URL(url);
    return urlObject.pathname;
};

const site = require("../../data/site.json");
const consoles = require("../../data/consoles.json");
const mastodonInstances = require("../../data/mastodonInstances.json");
const humans = require("../../data/people/humans.json");
const breweries = require("../../data/people/breweries.json");
const gamePublishers = require("../../data/people/gamePublishers.json");
const meetups = require("../../data/people/meetups.json");
const musicArtists = require("../../data/people/musicArtists.json");
const publications = require("../../data/people/publications.json");
const people = [].concat(...[humans, breweries, gamePublishers, meetups, musicArtists, publications]);
const places = require("../../data/places.json");
const methods = require("../../data/postingMethods.json");
const targets = require("../../data/targets.json");

module.exports = {
    console: (value) => {
        for (let console of consoles) {
            if (value == console.title) {
                return `<abbr title="${console.abbreviation}">${console.title}</abbr>`;
            }
        }

        return value;
    },
    countByYear: (items, year) => {
        return items.filter(item => {
            return !item.data.draft;
        }).filter(item => {
            return item.data.page.date.getFullYear() === parseInt(year, 10);
        }).length;
    },
    host: (url) => {
        if (typeof url === "string" && url.includes('//')) {
            let urlObject = new URL(url);
            return urlObject.hostname;
        }
        return url;
    },
    internal: (value, pages) => {
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
    },
    mastodonHandle: (url) => {
        for (let instance of mastodonInstances) {
            if (url.includes(instance)) {
                if (url.includes('/@')) {
                    return '@' + url.split('/@')[1].split('/')[0] + '@' + instance;
                }
                else {
                    return '@' + url.split('/users/')[1].split('/')[0] + '@' + instance;
                }
            }
        }
        return url;
    },
    person: (value, intent) => {
        // Default metadata to the passed value (string/object)
        let title, url, mastodon, twitter;

        // Extract bits of metadata if they exist
        if (typeof value === "object") {
            if ("title" in value) {
                title = value.title;
            }
            if ("url" in value) {
                url = value.url;
            }
            if ("mastodon" in value) {
                mastodon = value.mastodon;
            }
            if ("twitter" in value) {
                twitter = value.twitter;
            }
        }
        else {
            title = value;
            url = value;
        }

        // Loop through known people to make matches based on:
        // - title
        // - url
        // - mastodon
        // - twitter
        for (let lookup of people) {
            // Check title
            if (lookup.title === title) {
                title = lookup.title;
                value = lookup;
                break;
            }
            // Check url
            if (url && "url" in lookup) {
                // Parse URL for Mastodon instance + username
                for (let instance of mastodonInstances) {
                    if (url.includes(instance)) {
                        if (url.includes('/@')) {
                            mastodon = url.split('/@')[1].split('/')[0];
                        }
                        else {
                            mastodon = url.split('/users/')[1].split('/')[0];
                        }
                        mastodon += `@${instance}`;
                    }
                }
                // Parse URL for Twitter username
                if (url.includes('https://twitter.com')) {
                    twitter = url.split('/status/')[0].split('twitter.com/')[1];
                }
                // Parse URL for lookup match
                for (let lookup_url of toArray(lookup.url)) {
                    if (url.includes(lookup_url)) {
                        url = toArray(lookup.url)[0];
                        value = lookup;
                        break;
                    }
                }
            }
            // Check mastodon
            if (mastodon && "mastodon" in lookup) {
                if (mastodon == lookup.mastodon) {
                    mastodon = toArray(lookup.mastodon)[0];
                    value = lookup;
                    break;
                }
            }
            // Check twitter
            if (twitter && "twitter" in lookup) {
                if (twitter == lookup.twitter) {
                    twitter = toArray(lookup.twitter)[0];
                    value = lookup;
                    break;
                }
            }
        }

        // create titles from mastodon/twitter URLs
        if (title == url) {
            title = (mastodon || twitter | title);
        }

        // Spit out specific bits of metadata
        if (intent == 'object') {
            return value;
        }
        if (intent == 'url') {
            return (value.url || value);
        }
        else if (intent == 'mastodon') {
            return (value.mastodon || value);
        }
        else if (intent == 'twitter') {
            return (value.twitter || value);
        }
        return (value.title || value);
    },
    place: (value, intent) => {
        // Default metadata to the passed value (string/object)
        let title, url, lat, long, address;

        // Extract bits of metadata if they exist
        if (typeof value === "object") {
            if ("title" in value) {
                title = value.title;
            }
            if ("url" in value) {
                url = value.url;
            }
            if ("lat" in value) {
                lat = value.lat;
            }
            if ("long" in value) {
                long = value.long;
            }
            if ("address" in value) {
                address = value.address;
            }
        }
        else {
            title = value;
            url = value;
        }

        // Loop through known people to make matches based on:
        // - title
        // - url
        for (let lookup of places) {
            // Check title
            if (lookup.title === title) {
                title = lookup.title;
                value = lookup;
                break;
            }
            // Check url
            if (url && "url" in lookup) {
                // Parse URL for lookup match
                for (let lookup_url of toArray(lookup.url)) {
                    if (url.includes(lookup_url)) {
                        url = toArray(lookup.url)[0];
                        value = lookup;
                        break;
                    }
                }
            }
        }

        // Spit out specific bits of metadata
        if (intent == 'object') {
            return value;
        }
        if (intent == 'url') {
            return (value.url || value);
        }
        else if (intent == 'lat') {
            return (value.lat || value);
        }
        else if (intent == 'long') {
            return (value.long || value);
        }
        else if (intent == 'address') {
            return (value.address || value);
        }
        return (value.title || value);
    },
    postingMethod: (url) => {
        let target;
        if (url.includes("//")) {
            let urlObject = new URL(url);
            target = urlObject.hostname;

            for (let item of methods) {
                if (item.url.includes(target)) {
                    target = item.title;
                    break;
                }
            }
        }

        return target;
    },
    target: (url) => {
        let target = module.exports.host(url);

        for (let item of targets) {
            if (item.url && item.url.includes(target)) {
                target = item.title;
                break;
            }
        }

        return target;
    },
    twitterHandle: (url) => {
        if (url.includes('https://twitter.com')) {
            return '@' + url.split('/status/')[0].split('twitter.com/')[1];
        }

        return url;
    },
    webmentionReactions: (webmentions) => {
        return webmentions.filter(webmention => {
            if (['like', 'repost', 'bookmark'].includes(webmention.activity.type)) {
                return true;
            }
            return false;
        });
    },
    webmentionReplies: (webmentions) => {
        return webmentions.filter(webmention => {
            if (['link', 'reply'].includes(webmention.activity.type)) {
                return true;
            }
            return false;
        });
    },
    webmentions: (webmentions, url) => {
        return webmentions.filter(webmention => {
            if (webmention.target.replace(/\/?$/, "/").includes(url)) {
                return true;
            }
            return false;
        });
    }
};
