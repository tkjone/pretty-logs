/**
 * Webpack Configs
 *
 * This file inherits from webpack.config.base and specified different settings
 * for each environment:  dev, prod etc
 */

// third party
const webpackMerge = require('webpack-merge');

// first party
const baseConfig = require('./webpack.config.common.js');
const paths = require('./paths');

/**
 * Development
 *
 * currently nothng specified.  only using webpack to build prod.
 */

const devConfig = function() {
  return webpackMerge(
    baseConfig(),
    {
      // your configs here
    }
  );
};

/**
 * Production
 */

const prodConfig = function() {
  return webpackMerge(baseConfig(), {
    output: {
      filename: paths.app.outputFilename,
      path: paths.app.dist
    }
  });
};

/**
 * Helpers
 */

function buildConfig(env) {
  if (env === 'production') {
    return prodConfig();
  }

  return devConfig();
}

/**
 * Exports
 */

module.exports = buildConfig;
