const ignoredTags = require("../../_data/tagIgnore.json");

module.exports = function tagFilter(array) {
    array = array.filter(item => {
        if (ignoredTags.includes(item)) {
            return false;
        }
        return true;
    });
    return array;
};
