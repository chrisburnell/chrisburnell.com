const replacements = require("../../_data/replacements.json");

module.exports = function capitalizeFormat(string) {
    for (let replacement of replacements) {
        let regex = new RegExp(replacement, 'gi');
        string = string.replace(regex, replacement);
    }

    return string;
};
