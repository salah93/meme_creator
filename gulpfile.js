const cssnano = require('gulp-cssnano');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const webpackStream = require('webpack-stream');
const composer = require('gulp-uglify/composer');
const uglifyjs = require('uglify-es');


const minify = composer(uglifyjs, console);

gulp.task('watch', function() {
  gulp.watch('src/jsx/*', ['build:react']);
});

gulp.task('build', ['build:react']);


gulp.task('build:react', () => {
  return gulp.src('./src/jsx/index.js')
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulpIf('*.js', minify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('./src/js'));
});
