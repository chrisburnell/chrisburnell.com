/**
 * Ravenous gulp Configuration
 */

// Define gulp objects
var gulp            = require('gulp'),
    autoprefixer    = require('gulp-autoprefixer'),
    imagemin        = require('gulp-imagemin'),
    livereload      = require('gulp-livereload'),
    minifycss       = require('gulp-minify-css'),
    plumber         = require('gulp-plumber');
    rename          = require('gulp-rename'),
    sass            = require('gulp-sass'),
    server          = require('tiny-lr'),
    svgmin          = require('gulp-svgmin');

// Define the locations of our assets
var cssDir =    'css/',
    imagesDir = 'images/';

// -----------------------------------------------------------------------------

// Compile SASS, autoprefix properties, and minify
gulp.task('styles', function() {
    return gulp.src(cssDir + 'ravenous.scss')
        .pipe(plumber())
        .pipe(sass({ style: 'expanded', includePaths: [cssDir] }))
        .pipe(autoprefixer("last 2 versions", "> 1%"))
        .pipe(gulp.dest(cssDir))
        .pipe(rename('ravenous.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(cssDir))
        .pipe(livereload(server));
});

// -----------------------------------------------------------------------------

// Crush raster images
gulp.task('images', function() {
    return gulp.src(imagesDir + '**/*')
        .pipe(plumber())
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest(imagesDir))
        .pipe(livereload(server));
});

// Crush SVGs
gulp.task('svg', function() {
    return gulp.src(imagesDir + '**/*')
        .pipe(plumber())
        .pipe(svgmin())
        .pipe(gulp.dest(imagesDir))
        .pipe(livereload(server));
});

// -----------------------------------------------------------------------------

// Default task
gulp.task('default', function() {
    gulp.start('styles');
});

// Watch files and perform appropriate tasks
gulp.task('watch', function() {

    // Listen on port 1337
    server.listen(1337, function(err) {
        if (err) {
            return console.log(err);
        }
        // Watch CSS files
        gulp.watch(cssDir + '**/*.scss', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', compiling SASS...');
            gulp.start('styles');
        });
        // Watch images and SVGs
        gulp.watch(imagesDir + '**/*', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', crushing images...');
            gulp.start('images');
            gulp.start('svg');
        });
    });

});