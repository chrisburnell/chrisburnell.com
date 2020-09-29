const { DateTime } = require("luxon");

module.exports = function rssDateFormat(value) {
    return DateTime.fromJSDate(new Date(value)).toHTTP();
};
