const mastodonInstances = require("../../_data/mastodonInstances.json");

module.exports = function isMastodonInstance(value) {

    for (let lookup of mastodonInstances) {
        // Check `url`
        if ("url" in lookup) {
            if (value.includes(lookup.url)) {
                return lookup;
            }
        }
        // Check `twitter`
        else if ("twitter" in lookup) {
            if (value.includes(lookup.twitter)) {
                return lookup;
            }
        }
        // Check `mastodon`
        else if ("mastodon" in lookup) {
            if (value.includes(lookup.mastodon)) {
                return lookup;
            }
        }
    }
    return value;
};
