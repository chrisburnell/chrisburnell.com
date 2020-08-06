module.exports = function getWebmentionReplies(webmentions) {
    return webmentions.filter(webmention => {
        if (['reply'].includes(webmention.activity.type)) {
            return true;
        }
        return false;
    });
};
