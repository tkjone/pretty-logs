/**
 * Webpack parts
 *
 * Breaking down our webpack configuration into composable parts.
 */

// core
const webpack = require('webpack');

// third party
const BabiliPlugin = require('babili-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

/**
 * Source Maps
 */
exports.generateSourceMaps = ({ type }) => ({
  devtool: type
});

/**
 * Babel
 */
exports.loadJavaScript = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,

        loader: 'babel-loader',
        options: {
          // Enable caching for improved performance during
          // development.
          // It uses default OS directory by default. If you need
          // something more custom, pass a path to it.
          // I.e., { cacheDirectory: '<path>' }
          cacheDirectory: true
        }
      }
    ]
  }
});

/**
 * Revisions
 */
exports.attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version()
    })
  ]
});

/**
 * Minify JavaScript
 */
exports.minifyJavaScript = () => ({
  plugins: [new BabiliPlugin()]
});

/**
 * Clean JavaScript
 */
// exports.clean = path => ({
//   plugins: [new CleanWebpackPlugin([path])]
// });
