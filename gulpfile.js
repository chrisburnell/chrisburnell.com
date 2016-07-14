/*!
 * Chris Burnell gulp Configuration
 */


// Define gulp objects
var gulp    = require('gulp'),
    gutil   = require('gulp-util'),
    concat  = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
    rename  = require('gulp-rename'),
    sass    = require('gulp-sass'),
    uglify  = require('gulp-uglify/minifier'),
    watch   = require('gulp-watch');

// Define external objects
var autoprefixer = require('autoprefixer'),
    cssnano      = require('cssnano'),
    reporter     = require('postcss-reporter'),
    scss_syntax  = require('postcss-scss'),
    sassdoc      = require('sassdoc'),
    stylelint    = require('stylelint'),
    uglifyjs     = require('uglify-js-harmony');

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

// Define Stylelint Rules
var stylelintRules = {
    'rules': {
        'color-hex-case': 'lower',
        'font-weight-notation': 'numeric',
        'function-url-quotes': 'always',
        'number-leading-zero': 'always',
        'number-max-precision': 3,
        'length-zero-no-unit': true,
        'time-no-imperceptible': true,
        'block-no-single-line': true,
        'comment-whitespace-inside': 'always',
        'indentation': 4,
        'selector-no-id': true,
        'string-quotes': 'double'
    }
};

// -----------------------------------------------------------------------------

// Lint Sass
gulp.task('css-lint', function() {
    return gulp.src([paths.src.css + '*.scss'])
        .pipe(plumber())
        .pipe(postcss([
            stylelint(stylelintRules),
            reporter({
                clearMessages: true,
                throwError: true
            })
        ], { syntax: scss_syntax }));
});

// Compile Sass
gulp.task('css-compile', ['css-lint'], function() {
    return gulp.src([paths.src.css + '*.scss'])
        .pipe(plumber())
        .pipe(sass({
            errLogToConsole: true,
            style: 'expanded'
        }))
        .pipe(postcss([
            autoprefixer({
                browsers: ['last 2 versions', '> 1%']
            }),
            reporter({
                clearMessages: true,
                throwError: true
            })
        ]))
        .pipe(gulp.dest(paths.dist.css))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(postcss([
            cssnano(),
            reporter({
                clearMessages: true,
                throwError: true
            })
        ]))
        .pipe(gulp.dest(paths.dist.css));
});

// Generate inline Critical CSS include
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

// Compile JavaScript
gulp.task('js-compile', function() {
    return gulp.src(['!' + paths.src.js + '**/loadcss.js',
                     '!' + paths.src.js + '**/serviceworker.js',
                     '!' + paths.src.js + '**/typekit.js',
                     paths.src.js + '**/*.js'])
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(gulp.dest(paths.dist.js))
        .pipe(uglify({
            mangle: false
        }, uglifyjs))
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
        }, uglifyjs))
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
        .pipe(gulp.dest(paths.root));
});

// Generate inline Typekit include
gulp.task('js-typekit', function() {
    return gulp.src([paths.src.js + 'vendors/typekit.js'])
        .pipe(plumber())
        .pipe(uglify({
            mangle: false
        }, uglifyjs))
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
gulp.task('css', ['css-compile'], function() {
    gulp.start('css-critical');
    gulp.start('css-sassdoc');
});

// JS task
gulp.task('js', ['js-compile'], function() {
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
