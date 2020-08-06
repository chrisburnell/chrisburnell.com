module.exports = function getHost(url) {
    if (typeof url === "string" && url.includes('//')) {
        let urlObject = new URL(url);
        return urlObject.hostname;
    }
    return url;
};
