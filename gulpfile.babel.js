/**
 * Gulp Configuration
 * @author Chris Burnell
 */

"use strict";

// Define gulp-centric objects
let gulp = require("gulp");
let babel = require("gulp-babel");
let concat = require("gulp-concat");
let imagemin = require("gulp-imagemin");
let newer = require("gulp-newer");
let plumber = require("gulp-plumber");
let postcss = require("gulp-postcss");
let prettier = require("@bdchauvette/gulp-prettier");
let rename = require("gulp-rename");
let sass = require("gulp-sass");
let sourcemaps = require("gulp-sourcemaps");
let watch = require("gulp-watch");
let webp = require("gulp-webp");

// Define other objects
let autoprefixer = require("autoprefixer");
let cssnano = require("cssnano");

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
gulp.task("css-main", ["css-prettify"], () => {
    return gulp
        .src([`${paths.css.src}/main.scss`, `${paths.css.src}/main-without-variables.scss`, `${paths.css.src}/non-critical.scss`])
        .pipe(plumber())
        .pipe(newer(`${paths.css.dest}`))
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                errLogToConsole: true,
                indentWidth: 4,
                outputStyle: "expanded",
                sourceMap: paths.css.src
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
        .pipe(postcss([cssnano()]))
        .pipe(
            rename({
                suffix: ".min"
            })
        )
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(`${paths.css.dest}/`));
});

// Generate inline Critical CSS include
gulp.task("css-critical", () => {
    return gulp
        .src(`${paths.css.src}/critical.scss`)
        .pipe(plumber())
        .pipe(newer(`${paths.includes}/generated/`))
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
        .pipe(postcss([cssnano()]))
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
gulp.task("js-concat", ["js-prettify"], () => {
    return gulp
        .src([
            `${paths.js.src}/helpers.js`, // dependency
            `${paths.js.src}/**/*.js`,
            `!${paths.js.src}/serviceworker.js`
        ])
        .pipe(plumber())
        .pipe(newer(`${paths.js.dest}/`))
        .pipe(sourcemaps.init())
        .pipe(concat("main.js"))
        .pipe(gulp.dest(`${paths.js.dest}/`))
        .pipe(babel())
        .pipe(
            rename({
                suffix: ".min"
            })
        )
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(`${paths.js.dest}/`));
});

// Place the Service Worker at the root
gulp.task("js-serviceworker", () => {
    return gulp
        .src(`${paths.js.src}/serviceworker.js`)
        .pipe(plumber())
        .pipe(gulp.dest(`${paths.root}/`));
});

// -----------------------------------------------------------------------------

// Compress src images
gulp.task("compress-images", () => {
    return gulp
        .src(`${paths.images.src}/**/*.{gif,jpg,jpeg,png}`, { base: paths.images.src })
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest(`${paths.images.dest}/`));
});

// Generate WebP-format counterparts for all JPG and PNG images
gulp.task("images-to-webp", () => {
    return gulp
        .src(`${paths.images.src}/**/*.{gif,jpg,jpeg,png}`, { base: paths.images.src })
        .pipe(plumber())
        .pipe(webp())
        .pipe(gulp.dest(`${paths.images.dest}/`));
});

// -----------------------------------------------------------------------------

// Default task
gulp.task("default", () => {
    gulp.start("css");
    gulp.start("js");
    gulp.start("images");
});

// CSS task
gulp.task("css", () => {
    gulp.start("css-main");
    gulp.start("css-critical");
});

// JS task
gulp.task("js", ["js-concat"], () => {
    gulp.start("js-serviceworker");
});

// Images task
gulp.task("images", ["compress-images"], () => {
    gulp.start("images-to-webp");
});

// -----------------------------------------------------------------------------

// Watch files and perform the appropriate tasks
gulp.task("watch", ["css", "js"], () => {
    watch(`${paths.css.src}/**/*`, () => {
        gulp.start("css");
    });
    watch(`${paths.js.src}/**/*`, () => {
        gulp.start("js");
    });
    watch(`${paths.images.src}/**/*`, () => {
        gulp.start("images");
    });
});
