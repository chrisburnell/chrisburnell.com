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
    uglify       = require('gulp-uglify'),
    watch        = require('gulp-watch');

// Define the locations of our assets
var cssPath = 'css/',
    jsPath =  'js/',
    includesPath = '_includes';

// -----------------------------------------------------------------------------

// Compile main SCSS file
gulp.task('css-main', function() {
    return gulp.src(cssPath + 'ravenous.scss')
        .pipe(plumber())
        .pipe(sass({
            errLogToConsole: true,
            style: 'expanded'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 1%']
        }))
        .pipe(csscomb())
        .pipe(gulp.dest(cssPath))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss({
            advanced: false,
            roundingPrecision: 3
        }))
        .pipe(gulp.dest(cssPath))
        .pipe(notify({
            title: 'gulp',
            message: 'CSS compiled.',
            onLast: true
        }));
});

// Compile critical SCSS file
gulp.task('css-critical', function() {
    return gulp.src(cssPath + 'critical.scss')
        .pipe(sass({
            errLogToConsole: true,
            style: 'expanded'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 1%']
        }))
        .pipe(csscomb())
        .pipe(gulp.dest(cssPath))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss({
            advanced: false,
            keepSpecialComments: 0,
            roundingPrecision: 3
        }))
        .pipe(gulp.dest(cssPath))
        .pipe(rename({
            basename: "head-css-critical",
            extname: ".html"
        }))
        .pipe(gulp.dest(includesPath))
        .pipe(notify({
            title: 'gulp',
            message: 'Critical CSS compiled.',
            onLast: true
        }));
});

// Minify JS
gulp.task('js-main', function() {
    return gulp.src([jsPath + '*.js', '!' + jsPath + '*.min.js'])
        .pipe(plumber())
        .pipe(uglify({
            mangle: false,
            preserveComments: 'some'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(jsPath))
        .pipe(notify({
            title: 'gulp',
            message: 'JS compiled.',
            onLast: true
        }));
});

// Generate picturefill HTML include
gulp.task('js-inline', function() {
    return gulp.src([jsPath + 'disqus-article.js',
                     jsPath + 'disqus-count.js',
                     jsPath + 'google-analytics.js',
                     jsPath + 'picturefill.js',
                     jsPath + 'search.js'])
        .pipe(uglify({
            mangle: false
        }))
        .pipe(rename({
            prefix: "body-js-",
            extname: ".html"
        }))
        .pipe(gulp.dest(includesPath))
        .pipe(notify({
            title: 'gulp',
            message: 'Inline JS compiled.',
            onLast: true
        }));
});

// -----------------------------------------------------------------------------

// Default task
gulp.task('default', function() {
    gulp.start('css-main');
    gulp.start('css-critical');
    gulp.start('js-main');
    gulp.start('js-inline');
});

// CSS task
gulp.task('css', function() {
    gulp.start('css-main');
    gulp.start('css-critical');
});

// JS task
gulp.task('js', function() {
    gulp.start('js-main');
    gulp.start('js-inline');
});

// -----------------------------------------------------------------------------

// Watch files and perform the appropriate tasks
gulp.task('watch', ['css', 'js'], function() {
    watch(cssPath + '**/*.scss', function() {
        gulp.start('css');
    });
    watch(jsPath + '**/*.js', function() {
        gulp.start('js');
    });
});
