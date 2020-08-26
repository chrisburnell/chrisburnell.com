module.exports = function getWebmentionReplies(webmentions) {
    return webmentions.filter(webmention => {
        if (['link', 'reply'].includes(webmention.activity.type)) {
            return true;
        }
        return false;
    });
};
