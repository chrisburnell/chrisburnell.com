const methods = require("../../_data/postingMethods.json");

module.exports = function getPostingMethod(url) {
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
};
