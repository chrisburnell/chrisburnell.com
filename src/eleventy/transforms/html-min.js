const minifier = require('html-minifier')

module.exports = function htmlmin(value, outputPath) {
    if (outputPath.endsWith(".html")) {
        return minifier.minify(value, {
            useShortDoctype: true,
            removeComments: false,
            collapseWhitespace: true,
            minifyCSS: true
        })
    }
    return value
}
