/*!
 * Chris Burnell gulp Configuration
 */


// Define gulp objects
var gulp         = require('gulp'),
    gutil        = require('gulp-util'),
    concat       = require('gulp-concat'),
    cssnano      = require('gulp-cssnano'),
    plumber      = require('gulp-plumber'),
    postcss      = require('gulp-postcss'),
    rename       = require('gulp-rename'),
    sass         = require('gulp-sass'),
    uglify       = require('gulp-uglify'),
    watch        = require('gulp-watch');

// Define external objects
var autoprefixer = require('autoprefixer'),
    reporter     = require('postcss-reporter'),
    sassdoc      = require('sassdoc'),
    stylelint    = require('stylelint');

// Define paths
var paths = {
    root: './',
    src: {
        css: 'src/css/',
        js: 'src/js/'
    },
    dist: {
        css: 'css/',
        js: 'js/'
    },
    includes: '_includes/',
    docs: 'sassdoc/'
};

// -----------------------------------------------------------------------------

// Lint SCSS
gulp.task('css-lint', function() {
    return gulp.src([paths.src.css + '*.scss'])
        .pipe(plumber())
        .pipe(postcss([
            stylelint({
                'rules': {
                    'selector-no-id': 2,
                    'string-quotes': [2, 'double']
                }
            }),
            reporter({
                clearMessages: true
            })
        ]));
});

// Compile main SCSS file
gulp.task('css-main', function() {
    return gulp.src([paths.src.css + '*.scss'])
        .pipe(plumber())
        .pipe(sass({
            errLogToConsole: true,
            style: 'expanded'
        }))
        .pipe(postcss([
            autoprefixer({
                browsers: ['last 2 versions', '> 1%']
            })
        ]))
        .pipe(gulp.dest(paths.dist.css))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cssnano())
        .pipe(gulp.dest(paths.dist.css));
});

// Compile critical SCSS file
gulp.task('css-critical', function() {
    return gulp.src([paths.dist.css + 'critical.min.css'])
        .pipe(plumber())
        .pipe(rename({
            basename: 'critical-css',
            extname: '.html'
        }))
        .pipe(gulp.dest(paths.includes + 'generated/'));
});

// Generate Sass documentation
gulp.task('css-sassdoc', function() {
    return gulp.src([paths.src.css + '**/*.scss'])
        .pipe(plumber())
        .pipe(sassdoc({
            dest: paths.docs
        }));
});

// Minify JS
gulp.task('js-main', function() {
    return gulp.src(['!' + paths.src.js + '**/loadcss.js',
                     '!' + paths.src.js + '**/serviceworker.js',
                     '!' + paths.src.js + '**/typekit.js',
                     paths.src.js + '**/*.js'])
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(gulp.dest(paths.dist.js))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.dist.js));
});

// Generate inline LoadCSS include
gulp.task('js-loadcss', function() {
    return gulp.src([paths.src.js + 'vendors/loadcss.js'])
        .pipe(plumber())
        .pipe(uglify({
            mangle: false
        }))
        .pipe(rename({
            basename: 'loadcss',
            extname: '.html'
        }))
        .pipe(gulp.dest(paths.includes + 'generated/'));
});

// Place the Service Worker at the root
gulp.task('js-serviceworker', function() {
    return gulp.src([paths.src.js + 'serviceworker.js'])
        .pipe(plumber())
        .pipe(uglify({
            mangle: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.root));
});

// Generate inline LoadCSS include
gulp.task('js-typekit', function() {
    return gulp.src([paths.src.js + 'vendors/typekit.js'])
        .pipe(plumber())
        .pipe(uglify({
            mangle: false
        }))
        .pipe(rename({
            basename: 'typekit',
            extname: '.html'
        }))
        .pipe(gulp.dest(paths.includes + 'generated/'));
});

// -----------------------------------------------------------------------------

// Default task
gulp.task('default', function() {
    gulp.start('css');
    gulp.start('js');
});

// CSS task
gulp.task('css', function() {
    //gulp.start('css-lint');
    gulp.start('css-main');
    gulp.start('css-critical');
    gulp.start('css-sassdoc');
});

// JS task
gulp.task('js', function() {
    gulp.start('js-main');
    gulp.start('js-loadcss');
    gulp.start('js-serviceworker');
    gulp.start('js-typekit');
});

// -----------------------------------------------------------------------------

// Watch files and perform the appropriate tasks
gulp.task('watch', ['css', 'js'], function() {
    watch(paths.src.css + '**/*.scss', function() {
        gulp.start('css');
    });
    watch([paths.src.js + '**/*.js'], function() {
        gulp.start('js');
    });
});
