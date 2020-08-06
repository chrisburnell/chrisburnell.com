const toArray = require("./toArray.js");

const places = require("../../_data/places.json");

module.exports = function getPlace(value, intent) {
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
};
