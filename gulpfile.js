/**
 * Gulp Configuration
 */

var gulp = require('gulp');
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    autoprefix = require('gulp-autoprefixer');

var cssDir = 'css/',
    imagesDir = 'images/';

// Compile SCSS, autoprefix CSS3, and minify
gulp.task('css', function() {
    return gulp.src(cssDir + 'ravenous.scss')
        .pipe(sass({ style: 'expanded', includePaths: [cssDir] }))
        .pipe(autoprefix("last 2 versions", "> 1%"))
        .pipe(gulp.dest(cssDir))
        .pipe(rename('ravenous.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(cssDir))
        .pipe(notify({ title: 'Gulp', message: 'CSS compiled.', onLast: true }));
});

// Crush images
gulp.task('images', function() {
    return gulp.src('images/**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('images'))
        .pipe(notify({ title: 'Gulp', message: 'Images crushed.', onLast: true }));
});

// Default task
gulp.task('default', function() {
    gulp.run('css');
});

// Watch files and perform tasks
gulp.task('watch', function() {
    gulp.watch(cssDir + '**/*.scss', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.run('css');
    });
    gulp.watch(imagesDir + '**/*', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.run('images');
    });
});