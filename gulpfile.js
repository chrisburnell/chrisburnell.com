/**
 * Ravenous gulp Configuration
 */

// Define gulp objects
var gulp            = require('gulp'),
    autoprefixer    = require('gulp-autoprefixer'),
    minifycss       = require('gulp-minify-css'),
    plumber         = require('gulp-plumber'),
    notify          = require('gulp-notify'),
    rename          = require('gulp-rename'),
    sass            = require('gulp-sass'),
    sourcemaps      = require('gulp-sourcemaps'),
    watch           = require('gulp-watch');

// Define the locations of our assets
var cssDir =    'css/';

// -----------------------------------------------------------------------------

// Compile SASS, autoprefix properties, and minify
gulp.task('css', function() {
    return gulp.src(cssDir + 'ravenous.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            includePaths: [cssDir],
            style: 'expanded'
        }))
        .pipe(autoprefixer("last 2 versions", "> 1%"))
        .pipe(gulp.dest(cssDir))
        .pipe(rename('ravenous.min.css'))
        .pipe(minifycss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cssDir))
        .pipe(notify({ title: 'gulp', message: 'CSS compiled.', onLast: true }));
});

// -----------------------------------------------------------------------------

// Default task
gulp.task('default', function() {
    gulp.start('css');
});

// -----------------------------------------------------------------------------

// Watch files and perform the appropriate tasks
gulp.task('watch', function() {
    watch({glob: cssDir + '**/*.scss', emitOnGlob: false}, ['css']);
});
