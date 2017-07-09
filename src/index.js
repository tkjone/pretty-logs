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

import {VERSION, COLORS, LEVEL, ICON, BROWSER} from './constants';

/**
 *
 * HELPERS
 *
 */

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
 * sets an alternative logging format for browser which have inconsistent
 * support for the console API
 * @return {boolean}
 */
function isSafeMode() {
  return BROWSER.IS_FIREFOX || BROWSER.IS_EXPLORER;
}

/**
 * check whether or not the environment is the browser
 * @return {boolean}
*/
function isBrowser() {
  return typeof window !== 'undefined';
}

// Logging system default level - which levels to show in console
export const DEFAULT_LEVEL = getLevelValue(LEVEL.INFO);

/**
 * adds color and font-weight to a console log message
 * @param  {string} msg - the string you want to format
 * @param  {string} levelColor - a hexcode e.g. #D87392
 * @return {string}
*/
function formatMsg(msg, levelName) {
  const lvl = LEVEL[levelName];
  const icon = ICON[levelName];
  let message;
  let styles;
  let otherStyles = '';

  /**
   * we are blocked by the browsers and the css properties they have whitelisted.
   * In this scenario we have to handle different browsers unqiely.
   */
  switch (true) {
    case BROWSER.IS_SAFARI:
      message = `%c%c ${msg}`;

      styles = [
        `background-image: url( ${icon} )`,
        'background-repeat: no-repeat',
        'background-size: 15px 15px',
        'padding-left: 15.2px',
      ].join(';');
      otherStyles = [
        `color: ${getLevelColor(lvl)}`,
        'font-weight: bold',
        'display: block',
        'padding-left: 15.2px',
        'padding-top: .4px',
      ].join(';');
      break;

    case BROWSER.IS_CHROME:
      message = `%c ${msg}`;

      styles = [
        `background-image: url( ${icon} )`,
        'background-repeat: no-repeat',
        'background-size: 13px 13px',
        `color: ${getLevelColor(lvl)}`,
        'font-weight: bold',
        'display: block',
        'margin-left: 5px',
        'padding-left: 18px',
      ].join(';');
      break;

    case BROWSER.IS_FIREFOX:
      message = `%c ${msg}`;

      styles = [
        `color: ${getLevelColor(lvl)}`,
        'font-weight: bold',
        'display: block',
        'margin-left: -6px', // line up subject and data logged
      ].join(';');
      break;
    default:
      console.error('pretty-logs could not identify the browser');
      break;
  }

  const styledMessage = [message, styles, otherStyles];

  return styledMessage;
}

/**
 *
 * Logging Suite
 *
 */

/**
 * format and process the log msg:
 *
 *     API - Thu Jan 05 2017 16:22:08 GMT-0500 (EST)
 *
 * @param {string} levelName - 'INFO', 'DEBUG', 'WARN', 'ERROR'
 * @param {string} category - log category e.g. API, REQUEST etc
 * @param {string} msg - helpful human readable message to log
 * @param {object} data - additional data
 * @example log('INFO', 'API', 'This is an API request', {...});
*/
function log(levelName, category, msg, data) {
  // setup
  const timestamp = new Date();
  const lvlColor = getLevelColor(LEVEL[levelName]);
  const groupMsg = `${category} - ${timestamp}`;
  const formattedGroupMsg = formatMsg(groupMsg, levelName);

  // turn the msg into an object for cleaner reading and machine friendliness
  const logMsg = {category, msg, data};
  const logMsgAsJson = JSON.stringify(logMsg);

  // log to the console
  if (isBrowser() && isSafeMode()) {
    console.log(...formattedGroupMsg);
    console.log(logMsg);
    console.log(''); // clear separation of one log to another
  } else if (isBrowser()) {
    console.groupCollapsed(...formattedGroupMsg);
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
 * @example
 *  const logInfo = makeLogger('INFO');
 *  logInfo('API', 'This is an API request', {...});
 *
 * this is going to be an internal tool, the enduser will only be responsible
 * for creating some additional log levels if needed and then we will handle
 * the generation of these methods on our end.  I believe this is a strong idea
 * as it make this library very much data driven.
*/

function makeLogger(logName) {
  return function(category, message, data) {
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
 *
 * Exports
 *
 */

const logger = {
  VERSION,
};

export default logger;
