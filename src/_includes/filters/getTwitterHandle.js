module.exports = function getTwitterHandle(url) {
    if (url.includes('https://twitter.com')) {
        return '@' + url.split('/status/')[0].split('twitter.com/')[1];
    }

    return url;
};
