module.exports = function getWebmentionReactions(webmentions) {
    return webmentions.filter(webmention => {
        if (['like', 'repost', 'bookmark', 'link'].includes(webmention.activity.type)) {
            return true;
        }
        return false;
    });
};
