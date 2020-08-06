const mastodonInstances = require("../../_data/mastodonInstances.json");

module.exports = function getTwitterHandle(url) {
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
};
