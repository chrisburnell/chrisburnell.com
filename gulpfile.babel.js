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
        src: "src/scss",
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
    fonts: {
        src: "src/fonts",
        dest: "fonts"
    },
    includes: "_includes"
};

// -----------------------------------------------------------------------------

// Prettify Sass
gulp.task("css-prettify", () => {
    return gulp
        .src([
            `${paths.css.src}/**/*.scss`,
            `!${paths.css.src}/vendors/*.scss`
        ])
        .pipe(plumber())
        .pipe(newer(`${paths.css.src}`))
        .pipe(
            prettier({
                printWidth: 9999,
                tabWidth: 4
            })
        )
        .pipe(gulp.dest(`${paths.css.src}/`));
});

// Compile CSS from Sass
gulp.task("css-compile", () => {
    return gulp
        .src([
            `${paths.css.src}/*.scss`,
            `!${paths.css.src}/critical.scss`
        ])
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
                printWidth: 9999,
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
                printWidth: 9999,
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
                basename: "critical_css",
                extname: ".liquid"
            })
        )
        .pipe(gulp.dest(`${paths.includes}/generated/`));
});

// -----------------------------------------------------------------------------

// Prettify JavaScript
gulp.task("js-prettify", () => {
    return gulp
        .src([
            `${paths.js.src}/**/*.js`,
            `!${paths.js.src}/serviceworker.js`,
            `!${paths.js.src}/vendors/*.js`
        ])
        .pipe(plumber())
        .pipe(newer(`${paths.js.src}/`))
        .pipe(
            prettier({
                printWidth: 9999,
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

// Place the Service Worker at the root
gulp.task("js-serviceworker", () => {
    return gulp
        .src(`${paths.js.src}/serviceworker.js`)
        .pipe(plumber())
        .pipe(gulp.dest(`${paths.root}/`));
});

// Place the Vendor files in the JS directory
gulp.task("js-vendors", () => {
    return gulp
        .src([
            `${paths.js.src}/vendors/**/*.js`,
            `!${paths.js.src}/vendors/picturefill.js`
        ])
        .pipe(plumber())
        .pipe(gulp.dest(`${paths.js.dest}/vendors/`))
        .pipe(babel())
        .pipe(
            rename({
                suffix: ".min"
            })
        )
        .pipe(gulp.dest(`${paths.js.dest}/vendors/`));
});

// -----------------------------------------------------------------------------

// Compress standard-type images
// Generate WebP-format counterparts for JPGs and PNGs
gulp.task("images-compress", () => {
    return gulp
        .src(`${paths.images.src}/**/*.{jpg,jpeg,png}`, { base: paths.images.src })
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

// Move fonts to destination
gulp.task("fonts-move", () => {
    return gulp
        .src(`${paths.fonts.src}/**/*`)
        .pipe(plumber())
        .pipe(newer(`${paths.fonts.dest}`))
        .pipe(gulp.dest(`${paths.fonts.dest}/`));
});

// -----------------------------------------------------------------------------

// CSS task
gulp.task("css", gulp.series("css-prettify", gulp.parallel("css-compile", "css-critical")));

// JS task
gulp.task("js", gulp.series("js-concat", "js-serviceworker", "js-vendors"));

// Images task
gulp.task("images", gulp.series("images-compress", "images-move-svg"));

// Fonts task
gulp.task("fonts", gulp.series("fonts-move"));

// Default task
gulp.task("default", gulp.parallel("css", "js", "images", "fonts"));

// -----------------------------------------------------------------------------

// Watch files and perform the appropriate tasks
gulp.task("watch", () => {
    gulp.watch(`${paths.css.src}/**/*`, gulp.series("css"));
    gulp.watch(`${paths.js.src}/**/*`, gulp.series("js"));
    gulp.watch(`${paths.images.src}/**/*`, gulp.series("images"));
    gulp.watch(`${paths.fonts.src}/**/*`, gulp.series("fonts"));
});
