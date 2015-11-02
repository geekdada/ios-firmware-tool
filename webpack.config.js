/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
var webpack = require('webpack'),
    path = require('path');

module.exports = {

  output: {
    filename: 'main.js',
    publicPath: '/assets/'
  },

  cache: true,
  debug: true,
  devtool: false,
  entry: [
      'webpack/hot/only-dev-server',
      './src/scripts/components/main.js'
  ],

  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
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
      loader: 'react-hot!babel'
    }, {
      test: /\.scss/,
      loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded' +
          '&includePaths[]=' + (path.resolve(__dirname, './bower_components'))
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
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
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]

};
