const dateFilters = require("./dates.js");

// Converts a JS Date Object to a Sexageismal (Base 60) String
const DateToSxg = dateObj => {
    var sinceEpoch = dateObj.getTime();
    var epochDays = Math.floor(sinceEpoch / (1000 * 60 * 60 * 24));

    return IntToSxg(epochDays);
};

// Converts a Base 10 Integer into Sexagesimal (Base 60) String
const IntToSxg = num => {
    var sxg = "";
    var sequence = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ_abcdefghijkmnopqrstuvwxyz";
    if (num===undefined || num===0) { return 0; }
    while (num > 0) {
      var index = num % 60;
      sxg = sequence[index] + sxg;
      num = (num - index)/60;
    }
    return sxg;
}

module.exports = function newBase60(date, prefix, collection) {
    let postsToday = [];
    for (let i in collection) {
        if ("date" in collection[i].data) {
            if (dateFilters.friendly(collection[i].data.date) == dateFilters.friendly(date)) {
                postsToday.push(collection[i]);
            }
        }
    }

    let postOfTheDay = 0;
    for (let i in postsToday) {
        postOfTheDay += 1;
        if (dateFilters.epoch(postsToday[i].data.date) == dateFilters.epoch(date)) {
            break;
        }
    }

    return prefix + DateToSxg(date) + postOfTheDay;
};
