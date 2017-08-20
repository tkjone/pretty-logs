/**
 *
 * Pretty-Logger
 *
 */

/**
 * Constants
 * ============================================================================
 */

export const VERSION = '0.5.0';

// control which logs render
const DEFAULT_LEVEL = 0;

// Available log colors - hex codes will not work in node environments
const COLORS = {
  CURIOUS_BLUE: '#268BD2',
  TRADE_WIND_GREEN: '#63ADA8',
  GIMBLET_YELLOW: '#BEA85F',
  MY_PINK: '#DF8984',
};

// detect browser user agents
const BROWSER = {
  IS_CHROME: /Chrome/.test(navigator.userAgent),
  IS_EXPLORER: navigator.userAgent.indexOf('MSIE') > -1,
  IS_FIREFOX: navigator.userAgent.indexOf('Firefox') > -1,
  IS_SAFARI: /Version/.test(navigator.userAgent),
};

const ICON = {
  INFO: 'https://d2mxuefqeaa7sj.cloudfront.net/s_B42BBC2344C9BB2EE28870D2EBB8AB9BA1BF5601EC50F1AABC788C3099EB7784_1494522371868_icon-info.svg',
  DEBUG: 'https://d2mxuefqeaa7sj.cloudfront.net/s_B42BBC2344C9BB2EE28870D2EBB8AB9BA1BF5601EC50F1AABC788C3099EB7784_1494522371864_icon-bug.svg',
  WARN: 'https://d2mxuefqeaa7sj.cloudfront.net/s_B42BBC2344C9BB2EE28870D2EBB8AB9BA1BF5601EC50F1AABC788C3099EB7784_1494522371870_icon-warning.svg',
  ERROR: 'https://d2mxuefqeaa7sj.cloudfront.net/s_B42BBC2344C9BB2EE28870D2EBB8AB9BA1BF5601EC50F1AABC788C3099EB7784_1494522371866_icon-error.svg',
};

const logConfig = {
  info: {
    color: COLORS.CURIOUS_BLUE, // #hexcode
    value: '1',
    icon: ICON.INFO,
  },
  debug: {
    color: COLORS.TRADE_WIND_GREEN, // #hexcode
    value: '0',
    icon: ICON.DEBUG,
  },
  warn: {
    color: COLORS.GIMBLET_YELLOW, // #hexcode
    value: '2',
    icon: ICON.WARN,
  },
  error: {
    color: COLORS.MY_PINK, // #hexcode
    value: '3',
    icon: ICON.ERROR,
  },
};

/**
 * Helpers
 * ============================================================================
 */

const setSafariStyleSetOne = ({icon}) =>
  [
    `background-image: url( ${icon} )`,
    'background-repeat: no-repeat',
    'background-size: 15px 15px',
    'padding-left: 15.2px',
  ].join(';');

const setSafariStyleSetTwo = ({color}) =>
  [
    `color: ${color}`,
    'font-weight: bold',
    'display: block',
    'padding-left: 15.2px',
    'padding-top: .4px',
  ].join(';');

const setChromeStyleSetOne = ({icon, color}) =>
  [
    `background-image: url(${icon}) `,
    'background-repeat: no-repeat',
    'background-size: 13px 13px',
    `color: ${color} `,
    'font-weight: bold',
    'display: block',
    'margin-left: 5px',
    'padding-left: 18px',
  ].join(';');

const setFirefoxStyleSetOne = ({color}) =>
  [
    `color: ${color} `,
    'font-weight: bold',
    'display: block',
    'margin-left: -6px', // line up subject and data logged
  ].join(';');

// check for node environment
function isNode() {
  return typeof module !== 'undefined' && typeof module.exports !== 'undefined';
}

// check logging environment
function isBrowser() {
  return typeof window !== 'undefined';
}

// safer logging formatter check - firefox and safari inconsistent style support
function isSafeMode() {
  return BROWSER.IS_FIREFOX || BROWSER.IS_EXPLORER;
}

// make the message pretty
const styleMessage = (string, level) => {
  let msg;
  let styleSetOne;
  let styleSetTwo;
  const icon = logConfig[level].icon;
  const color = logConfig[level].color;

  switch (true) {
    case BROWSER.IS_SAFARI:
      msg = `%c %c ${string} `;
      styleSetOne = setSafariStyleSetOne({icon});
      styleSetTwo = setSafariStyleSetTwo({color});

      return [msg, styleSetOne, styleSetTwo];

    case BROWSER.IS_CHROME:
      msg = `%c ${string} `;
      styleSetOne = setChromeStyleSetOne({icon, color});

      return [msg, styleSetOne];

    case BROWSER.IS_FIREFOX:
      msg = `%c ${string} `;
      styleSetOne = setFirefoxStyleSetOne({icon});

      return [msg, styleSetOne];

    default:
      console.error('pretty-logs could not identify browser');
      break;
  }
};

// formatted date-time stamp
const setDateTime = () => {
  const timestamp = new Date();
  const date = timestamp.toLocaleDateString();
  const time = timestamp.toLocaleTimeString();
  const dateTime = `${date}, ${time} `;

  return dateTime;
};

/**
 * Loggers
 * ============================================================================
 */

// logs
const log = (subject, details, type) => {
  console[type](...subject);
  console.log(details);
  if (type === 'groupCollapsed') {
    console.groupEnd();
  } else {
    console.log('');
  }
};

// logger
const plog = ({level, message, extra}) => {
  const _msg = `${setDateTime()} - message`;
  const subject = styleMessage(_msg, level);
  const details = {level, message, extra};

  if (isBrowser() && isSafeMode()) {
    log(subject, details, 'log');
  } else if (isBrowser()) {
    log(subject, details, 'groupCollapsed');
  } else {
    console.error('pretty-logs does not recognize this environment');
  }
};

export default plog;
