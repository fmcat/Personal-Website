/**
 * Adopted roughly from the Gergory Opperman's ShackUp Gulp setup
 * @see https://github.com/gopperman/ShackUp/blob/master/gulpfile.js
 */
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del');

gulp.task('styles', function() {
 return sass('assets/css/main.scss', { style: 'expanded' })
 .pipe(gulp.dest('assets/css'))
 .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src(['scripts/**/*.js', '!scripts/**/*.min.js', '!scripts/**/main.js'])
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('scripts'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('default', function() {
    gulp.start('styles', 'scripts');
    gulp.start('clean');
    gulp.start('watch');
});

gulp.task('clean', ['scripts'], function() {
    return del(['scripts/main.js']);
});

gulp.task('watch', function() {
 // Watch .scss files
 gulp.watch('assets/css/**/*.scss', ['styles']);
});

// gulp.task('watch', function() {
//   gulp.watch(['assets/css/**/*.scss', 'assets/css/modules/*.scss'], ['styles']);
//   //gulp.watch(['scripts/**/*.js', '!scripts/**/*.min.js', '!scripts/**/main.js'], ['scripts', 'clean']);
// });