const categories = require("../../_data/categories.json");

module.exports = function categoryFilter(array) {
    array = array.filter(item => {
        if (categories.includes(item)) {
            return false;
        }
        return true;
    });
    return array;
};
