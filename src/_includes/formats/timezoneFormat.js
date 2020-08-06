const { DateTime } = require("luxon");

module.exports = function timezoneFormat(value) {
    return DateTime.fromJSDate(new Date(value)).zoneName;
};
