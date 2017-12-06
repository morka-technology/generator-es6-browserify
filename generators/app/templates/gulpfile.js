'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const browserify = require('browserify');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');

gulp.task('build', function () {
  browserify({
    entries: './src/index.js',
    debug: true
  })
    .transform(babelify)
    .on('error',gutil.log)
    .bundle()
    .on('error',gutil.log)
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(babel({
      presets: ['es2015']
    }))
    .on('error', gutil.log)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
})

gulp.task('build-prod', ['build'], function () {
  browserify({
    entries: './src/index.js',
    debug: true
  })
    .transform(babelify)
    .on('error',gutil.log)
    .bundle()
    .on('error',gutil.log)
    .pipe(source('index.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(babel({
      presets: ['es2015']
    }))
    .on('error', gutil.log)
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
})


gulp.task('watch', function () {
  gulp.watch(['src/*/*.js'], ['build'])
});
