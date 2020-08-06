const markdownIt = require('markdown-it')({
    html: true,
    breaks: true,
    linkify: true
});

module.exports = function markdownFormat(value) {
    return markdownIt.render(value);
};
