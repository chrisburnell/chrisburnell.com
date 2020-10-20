const dateFilters = require("./filters/dates.js");
const collectionFilters = require("./filters/collections.js");

const now = new Date();

module.exports = {
    page: collection => {
        return collection
            .getFilteredByTag("page")
            .filter(collectionFilters.published);
    },
    post: collection => {
        return collection
            .getFilteredByTag("post")
            .filter(collectionFilters.published)
            .sort(collectionFilters.date);
    },
    writing: collection => {
        return collection
            .getFilteredByTag("writing")
            .filter(collectionFilters.published)
            .sort(collectionFilters.date);
    },
    feature: collection => {
        return collection
            .getFilteredByTag("feature")
            .filter(collectionFilters.published)
            .filter(collectionFilters.notReply)
            .sort(collectionFilters.date);
    },
    featureWithoutWriting: collection => {
        return collection
            .getFilteredByTag("feature")
            .filter(item => {
                return !item.data.tags.includes("writing");
            })
            .filter(collectionFilters.published)
            .filter(collectionFilters.notReply)
            .sort(collectionFilters.date)
            .slice(0, 3);
    },
    throwback: collection => {
        return collection
            .getFilteredByTag("throwback")
            .filter(collectionFilters.published)
            .filter(item => {
                if (item.data.rsvp || !item.data.in_reply_to) {
                    return true;
                }
                return false;
            })
            .filter(item => {
                if (item.date
                    && dateFilters.friendly(item.date, 'dd LLLL') == dateFilters.friendly(now, 'dd LLLL')
                    && dateFilters.friendly(item.date, 'yyyy') != dateFilters.friendly(now, 'yyyy')) {
                    return true;
                }
                else if (item.data.rsvp
                    && dateFilters.friendly(item.data.rsvp.date, 'dd LLLL') == dateFilters.friendly(now, 'dd LLLL')
                    && dateFilters.friendly(item.data.rsvp.date, 'yyyy') != dateFilters.friendly(now, 'yyyy')) {
                    return true;
                }
                else if (item.data.rsvp
                    && dateFilters.friendly(item.data.rsvp.finish, 'dd LLLL') == dateFilters.friendly(now, 'dd LLLL')
                    && dateFilters.friendly(item.data.rsvp.finish, 'yyyy') != dateFilters.friendly(now, 'yyyy')) {
                    return true;
                }
                return false;
            })
            .sort(collectionFilters.date);
    },
    checkin: collection => {
        return collection
            .getFilteredByTag("post")
            .filter(collectionFilters.published)
            .filter(item => {
                return "checkin" in item.data;
            })
            .sort(collectionFilters.date);
    },
    reply: collection => {
        return collection
            .getFilteredByTag("note")
            .filter(collectionFilters.published)
            .filter(item => {
                return "in_reply_to" in item.data;
            })
            .filter(item => {
                if ("rsvp" in item.data) {
                    return false;
                }
                return true;
            })
            .sort(collectionFilters.date);
    },
    noteWithoutReply: collection => {
        return collection
            .getFilteredByTag("note")
            .filter(collectionFilters.published)
            .filter(item => {
                if ("in_reply_to" in item.data) {
                    return false;
                }
                return true;
            })
            .sort(collectionFilters.date);
    },
    rsvp: collection => {
        return collection
            .getFilteredByTag("post")
            .filter(collectionFilters.published)
            .filter(item => {
                return "rsvp" in item.data;
            })
            .sort(collectionFilters.date);
    },
    rsvpToday: collection => {
        return collection
            .getFilteredByTag("post")
            .filter(collectionFilters.published)
            .filter(item => {
                if (item.data.rsvp
                    && dateFilters.friendly(item.data.rsvp.date) == dateFilters.friendly(now)) {
                    return true;
                }
            })
    },
    rsvpFuture: collection => {
        return collection
            .getFilteredByTag("post")
            .filter(collectionFilters.published)
            .filter(item => {
                if (item.data.rsvp
                    && dateFilters.epoch(item.data.rsvp.date) > now
                    && dateFilters.epoch(item.data.rsvp.date) - dateFilters.epoch(now) < 604800000
                    && dateFilters.friendly(item.data.rsvp.date) != dateFilters.friendly(now)) {
                    return true;
                }
            })
    }
};
