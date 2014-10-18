
'use strict';

/**
 * Module dependencies
 */
var gulp           = require('gulp'),
  gutil            = require('gulp-util'),
  path             = require('path'),
  del              = require('del'),
  open             = require('open'),
  webpack          = require('webpack'),
  WebpackDevServer = require('webpack-dev-server'),
  webpackConfig    = require('./webpack.config.js');

gulp.task('webpack', function (callback) {
  webpack(webpackConfig, function (err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    gutil.log('[webpack]', stats.toString({
      colors: true
    }));

    callback();
  });
});

gulp.task('webpack-dev-server', function (callback) {
  new WebpackDevServer(webpack(webpackConfig), {

    contentBase: path.join(__dirname, 'www'),

    stats: {
      colors: true
    }

  }).listen(8080, 'localhost', function (err) {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }

    var startUrl = 'http://localhost:8080/webpack-dev-server/index.html';
    open(startUrl);
    gutil.log('[webpack-dev-server]', startUrl);

  });
});

gulp.task('clean', function (cb) {
  del([
    'www/**/*',
    '!www/.gitignore'
  ], {
    dot: true
  }, cb);
});

gulp.task('clean-all', function (cb) {
  del([
    'www/**/*',
    '!www/.gitignore',
    'node_modules',
    'bower_components'
  ], {
    dot: true
  }, cb);
});

gulp.task('install', ['webpack']);
gulp.task('watch', ['webpack-dev-server']);
gulp.task('default', ['install']);
