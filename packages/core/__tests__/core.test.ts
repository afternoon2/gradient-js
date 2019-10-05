import { Core, CoreOptions } from '../lib/core';
import { messages } from '../lib/messages';
import { Color } from 'chroma-js';

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

    test("If it generates chroma colors array with correct length", () => {
      const colors: string[] = ['rgb(10, 20, 30)', '#ff3399', 'rgba(34, 134, 255, 0.9)'];
      const config: CoreOptions = {
        useBezier: true,
        interpolation: 'hsl',
        samples: 20,
        lightnessCorrection: true,
      };
      const core = new Core();
      const result: Color[] = core.get(colors, config);
      expect(result.length).toBe(config.samples);
    });

    test('If all colors are of the same type', () => {
      const colors: string[] = ['rgb(10, 20, 30)', '#ff3399', 'rgba(34, 134, 255, 0.9)'];
      const config: CoreOptions = {
        useBezier: true,
        interpolation: 'hsl',
        samples: 20,
        lightnessCorrection: true,
      };
      const core = new Core();
      const result: Color[] = core.get(colors, config);
      // @ts-ignore
      expect(result.find((color: Color) => !Array.isArray(color['_rgb']))).toBe(undefined);
    });

    test('If it generates an output with linear scale correctly', () => {
      const colors: string[] = ['rgb(10, 20, 30)', '#ff3399', 'rgba(34, 134, 255, 0.9)'];
      const config: CoreOptions = {
        useBezier: false,
        interpolation: 'hsl',
        samples: 20,
        lightnessCorrection: true,
      };
      const core = new Core();
      const result: Color[] = core.get(colors, config);
      // @ts-ignore
      expect(result.find((color: Color) => !Array.isArray(color['_rgb']))).toBe(undefined);
    });

    test('If it generates an output with linear scale and no lightness correction correctly', () => {
      const colors: string[] = ['rgb(10, 20, 30)', '#ff3399', 'rgba(34, 134, 255, 0.9)'];
      const config: CoreOptions = {
        useBezier: false,
        interpolation: 'hsl',
        samples: 20,
        lightnessCorrection: false,
      };
      const core = new Core();
      const result: Color[] = core.get(colors, config);
      expect(result.find((c: Color) => !c.hasOwnProperty('_rgb'))).toBe(undefined);
    });

    test('If it generates an output without interpolation', () => {
      const colors: string[] = ['rgb(10, 20, 30)', '#ff3399', 'rgba(34, 134, 255, 0.9)'];
      const config: CoreOptions = {
        useBezier: false,
        // @ts-ignore
        interpolation: null,
        samples: 20,
        lightnessCorrection: false,
      };
      const core = new Core();
      const result: Color[] = core.get(colors, config);
      expect(result.find((c: Color) => !c.hasOwnProperty('_rgb'))).toBe(undefined);
    });
  });
});
