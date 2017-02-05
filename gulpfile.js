// Include gulp
var gulp = require('gulp');

// Include plugins
var jshint = require('gulp-jshint');
var jsbeautify = require('gulp-beautify');

// Define Source Location
var SOURCE = ['*.js', 'models/*.js', 'routes/*.js'];

// Lint Task
gulp.task('lint', function() {
  return gulp.src(SOURCE)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('beautify', function() {
  gulp.src(SOURCE, {
      base: './'
    })
    .pipe(jsbeautify({
      indent_size: 2
    }))
    .pipe(gulp.dest('./'));
});

// Default Task
gulp.task('default', ['lint', 'beautify']);