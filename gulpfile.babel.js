/**
 * Gulp Configuration
 * @author Chris Burnell
 * @version 2.8.2
 */


'use strict';


// Define gulp-centric objects
import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import eslint from 'gulp-eslint';
import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import watch from 'gulp-watch';

// Define other objects
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import reporter from 'postcss-reporter';
import sassdoc from 'sassdoc';
import scss_syntax from 'postcss-scss';
import stylelint from 'stylelint';
import webp from 'imagemin-webp';

// Define paths
const paths = {
    root: '.',
    css: {
        src: 'src/sass',
        dest: 'css'
    },
    js: {
        src: 'src/js',
        dest: 'js'
    },
    images: {
        src: 'src/images',
        dest: 'images'
    },
    includes: '_includes',
    sassdoc: 'sassdoc'
};

// -----------------------------------------------------------------------------

// Lint Sass
gulp.task('css-lint', () => {
    return gulp.src([`!${paths.css.src}/vendors/*.scss`,
                     `${paths.css.src}/**/*.scss`])
        .pipe(plumber())
        .pipe(postcss([
            stylelint(),
            reporter({
                plugins: ['!postcss-discard-empty'],
                clearMessages: true,
                throwError: false
            })
        ], { syntax: scss_syntax }));
});

// Compile CSS from Sass
gulp.task('css-main', ['css-lint'], () => {
    return gulp.src(`${paths.css.src}/main.scss`)
        .pipe(plumber())
        .pipe(newer(`${paths.css.dest}`))
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            indentWidth: 4,
            outputStyle: 'expanded',
            sourceMap: paths.css.src
        }))
        .pipe(postcss([
            autoprefixer(),
            reporter({
                plugins: ['!postcss-discard-empty'],
                clearMessages: true,
                throwError: true
            })
        ]))
        .pipe(gulp.dest(`${paths.css.dest}/`))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(postcss([
            cssnano(),
            reporter({
                plugins: ['!postcss-discard-empty'],
                clearMessages: true,
                throwError: true
            })
        ]))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(`${paths.css.dest}/`));
});

// Generate inline Critical CSS include
gulp.task('css-critical', () => {
    return gulp.src(`${paths.css.src}/critical.scss`)
        .pipe(plumber())
        .pipe(newer(`${paths.includes}/generated/`))
        .pipe(sass({
            errLogToConsole: true,
            indentWidth: 4,
            outputStyle: 'expanded'
        }))
        .pipe(postcss([
            autoprefixer(),
            reporter({
                plugins: ['!postcss-discard-empty'],
                clearMessages: true,
                throwError: true
            })
        ]))
        .pipe(gulp.dest(`${paths.css.dest}/`))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(postcss([
            cssnano(),
            reporter({
                plugins: ['!postcss-discard-empty'],
                clearMessages: true,
                throwError: true
            })
        ]))
        .pipe(gulp.dest(`${paths.css.dest}/`))
        .pipe(rename({
            basename: 'critical-css',
            extname: '.html'
        }))
        .pipe(gulp.dest(`${paths.includes}/generated/`));
});

// Generate Sass documentation
gulp.task('css-sassdoc', () => {
    return gulp.src(`${paths.css.src}/**/*.scss`)
        .pipe(plumber())
        .pipe(newer(`${paths.sassdoc}`))
        .pipe(sassdoc({
            dest: `${paths.sassdoc}/`
        }));
});

// -----------------------------------------------------------------------------

// Lint JavaScript
gulp.task('js-lint', () => {
    return gulp.src([`${paths.js.src}/**/*.js`,
                     `!${paths.js.src}/serviceworker.js`,
                     `!${paths.js.src}/vendors/**/*.js`])
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format());
});

// Compile JavaScript
gulp.task('js-compile', ['js-lint'], () => {
    return gulp.src([`${paths.js.src}/**/*.js`,
                     `!${paths.js.src}/serviceworker.js`,
                     `!${paths.js.src}/vendors/**/{loadcss.js,loadcss-preload-polyfill.js,svg4everybody.js}`])
        .pipe(plumber())
        .pipe(newer(`${paths.js.dest}/`))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('main.js'))
        .pipe(gulp.dest(`${paths.js.dest}/`))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(`${paths.js.dest}/`));
});

// Generate inline LoadCSS include
gulp.task('js-loadcss', () => {
    return gulp.src([`${paths.js.src}/vendors/loadcss.js`,
                     `${paths.js.src}/vendors/loadcss-preload-polyfill.js`])
        .pipe(plumber())
        .pipe(newer(`${paths.includes}/generated/`))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(concat('loadcss.html'))
        .pipe(gulp.dest(`${paths.includes}/generated/`));
});

// Place the Service Worker at the root
gulp.task('js-serviceworker', () => {
    return gulp.src(`${paths.js.src}/serviceworker.js`)
        .pipe(plumber())
        .pipe(newer(`${paths.root}/`))
        .pipe(gulp.dest(`${paths.root}/`));
});

// -----------------------------------------------------------------------------

// Compress src images
gulp.task('compress-images', () => {
    return gulp.src(`${paths.images.src}/**/*`, { base: paths.images.src })
        .pipe(plumber())
        .pipe(newer(`${paths.images.dest}/`))
        .pipe(imagemin())
        .pipe(gulp.dest(`${paths.images.dest}/`));
});

// Generate WebP-format counterparts for all PNG images
gulp.task('png-to-webp', () => {
    return gulp.src(`${paths.images.src}/**/*.png`, { base: paths.images.src })
        .pipe(plumber())
        .pipe(newer(`${paths.images.dest}/`))
        .pipe(imagemin([
            webp({
                lossless: true
            })
        ]))
        .pipe(rename({
            extname: '.webp'
        }))
        .pipe(gulp.dest(`${paths.images.dest}/`));
});

// -----------------------------------------------------------------------------

// Default task
gulp.task('default', () => {
    gulp.start('css');
    gulp.start('js');
    gulp.start('images');
});

// CSS task
gulp.task('css', () => {
    gulp.start('css-main');
    gulp.start('css-critical');
    gulp.start('css-sassdoc');
});

// JS task
gulp.task('js', ['js-compile'], () => {
    gulp.start('js-loadcss');
    gulp.start('js-serviceworker');
});

// Images task
gulp.task('images', ['compress-images'], () => {
    gulp.start('png-to-webp');
});

// -----------------------------------------------------------------------------

// Watch files and perform the appropriate tasks
gulp.task('watch', ['css', 'js'], () => {
    watch(`${paths.css.src}/**/*`, () => {
        gulp.start('css');
    });
    watch(`${paths.js.src}/**/*`, () => {
        gulp.start('js');
    });
    watch(`${paths.images.src}/**/*`, () => {
        gulp.start('images');
    });
});
