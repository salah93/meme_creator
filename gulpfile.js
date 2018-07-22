const browserSync = require('browser-sync').create();
const composer = require('gulp-uglify/composer');
const cssnano = require('gulp-cssnano');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const uglifyjs = require('uglify-es');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const webpackStream = require('webpack-stream');


const minify = composer(uglifyjs, console);

gulp.task('watch', ['browserSync'], function() {
  gulp.watch('src/jsx/*', ['build:react']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['build:react']);


gulp.task('build:react', () => {
  return gulp.src('./src/jsx/index.js')
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulpIf('*.js', minify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('./src/js'));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src',
    },
  });
});
