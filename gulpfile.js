// Gulp Configuration

var gulp = require('gulp');
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    autoprefix = require('gulp-autoprefixer');

gulp.task('styles', function() {
    return gulp.src('css/ravenous.scss')
        .pipe(sass({ style: 'expanded', includePaths: ['css/'] }))
        .pipe(autoprefix("last 2 versions", "> 1%"))
        .pipe(gulp.dest('css/'))
        .pipe(rename('ravenous.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('css/'))
        .pipe(notify({ title: 'Gulp', message: 'SASS compiled.', onLast: true }));
});

gulp.task('default', function() {
    gulp.run('styles');
});

gulp.task('watch', function() {
    gulp.watch('css/**/*.scss', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', compiling...');
        gulp.run('styles');
    });
});