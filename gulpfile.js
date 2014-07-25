/**
 * Ravenous gulp Configuration
 */

// Define gulp objects
var gulp            = require('gulp'),
    autoprefixer    = require('gulp-autoprefixer'),
    imagemin        = require('gulp-imagemin'),
    minifycss       = require('gulp-minify-css'),
    plumber         = require('gulp-plumber');
    rename          = require('gulp-rename'),
    sass            = require('gulp-sass'),
    watch           = require('gulp-watch');

// Define the locations of our assets
var cssDir =    'css/',
    imagesDir = 'images/';

// -----------------------------------------------------------------------------

// Compile SASS, autoprefix properties, and minify
gulp.task('styles', function() {
    return gulp.src(cssDir + 'ravenous.scss')
        .pipe(plumber())
        .pipe(sass({
            includePaths: [cssDir],
            // sourceComments: 'map',
            style: 'expanded'
        }))
        .pipe(autoprefixer("last 2 versions", "> 1%"))
        .pipe(gulp.dest(cssDir))
        .pipe(rename('ravenous.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(cssDir));
});

// -----------------------------------------------------------------------------

// Crush raster and SVG images
gulp.task('images', function() {
    return gulp.src(imagesDir + '**/*')
        .pipe(plumber())
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest(imagesDir));
});

// -----------------------------------------------------------------------------

// Default task
gulp.task('default', function() {
    gulp.start('styles');
});

// -----------------------------------------------------------------------------

// Watch files and perform the appropriate tasks
gulp.task('watch', function() {

    watch({glob: cssDir + '**/*.scss', emitOnGlob: false}, ['styles']);

    // watch({glob: imagesDir + '**/*', emitOnGlob: false}, ['images']);

});