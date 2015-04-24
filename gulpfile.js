/**
 * Ravenous gulp Configuration
 */

// Define gulp objects
var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    csscomb      = require('gulp-csscomb'),
    minifycss    = require('gulp-minify-css'),
    plumber      = require('gulp-plumber'),
    notify       = require('gulp-notify'),
    rename       = require('gulp-rename'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    watch        = require('gulp-watch');

// Define the locations of our assets
var cssPath = 'css/';

// -----------------------------------------------------------------------------

// Compile SASS, autoprefix, generate sourcemaps, and minify
gulp.task('css', function() {
    return gulp.src(cssPath + 'ravenous.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            style: 'expanded'
        }))
        .pipe(autoprefixer('last 2 versions', '> 1%'))
        .pipe(csscomb())
        .pipe(gulp.dest(cssPath))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(cssPath))
        .pipe(notify({ title: 'gulp', message: 'CSS compiled.', onLast: true }));
});

// -----------------------------------------------------------------------------

// Default task
gulp.task('default', function() {
    gulp.start('css');
});

// -----------------------------------------------------------------------------

// Watch files and perform the appropriate tasks
gulp.task('watch', ['css'], function() {
    watch(cssPath + '**/*.scss', function() {
        gulp.start('css');
    });
});
