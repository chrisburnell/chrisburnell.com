/**
 * Gulp Configuration
 * @author Chris Burnell
 */

"use strict";

// Define gulp-centric objects
let gulp = require("gulp");
let babel = require("gulp-babel");
let concat = require("gulp-concat");
let csso = require("gulp-csso");
let imagemin = require("gulp-imagemin");
let newer = require("gulp-newer");
let plumber = require("gulp-plumber");
let postcss = require("gulp-postcss");
let prettier = require("@bdchauvette/gulp-prettier");
let rename = require("gulp-rename");
let sass = require("gulp-sass");
let watch = require("gulp-watch");
let webp = require("gulp-webp");

// Define other objects
let autoprefixer = require("autoprefixer");

// Define paths
const paths = {
    root: ".",
    css: {
        src: "src/sass",
        dest: "css"
    },
    js: {
        src: "src/js",
        dest: "js"
    },
    images: {
        src: "src/images",
        dest: "images"
    },
    includes: "_includes"
};

// -----------------------------------------------------------------------------

// Prettify Sass
gulp.task("css-prettify", () => {
    return gulp
        .src([`!${paths.css.src}/vendors/*.scss`, `${paths.css.src}/**/*.scss`])
        .pipe(plumber())
        .pipe(newer(`${paths.css.src}`))
        .pipe(
            prettier({
                printWidth: 999,
                tabWidth: 4
            })
        )
        .pipe(gulp.dest(`${paths.css.src}/`));
});

// Compile CSS from Sass
gulp.task("css-compile", () => {
    return gulp
        .src([`${paths.css.src}/main.scss`, `${paths.css.src}/non-critical.scss`])
        .pipe(plumber())
        .pipe(
            sass({
                errLogToConsole: true,
                indentWidth: 4,
                outputStyle: "expanded"
            })
        )
        .pipe(postcss([autoprefixer()]))
        .pipe(
            prettier({
                printWidth: 999,
                tabWidth: 4
            })
        )
        .pipe(gulp.dest(`${paths.css.dest}/`))
        .pipe(csso())
        .pipe(
            rename({
                suffix: ".min"
            })
        )
        .pipe(gulp.dest(`${paths.css.dest}/`));
});

// Generate inline Critical CSS include
gulp.task("css-critical", () => {
    return gulp
        .src(`${paths.css.src}/critical.scss`)
        .pipe(plumber())
        .pipe(
            sass({
                errLogToConsole: true,
                indentWidth: 4,
                outputStyle: "expanded"
            })
        )
        .pipe(postcss([autoprefixer()]))
        .pipe(
            prettier({
                printWidth: 999,
                tabWidth: 4
            })
        )
        .pipe(gulp.dest(`${paths.css.dest}/`))
        .pipe(csso())
        .pipe(
            rename({
                suffix: ".min"
            })
        )
        .pipe(gulp.dest(`${paths.css.dest}/`))
        .pipe(
            rename({
                basename: "critical-css",
                extname: ".html"
            })
        )
        .pipe(gulp.dest(`${paths.includes}/generated/`));
});

// -----------------------------------------------------------------------------

// Prettify JavaScript
gulp.task("js-prettify", () => {
    return gulp
        .src([`!${paths.js.src}/vendors/*.js`, `!${paths.js.src}/serviceworker.js`, `${paths.js.src}/**/*.js`])
        .pipe(plumber())
        .pipe(newer(`${paths.js.src}/`))
        .pipe(
            prettier({
                printWidth: 999,
                tabWidth: 4
            })
        )
        .pipe(gulp.dest(`${paths.js.src}/`));
});

// Concatenate JavaScript
gulp.task("js-concat", () => {
    return gulp
        .src([
            `${paths.js.src}/helpers.js`, // dependency
            `${paths.js.src}/**/*.js`,
            `!${paths.js.src}/serviceworker.js`
        ])
        .pipe(plumber())
        .pipe(concat("main.js"))
        .pipe(gulp.dest(`${paths.js.dest}/`))
        .pipe(babel())
        .pipe(
            rename({
                suffix: ".min"
            })
        )
        .pipe(gulp.dest(`${paths.js.dest}/`));
});

// Place the CSS rel preload file in the right place
gulp.task("js-css-preload", () => {
    return gulp
        .src(`${paths.js.src}/vendors/cssrelpreload.js`)
        .pipe(plumber())
        .pipe(babel())
        .pipe(
            rename({
                basename: "css-rel-preload",
                extname: ".html"
            })
        )
        .pipe(gulp.dest(`${paths.includes}/generated/`));
});

// Place the Service Worker at the root
gulp.task("js-serviceworker", () => {
    return gulp
        .src(`${paths.js.src}/serviceworker.js`)
        .pipe(plumber())
        .pipe(gulp.dest(`${paths.root}/`));
});

// -----------------------------------------------------------------------------

// Compress standard-type images
// Generate WebP-format counterparts for all standard-type images
gulp.task("images-compress", () => {
    return gulp
        .src(`${paths.images.src}/**/*.{gif,jpg,jpeg,png}`, { base: paths.images.src })
        .pipe(plumber())
        .pipe(newer(`${paths.images.dest}`))
        .pipe(imagemin())
        .pipe(gulp.dest(`${paths.images.dest}/`))
        .pipe(webp())
        .pipe(gulp.dest(`${paths.images.dest}/`));
});

// Move SVGs to destination
gulp.task("images-move-svg", () => {
    return gulp
        .src(`${paths.images.src}/**/*.svg`, { base: paths.images.src })
        .pipe(plumber())
        .pipe(newer(`${paths.images.dest}`))
        .pipe(gulp.dest(`${paths.images.dest}/`));
});

// -----------------------------------------------------------------------------

// CSS task
gulp.task("css", gulp.series("css-prettify", gulp.parallel("css-compile", "css-critical")));

// JS task
gulp.task("js", gulp.series("js-concat", gulp.parallel("js-css-preload", "js-serviceworker")));

// Images task
gulp.task("images", gulp.series("images-compress", gulp.parallel("images-move-svg")));

// Default task
gulp.task("default", gulp.parallel("css", "js", "images"));

// -----------------------------------------------------------------------------

// Watch files and perform the appropriate tasks
gulp.task("watch", () => {
    gulp.watch(`${paths.css.src}/**/*`, gulp.series("css"));
    gulp.watch(`${paths.js.src}/**/*`, gulp.series("js"));
    gulp.watch(`${paths.images.src}/**/*`, gulp.series("images"));
});
