
// @LINK: http://russmatney.com/techsposure/basic-koa-api-gulp-supertest/

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');

var files = [
  'gulpfile.js',
  'app.js',
  'routes/*.js',
  'lib/*.js'
];

gulp.task('lint', function () {
  return gulp.src(files)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('nodemon', function() {
  nodemon({
    script: 'app.js',
    nodeArgs: ['--harmony']
  }).on('restart');
});

gulp.task('watch', function () {
  gulp.watch(files, ['lint']);
});
