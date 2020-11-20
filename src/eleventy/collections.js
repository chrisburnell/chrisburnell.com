const dateFilters = require("./filters/dates.js");
const collectionFilters = require("./filters/collections.js");
const queryFilters = require("./filters/queries.js");

const webmentions = require("../data/webmentions.js");

const now = new Date();

module.exports = {
    page: collection => {
        return collection
            .getFilteredByTag("page")
            .filter(collectionFilters.published);
    },
    posts: collection => {
        return collection
            .getFilteredByTag("post")
            .filter(collectionFilters.published)
            .sort(collectionFilters.date);
    },
    writingPosts: collection => {
        return collection
            .getFilteredByTag("writing")
            .filter(collectionFilters.published)
            .sort(collectionFilters.date);
    },
    popular: async (collection) => {
        return (async () => {
            const mentions = await webmentions();
            return await collection
                .getFilteredByTag("writing")
                .filter(collectionFilters.published)
                .sort(collectionFilters.date)
                .filter(item => queryFilters.getWebmentions(mentions, item.url).length)
                .sort((a, b) => {
                    const alpha = queryFilters.getWebmentions(mentions, a.url);
                    const beta = queryFilters.getWebmentions(mentions, b.url);
                    return beta.length - alpha.length
                })
                .slice(0, 10)
        })();
    },
    featurePosts: collection => {
        return collection
            .getFilteredByTag("feature")
            .filter(collectionFilters.published)
            .filter(collectionFilters.notReply)
            .sort(collectionFilters.date);
    },
    featurePostsNotWriting: collection => {
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
    throwbackPosts: collection => {
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
                    && dateFilters.friendlyDate(item.date, 'dd LLLL') == dateFilters.friendlyDate(now, 'dd LLLL')
                    && dateFilters.friendlyDate(item.date, 'yyyy') != dateFilters.friendlyDate(now, 'yyyy')) {
                    return true;
                }
                else if (item.data.rsvp
                    && dateFilters.friendlyDate(item.data.rsvp.date, 'dd LLLL') == dateFilters.friendlyDate(now, 'dd LLLL')
                    && dateFilters.friendlyDate(item.data.rsvp.date, 'yyyy') != dateFilters.friendlyDate(now, 'yyyy')) {
                    return true;
                }
                else if (item.data.rsvp
                    && dateFilters.friendlyDate(item.data.rsvp.finish, 'dd LLLL') == dateFilters.friendlyDate(now, 'dd LLLL')
                    && dateFilters.friendlyDate(item.data.rsvp.finish, 'yyyy') != dateFilters.friendlyDate(now, 'yyyy')) {
                    return true;
                }
                return false;
            })
            .sort(collectionFilters.date);
    },
    checkins: collection => {
        return collection
            .getFilteredByTag("post")
            .filter(collectionFilters.published)
            .filter(item => {
                return "checkin" in item.data;
            })
            .sort(collectionFilters.date);
    },
    replies: collection => {
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
    notesWithoutReplies: collection => {
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
    rsvps: collection => {
        return collection
            .getFilteredByTag("post")
            .filter(collectionFilters.published)
            .filter(item => {
                return "rsvp" in item.data;
            })
            .sort(collectionFilters.date);
    },
    todayRSVPs: collection => {
        return collection
            .getFilteredByTag("post")
            .filter(collectionFilters.published)
            .filter(item => {
                if (item.data.rsvp
                    && dateFilters.friendlyDate(item.data.rsvp.date) == dateFilters.friendlyDate(now)) {
                    return true;
                }
            })
    },
    futureRSVPs: collection => {
        return collection
            .getFilteredByTag("post")
            .filter(collectionFilters.published)
            .filter(item => {
                if (item.data.rsvp
                    && dateFilters.epoch(item.data.rsvp.date) > now
                    && dateFilters.epoch(item.data.rsvp.date) - dateFilters.epoch(now) < 604800000
                    && dateFilters.friendlyDate(item.data.rsvp.date) != dateFilters.friendlyDate(now)) {
                    return true;
                }
            })
    }
};
