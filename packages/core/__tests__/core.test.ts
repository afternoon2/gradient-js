import { Core, CoreOptions } from '../lib/core';
import { messages } from '../lib/messages';

describe('@gradient-js/core', () => {
  describe('Core output generation', () => {
    test('If it throws an error when adding mix typed colors array', () => {
      const fakeColors: any[] = [[0, 12, 33, 0.4], 'rgb(20, 34, 40)'];
      const config: CoreOptions = {
        useBezier: true,
        interpolation: 'rgb',
        samples: 10,
        lightnessCorrection: true,
      };
      const exec = () => {
        const core = new Core();
        core.get(fakeColors, config);
      };
      expect(exec).toThrowError(messages.mixedColorTypes);
    });
  });
});
