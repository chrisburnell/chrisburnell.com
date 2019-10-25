/*!
 * Format a datetime into a relative format
 */

(() => {
    "use strict";

    const minute = 60;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 30.436875 * day;
    const year = 12 * month;

    let minutes;
    let hours;
    let days;
    let weeks;
    let months;
    let years;

    const rtf = new Intl.RelativeTimeFormat("en", {
        localeMatcher: "best fit", // other values: "lookup"
        numeric: "always", // other values: "auto"
        style: "long", // other values: "short" or "narrow"
    });

    const today = Math.floor(Date.now() / 1000);
    let compare;
    let abs;

    const timeElements = document.querySelectorAll('.date--relative');

    for (let timeElement of timeElements) {
        compare = Math.floor(new Date(timeElement.getAttribute('datetime')).getTime() / 1000);
        abs = Math.abs(compare - today);

        if (abs < minute) {
            timeElement.innerHTML = 'seconds ago';
        }
        else if (abs < hour) {
            minutes = Math.ceil((compare - today) / minute);
            timeElement.innerHTML = rtf.format(minutes, 'minute');
        }
        else if (abs < day) {
            hours = Math.ceil((compare - today) / hour);
            timeElement.innerHTML = rtf.format(hours, 'hour');
        }
        else if (abs < week) {
            days = Math.ceil((compare - today) / day);
            timeElement.innerHTML = rtf.format(days, 'day');
        }
        else if (abs < month) {
            weeks = Math.ceil((compare - today) / week);
            timeElement.innerHTML = rtf.format(weeks, 'week');
        }
        else if (abs < year) {
            months = Math.ceil((compare - today) / month);
            timeElement.innerHTML = rtf.format(months, 'month');
        }
        else {
            years = Math.ceil((compare - today) / year);
            timeElement.innerHTML = rtf.format(years, 'year');
        }
    }
})();
