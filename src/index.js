/**
 *
 * Pretty-Logger
 *
 * a simple logging library to make it easier for developers to log.  With this
 * library we want to achieve the following:
 *
 * 1.  pretty (read: human readable) console logs
 * 2.  informative console logs
 * 3.  control when, where and how console logs appear
 *
 * There are several libraries that already do this, however, unless there is
 * a must have feature that would be too difficult to implement ourselves, it
 * is very easy to roll out our own which give us 100% control over what and
 * how we log.
 *
 * This logging library supports latest browsers.  It will be very easy to make
 * it node compatible, but we are focusing this as
 * a front-end tool for the time being
 *
 * the log levels are as follows:
 *
 * info  : interesting to support stuff - read like prose
 * debug : interesting to developers - read in a way that is helpful
 * warn  : tell us a potential mistake we have made and how to resolve
 * error : tell us about a mistake that has happened and how to resolve
 *
 * @todo reduce the info, debug, warn and error function to a factory
 * @todo the VERSION should probably come from a package.json file.  We can acquire
 *       the version from the package.json by using a line like this:
 *       const VERSION = require('../package.json').version;
 */

/**
 * Contstants
 */

// current version of this logging library
const VERSION = '0.0.1';

/**
 * available log colors - purely a style thing and yes, the hex codes will not
 * work inside of the node environments.
 */
const COLORS = {
  PALE_VIOLET_RED: '#2724FA',
  TRADE_WIND_GREEN: '#007867',
  BLUSH_PINK: '#E69022',
  IRIS_BLUE: '#FC1052',
};

/**
 * each log level is an array with three values:  name, value, color.  For
 * example, to acces the info name - the first index - you would write
 * LEVEL.INFO[0] // 'info'
*/
const LEVEL = {
  INFO: ['info', 0, COLORS.PALE_VIOLET_RED],
  DEBUG: ['debug', 10, COLORS.TRADE_WIND_GREEN],
  WARN: ['warn', 20, COLORS.BLUSH_PINK],
  ERROR: ['error', 30, COLORS.IRIS_BLUE],
};

/**
 * logging system default level - which levels to show in console
 * @type {number}
*/
const DEFAULT_LEVEL = getLevelValue(LEVEL.INFO);

// Helpers
// ============================================================================

/**
 * getter used to access a levels human readable name
 * @param {array} level - LEVEL.INFO
*/
function getLevelName(level) {
  const name = level[0];
  const capitalizedName = name.toUpperCase();

  return capitalizedName;
}

/**
 * getter used to access a levels numeric value
 * @param {array} level - LEVEL.INFO
*/
function getLevelValue(level) {
  const value = level[1];

  return value;
}

/**
 * getter used to access a levels color value
 * @param {array} level - LEVEL.INFO
*/
function getLevelColor(level) {
  const color = level[2];

  return color;
}

/**
 * check whether or not the environment is node
 * @return {boolean}
*/
function isNode() {
  return typeof module !== 'undefined' && typeof module.exports !== 'undefined';
}

/**
 * check whether or not the environment is the browser
 * @return {boolean}
*/
function isBrowser() {
  return typeof window !== 'undefined';
}

/**
 * adds color and font-weight to a console log message
 * @param  {string} msg - the string you want to format
 * @param  {string} levelColor - a hexcode e.g. #D87392
 * @return {string}
*/
function formatMsg(msg, levelColor) {
  const theMsg = `%c ${msg}`;
  const theStyles = `color: ${levelColor}; font-weight: bold;`;
  const formattedMsg = [theMsg, theStyles];

  return formattedMsg;
}

// Logging Suite
// ============================================================================

/**
 * format and process the log msg
 * @param {string} levelName - 'INFO', 'DEBUG', 'WARN', 'ERROR'
 * @param {string} category - log category e.g. API, REQUEST etc
 * @param {string} msg - helpful human readable message to log
 * @param {object} data - additional data
 * @example log('INFO', 'API', 'This is an API request', {...});
*/
function log(levelName, category, msg, data) {
  /**
   * the following will generate a message that looks like this:
   * [ info ] - API - Thu Jan 05 2017 16:22:08 GMT-0500 (EST)
  */
  const timestamp = new Date();
  const lvlColor = getLevelColor(LEVEL[levelName]);
  const groupMsg = `[${levelName}] - ${category} - ${timestamp}`;
  const formattedGroupMsg = formatMsg(groupMsg, lvlColor);

  // turn the msg into an object for cleaner reading and machine friendliness
  const logMsg = {category, msg, data};
  const logMsgAsJson = JSON.stringify(logMsg);

  // log to the console
  if (isBrowser) {
    console.groupCollapsed.apply(console, formattedGroupMsg);
    console.log(logMsg);
    console.groupEnd();
  }
}

/**
 * This is a helper method to reduce boilerplate.  The idea is that we use this
 * to generate logging functions which are functions that log a specific level.
 * for example, if you create log = makeLogger('LOG') you can then call it like
 * this:
 *
 * @example log('INFO', 'API', 'This is an API request', {...});
 *
 * this is going to be an internal tool, the enduser will only be responsible
 * for creating some additional log levels if needed and then we will handle
 * the generation of these methods on our end.  I believe this is a strong idea
 * as it make this library very much data driven.
*/

function makeLogger(logName, ...argNames) {
  return function(category, message, data, ...argNames) {
    const levelValue = getLevelValue(LEVEL[logName]);
    const isActiveLogLevel = DEFAULT_LEVEL <= levelValue;

    if (isActiveLogLevel) {
      log(logName, category, message, data);
    }
  };
}

export const logInfo = makeLogger('INFO');
export const logDebug = makeLogger('DEBUG');
export const logWarn = makeLogger('WARN');
export const logError = makeLogger('ERROR');

/**
 * exports
*/
const logger = {
  VERSION,
};

export default logger;
