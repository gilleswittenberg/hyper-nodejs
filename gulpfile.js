
// @LINK: http://russmatney.com/techsposure/basic-koa-api-gulp-supertest/

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha-co');
var exit = require('gulp-exit');

var files = [
  'gulpfile.js',
  'app.js',
  'routes/*.js',
  'test/*.js',
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
  gulp.watch(files, ['lint', 'test']);
});

gulp.task('test', function () {
  process.env.PORT = 7677;
  process.env.NODE_ENV = 'test';
  return gulp.src('test/*')
    .pipe(mocha({reporter: 'nyan'}));
});

// node --harmony `which gulp` test-once
gulp.task('test-once', function() {
  process.env.NODE_ENV = 'test';
  gulp.tasks.test.fn().pipe(exit());
});
