/*!
 * Format a datetime into a relative format
 */

(() => {
    "use strict";

    const timeElements = document.querySelectorAll(".since");

    let date;
    for (let timeElement of timeElements) {
        date = new Date(timeElement.getAttribute("datetime"));
        timeElement.setAttribute("title", date.toString());
        timeElement.innerHTML = helpers.since(date);
    }
})();
