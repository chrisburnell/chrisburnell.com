const consoles = require("../../_data/consoles.json");

module.exports = function getConsole(value) {
    for (let console of consoles) {
        if (value == console.title) {
            return `<abbr title="${console.abbreviation}">${console.title}</abbr>`;
        }
    }

    return value;
};
