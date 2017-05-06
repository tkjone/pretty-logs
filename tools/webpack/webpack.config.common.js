/**
 * Webpack Base Configuration
 *
 * http://survivejs.com/webpack/developing-with-webpack/composing-configuration/
 */

// first party
const paths = require('./paths');
const pkg = require('../../package.json');

/**
 * Configuration
 */

const baseConfig = function() {
  return {
    // https://webpack.js.org/configuration/entry-context/
    entry: paths.app.entry,

    // https://webpack.js.org/configuration/output/
    output: {
      filename: paths.app.outputFilename,
      path: paths.app.dist
    },

    module: {
      // babel
      rules: [
        {
          test: /\.js$/,
          include: paths.app.src,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  // enable tree shaking
                  ['es2015', { modules: false }]
                ]
              }
            }
          ]
        }

        // other configs here
      ]
    }
  };
};

/**
 * Export
 */

module.exports = baseConfig;
