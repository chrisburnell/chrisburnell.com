const toArray = require("./toArray.js");

const humans = require("../../_data/people/humans.json");
const breweries = require("../../_data/people/breweries.json");
const gamePublishers = require("../../_data/people/gamePublishers.json");
const meetups = require("../../_data/people/meetups.json");
const musicArtists = require("../../_data/people/musicArtists.json");
const publications = require("../../_data/people/publications.json");
const people = [].concat(...[humans, breweries, gamePublishers, meetups, musicArtists, publications]);

const mastodonInstances = require("../../_data/mastodonInstances.json");

module.exports = function getvalue(value, intent) {
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
};
