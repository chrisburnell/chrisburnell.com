module.exports = function getPath(url) {
    let urlObject = new URL(url);
    return urlObject.pathname;
};
