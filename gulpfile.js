var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload');


  var gulp = require('gulp');
  var mocha = require('gulp-mocha');
  var util = require('gulp-util');

gulp.task('test', function () {
  return gulp.src(['test/**/*.js'], { read: false })
  .pipe(mocha({ reporter: 'spec' }))
  .on('error', util.log);
});

gulp.task('watch-test', function () {
  gulp.watch(['views/**', 'public/**', 'app.js', 'framework/**', 'test/**', 'src/**'], ['test']);
});



gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'bin/www',
    ext: 'js ejs coffee',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'develop'
]);
