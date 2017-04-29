import logger from './index.js';

test('check version', () => {
  expect(logger.VERSION).toBe('0.1.0');
});
