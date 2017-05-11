/**
 *
 * CONSTANTS
 *
 */

// Current version of this logging library
export const VERSION = '0.1.8';

// Available log colors - the hex codes will not work in node environments
export const COLORS = {
  PALE_CORNFLOWER_BLUE: '#AECEEB',
  TRADE_WIND_GREEN: '#63ADA8',
  GIMBLET_YELLOW: '#BEA85F',
  MY_PINK: '#DF8984',
};

// Each log level is an array with three values:  name, value, color
export const LEVEL = {
  INFO: ['info', 0, COLORS.PALE_CORNFLOWER_BLUE],
  DEBUG: ['debug', 10, COLORS.TRADE_WIND_GREEN],
  WARN: ['warn', 20, COLORS.GIMBLET_YELLOW],
  ERROR: ['error', 30, COLORS.MY_PINK],
};

// icons
export const ICON = {
  INFO: 'https://d2mxuefqeaa7sj.cloudfront.net/s_B42BBC2344C9BB2EE28870D2EBB8AB9BA1BF5601EC50F1AABC788C3099EB7784_1494522371868_icon-info.svg',
  DEBUG: 'https://d2mxuefqeaa7sj.cloudfront.net/s_B42BBC2344C9BB2EE28870D2EBB8AB9BA1BF5601EC50F1AABC788C3099EB7784_1494522371864_icon-bug.svg',
  WARN: 'https://d2mxuefqeaa7sj.cloudfront.net/s_B42BBC2344C9BB2EE28870D2EBB8AB9BA1BF5601EC50F1AABC788C3099EB7784_1494522371870_icon-warning.svg',
  ERROR: 'https://d2mxuefqeaa7sj.cloudfront.net/s_B42BBC2344C9BB2EE28870D2EBB8AB9BA1BF5601EC50F1AABC788C3099EB7784_1494522371866_icon-error.svg',
};
