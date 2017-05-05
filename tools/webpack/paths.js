/**
 * Paths
 *
 * These are absolute paths to important files and folders
 */

// core
const path = require('path');
const fs = require('fs');

/**
 * Helpers
 */

// absolute path to the client dir
const clientDirectory = fs.realpathSync(process.cwd());

console.log(process.cwd());

/**
 *  Takes a relative path and will return the absolute path
 *
 *  @example
 *  const absolutePath = resolveClient('./src');
 *  // returns anbsolute/path/to/client/src/
 *
 *  @param {string} relativePath relative path
 */
function resolveClient(relativePath) {
  return path.resolve(clientDirectory, relativePath);
}

/**
 * Absolute Paths
 *
 * Each of the following represents an absolute path to the folders specified.
 * Example:  app.src
 *    absolute/path/client/src
 */
const app = {
  src: resolveClient('./src'),
  dist: resolveClient('./dist'),
  entry: resolveClient('./src/index.js'),
  pkgJson: resolveClient('./package.json'),
  nodeModules: resolveClient('./node_modules'),
  outputFilename: 'index.js'
};

/**
 * Exports
 */

module.exports = {
  app
};
