const htmlmin = require('html-minifier');

module.exports = function htmlMinTransform(value, outputPath) {
    if (outputPath.indexOf('.html') > -1) {
        return htmlmin.minify(value, {
            useShortDoctype: true,
            removeComments: false,
            collapseWhitespace: true,
            minifyCSS: true
        });
    }
    return value;
};
