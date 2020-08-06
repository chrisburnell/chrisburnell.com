module.exports = function getWebmentions(webmentions, url) {
    return webmentions.filter(webmention => {
        if (webmention.target.replace(/\/?$/, "/").includes(url)) {
            return true;
        }
        return false;
    });
};
