/*!
 * Chris Burnell gulp Configuration
 */


// Define gulp objects
var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    csscomb      = require('gulp-csscomb'),
    csslint      = require('gulp-csslint'),
    cssnano      = require('gulp-cssnano'),
    plumber      = require('gulp-plumber'),
    notify       = require('gulp-notify'),
    rename       = require('gulp-rename'),
    sass         = require('gulp-sass'),
    uglify       = require('gulp-uglify'),
    watch        = require('gulp-watch');

// Define external objects
var sassdoc = require('sassdoc');

// Define paths
var paths = {
    css: 'css/',
    js: 'js/',
    includes: '_includes/',
    docs: 'sassdoc/'
};

// -----------------------------------------------------------------------------

// Compile main SCSS file
gulp.task('css-main', function() {
    return gulp.src([paths.css + 'main.scss'])
        .pipe(plumber())
        .pipe(sass({
            errLogToConsole: true,
            style: 'expanded'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 1%']
        }))
        .pipe(csscomb())
        .pipe(csslint({
            'box-model': false,
            'box-sizing': false,
            'compatible-vendor-prefixes': false,
            'display-property-grouping': false,
            'fallback-colors': false,
            'floats': false,
            'font-sizes': false,
            'gradients': false,
            'important': false,
            'known-properties': false,
            'outline-none': false,
            'regex-selectors': false,
            'unique-headings': false,
            'universal-selector': false,
            'unqualified-attributes': false
        }))
        .pipe(csslint.reporter())
        .pipe(gulp.dest(paths.css))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cssnano())
        .pipe(gulp.dest(paths.css))
        .pipe(notify({
            title: 'gulp',
            message: 'CSS compiled.',
            onLast: true
        }));
});

// Compile critical SCSS file
gulp.task('css-critical', function() {
    return gulp.src([paths.css + 'critical.scss'])
        .pipe(plumber())
        .pipe(sass({
            errLogToConsole: true,
            style: 'expanded'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 1%']
        }))
        .pipe(csscomb())
        .pipe(gulp.dest(paths.css))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cssnano())
        .pipe(gulp.dest(paths.css))
        .pipe(rename({
            basename: "output",
            extname: ".html"
        }))
        .pipe(gulp.dest(paths.includes + 'head/critical/'))
        .pipe(notify({
            title: 'gulp',
            message: 'Critical CSS compiled.',
            onLast: true
        }));
});

// Generate Sass documentation
gulp.task('css-sassdoc', function() {
    return gulp.src([paths.css + '**/*.scss'])
        .pipe(plumber())
        .pipe(sassdoc({
            dest: paths.docs
        }))
        .pipe(notify({
            title: 'gulp',
            message: 'SassDoc compiled.',
            onLast: true
        }));
});

// Minify JS
gulp.task('js-main', function() {
    return gulp.src(['!' + paths.js + '*.min.js',
                     paths.js + '*.js'])
        .pipe(plumber())
        .pipe(uglify({
            mangle: false,
            preserveComments: 'some'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.js))
        .pipe(notify({
            title: 'gulp',
            message: 'JS compiled.',
            onLast: true
        }));
});

// Concat JS
gulp.task('js-concat', function() {
    return gulp.src(['!' + paths.js + 'main.min.js',
                     '!' + paths.js + 'loadcss.min.js',
                     '!' + paths.js + 'serviceworker.min.js',
                     paths.js + '*.min.js'])
        .pipe(plumber())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(paths.js))
        .pipe(notify({
            title: 'gulp',
            message: 'JS concatenated.',
            onLast: true
        }));
});

// Generate inline LoadCSS include
gulp.task('js-loadcss', function() {
    return gulp.src([paths.js + 'loadcss.min.js'])
        .pipe(rename({
            basename: "output",
            extname: ".html"
        }))
        .pipe(gulp.dest(paths.includes + 'body/loadcss/'))
        .pipe(notify({
            title: 'gulp',
            message: 'Inline JS compiled.',
            onLast: true
        }));
});

// Place the Service Worker at the root
gulp.task('js-serviceworker', function() {
    return gulp.src([paths.js + 'serviceworker.min.js'])
        .pipe(gulp.dest('.'));
});

// -----------------------------------------------------------------------------

// Default task
gulp.task('default', function() {
    gulp.start('css');
    gulp.start('js');
});

// CSS task
gulp.task('css', function() {
    gulp.start('css-main');
    gulp.start('css-critical');
    gulp.start('css-sassdoc');
});

// JS task
gulp.task('js', function() {
    gulp.start('js-main');
    gulp.start('js-concat');
    gulp.start('js-loadcss');
    gulp.start('js-serviceworker');
});

// -----------------------------------------------------------------------------

// Watch files and perform the appropriate tasks
gulp.task('watch', ['css', 'js'], function() {
    watch(paths.css + '**/*.scss', function() {
        gulp.start('css');
    });
    watch([paths.js + '**/*.js', '!' + paths.js + '**/*.min.js'], function() {
        gulp.start('js');
    });
});
