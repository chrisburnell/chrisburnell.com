const getHost = require("./getHost.js");

const targets = require("../../_data/targets.json");

module.exports = function getTarget(url) {
    let target = getHost(url);

    for (let item of targets) {
        if (item.url && item.url.includes(target)) {
            target = item.title;
            break;
        }
    }

    return target;
};
