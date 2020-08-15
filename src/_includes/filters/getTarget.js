const getHost = require("./getHost.js");

const social = require("../../_data/social.json");

module.exports = function getTarget(url) {
    let target = getHost(url);

    for (let item of social) {
        if (item.url && item.url.includes(target)) {
            target = item.title;
            break;
        }
    }

    return target;
};
