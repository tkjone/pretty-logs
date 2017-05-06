/**
 * pretty-logs Webpack Configs
 *
 */

// imports
const path = require('path');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');

/**
 * Setup
 */
const PATHS = {
  src: path.join(__dirname, '../../src'),
  dist: path.join(__dirname, '../../dist')
};

/**
 * Common webpack configs
 */

const commonConfig = merge([
  {
    entry: {
      lib: PATHS.src
    },
    output: {
      path: PATHS.dist,
      library: 'pretty-logs',
      libraryTarget: 'umd' // Default
    }
  },
  parts.attachRevision(),
  parts.generateSourceMaps({ type: 'source-map' }),
  parts.loadJavaScript({ include: PATHS.src })
]);

/**
 * Library webpack configs
 */

const libraryConfig = merge([
  commonConfig,
  {
    output: {
      filename: 'pretty-logs' + '.js'
    }
  }
]);

/**
 * Library-min webpack configs
 */

const libraryMinConfig = merge([
  commonConfig,
  {
    output: {
      filename: 'pretty-logs' + '.min.js'
    }
  },
  parts.minifyJavaScript({ useSourceMap: true })
]);

module.exports = [libraryConfig, libraryMinConfig];
