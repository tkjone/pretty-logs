/**
 *
 * Pretty-Logger
 *
 */

const config = {
  lvl: {
    log: 0,
    warn: 1,
    err: 2
  },
  defaultLvl: 0
};

const getLvl = lvl => config.lvl[lvl];

const getDefaultLvl = () => config.defaultLvl;

const checkThreshold = function(level, defaultLogLevel, callback) {
  if (level >= defaultLogLevel) {
    return callback;
  }

  return function() {};
};

export const p = {
  log: checkThreshold(
    getLvl("log"),
    getDefaultLvl(),
    console.log.bind(console)
  ),
  warn: checkThreshold(
    getLvl("warn"),
    getDefaultLvl(),
    console.warn.bind(console)
  ),
  err: checkThreshold(
    getLvl("err"),
    getDefaultLvl(),
    console.error.bind(console)
  )
};

export default p;
