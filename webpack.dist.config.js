/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

'use strict';

var webpack = require('webpack'),
    path = require('path');

module.exports = {

  output: {
    publicPath: '/assets/',
    path: 'dist/assets/',
    filename: 'main.js'
  },

  debug: false,
  devtool: false,
  entry: './src/scripts/components/main.js',

  stats: {
    colors: true,
    reasons: false
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],

  resolve: {
    extensions: ['', '.js'],
    alias: {
      'bower_components': __dirname + '/bower_components/',
      'styles': __dirname + '/src/styles',
      'scripts': __dirname + '/src/scripts/',
      'components': __dirname + '/src/scripts/components/',
      'stores': __dirname + '/src/scripts/stores/',
      'actions': __dirname + '/src/scripts/actions/'
    }
  },

  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'jsxhint'
    }],

    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.scss/,
      loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded' +
          '&includePaths[]=' + (path.resolve(__dirname, './bower_components'))
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less'
    }, {
      test: /\.(png|jpg|woff|woff2)$/,
      loader: 'url-loader?limit=8192'
    }, {
      test: /\.ttf$/,
      loader: 'file-loader'
    }, { test: /\.eot$/,
      loader: 'file-loader'
    }, { test: /\.svg$/,
      loader: 'file-loader'
    }]
  }
};
