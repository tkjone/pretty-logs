import { p } from "../index.js";

describe("The p library", () => {

  describe("With default settings", () => {

    it('should log info', () => {
      p.log('info')
      expect(console.log).toBeCalled()
    });

    it('should log warn', () => {
      p.warn('warn')
      expect(console.warn).toBeCalled()
    });

    it('should log err', () => {
      p.err('error')
      expect(console.error).toBeCalled()
    });

  })

});
