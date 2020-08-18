const capitalizers = require("../../_data/capitalizers.json");

module.exports = function capitalizeFormat(string) {
    for (let capitalizer of capitalizers) {
        let regex = new RegExp(capitalizer, 'gi');
        string = string.replace(regex, capitalizer);
    }

    return string;
};
