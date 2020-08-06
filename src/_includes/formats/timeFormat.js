const { DateTime } = require("luxon");

module.exports = function timeFormat(value, showTimezone = true) {
    if (showTimezone) {
        return DateTime.fromJSDate(new Date(value)).toFormat("HH:mm ZZZZ").replace('GMT+1', 'BST');
    }
    return DateTime.fromJSDate(new Date(value)).toFormat("HH:mm");
};
