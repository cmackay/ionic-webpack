
'use strict';

/**
 * Module dependencies
 */
var path            = require('path'),
  webpack           = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  cache: true,

  entry: {
    'index': './app/index'
  },

  output: {
    path          : path.join(__dirname, 'www'),
    filename      : '[name].js',
    chunkFilename : '[chunkhash].js'
  },

  module: {

    loaders: [{
      test   : /\.css$/,
      loader : 'style!css'
    }, {
      test   : /\.html$/,
      loader : 'html'
    }, {
      test   : /\.json$/,
      loader : 'json'
    }, {
      test   : /\.scss$/,
      loader : 'style!css!sass?outputStyle=expanded'
    }, {
      test   : /\.woff/,
      loader : 'url?prefix=font/&limit=10000&mimetype=application/font-woff'
    }, {
      test   : /\.ttf/,
      loader : 'file?prefix=font/'
    }, {
      test   : /\.eot/,
      loader : 'file?prefix=font/'
    }, {
      test   : /\.svg/,
      loader : 'file?prefix=font/'
    }, {
      test   : /[\/]angular\.js$/,
      loader : 'exports?angular'
    }],

    // NOTE: this helps build speed on larger libraries that do not use commonjs
    noParse: [
      /node_modules[\/\\]ionic/
    ]
  },

  resolve: {
    root: [
      path.resolve('app')
    ],
    moduleDirectories: [
      'node_modules'
    ],
    alias: {
      'ionic-angular' : 'ionic/release/js/ionic-angular',
      'angular'       : 'ionic/release/js/angular/angular',
      'ngAnimate'     : 'ionic/release/js/angular/angular-animate',
      'ngSanitize'    : 'ionic/release/js/angular/angular-sanitize',
      'ui.router'     : 'ionic/release/js/angular-ui/angular-ui-router'
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new HtmlWebpackPlugin({
      pkg      : require('./package.json'),
      template : 'app/entry-template.html',
    })
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.UglifyJsPlugin()
    // new webpack.BannerPlugin(banner, options),
    // new webpack.optimize.DedupePlugin()
  ]

};
