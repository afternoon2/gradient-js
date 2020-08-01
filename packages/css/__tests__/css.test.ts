import { Css } from '../lib/css';

describe('@gradient-js/css', () => {
  let css: Css;
  let colors: string[];

  beforeEach(() => {
    css = new Css();
    colors = ['rgba(10, 220, 33, 0.1)', 'rgba(254, 200, 10, 1)'];
  });
  describe('linear gradient generation', () => {
    test('If it generates basic linear gradient correctly', () => {
      const css = new Css();
      const regexp =  /linear-gradient\(((rgba\(([0-9]+\,\s?)+([0-9]?\.?[0-9]+\)\,?\s?))+)\)/;
      const gradient = css.get([
        'rgba(10, 220, 33, 0.1)',
        'rgba(254, 200, 10, 1)'
      ], {
        useBezier: false,
        samples: 10,
        interpolation: 'hsl',
        lightnessCorrection: true,
        type: 'linear',
      });
      expect(regexp.test(gradient)).toBe(true);
    });

    test('If it generates basic linear gradient with an angle correctly', () => {
      const css = new Css();
      const regexp = /linear-gradient\(([0-9]+deg\,\s?)(rgba\(([0-9]+\,\s?)+([0-9]?\.?[0-9]+\)\,?\s?))+\)/
      const gradient = css.get([
          'rgba(10, 220, 33, 0.1)',
          'rgba(254, 200, 10, 1)'
      ], {
        useBezier: false,
        samples: 10,
        interpolation: 'hsl',
        lightnessCorrection: true,
        type: 'linear',
        angle: 90
      });
      expect(regexp.test(gradient)).toBe(true);
    });
  });

  describe('conic gradient generation', () => {
    test('If it generates conic gradient correctly', () => {
      const regexp = /conic-gradient\((from\s[0-9]+deg,\s?)?(rgba\(([0-9]+\,\s?)+([0-9]?\.?[0-9]+\)\,?\s?))+\)/;
      const gradient = css.get(colors, {
        useBezier: false,
        samples: 10,
        interpolation: 'hsl',
        lightnessCorrection: true,
        type: 'conic',
        angle: 90
      });
      expect(regexp.test(gradient)).toBe(true);
    });

    test('If it generates conic gradient with position correctly', () => {
      const regexp = /conic-gradient\((from\s[0-9]+deg at [0-9]+%\s[0-9]+%,\s?)?(rgba\(([0-9]+\,\s?)+([0-9]?\.?[0-9]+\)\,?\s?))+\)/;
      const gradient = css.get(colors, {
        useBezier: false,
        samples: 10,
        interpolation: 'hsl',
        lightnessCorrection: true,
        type: 'conic',
        angle: 90,
        top: 30,
        left: 20,
      });
      expect(regexp.test(gradient)).toBe(true);
    });
  });

  describe('radial gradient generation', () => {
    test('If it generates radial gradient with the shape of a circle correctly', () => {
      const regexp = /radial-gradient\((circle\,\s?)(rgba\(([0-9]+\,\s?)+([0-9]?\.?[0-9]+\)\,?\s?))+\)/
      const gradient = css.get(colors, {
        useBezier: false,
        samples: 10,
        interpolation: 'hsl',
        lightnessCorrection: true,
        type: 'radial',
        shape: 'circle',
      });
      expect(regexp.test(gradient)).toBe(true);
    });

    test('If it generates radial gradient with the shape of a circle and the position correctly', () => {
      const regexp = /radial-gradient\((circle\s?)(at\s([0-9]+%)\s[0-9]+%\,\s)(rgba\(([0-9]+\,\s?)+([0-9]?\.?[0-9]+\)\,?\s?))+\)/;
      const gradient = css.get(colors, {
        useBezier: false,
        samples: 10,
        interpolation: 'hsl',
        lightnessCorrection: true,
        type: 'radial',
        shape: 'circle',
        top: 30,
        left: 20,
      });
      expect(regexp.test(gradient)).toBe(true);
    });

    test('If it generates radial gradient with the shape of an ellipse, the position and the extent keyword correctly', () => {
      const regexp = /radial-gradient\(((farthest|closest)-(side|corner)\,?\s?)(at(\s[0-9]+%)+\,?\s?)(rgba\(([0-9]+\,\s?)+([0-9]?\.?[0-9]+\)\,?\s?))+\)/;
      const gradient = css.get(colors, {
        useBezier: false,
        samples: 10,
        interpolation: 'hsl',
        lightnessCorrection: true,
        type: 'radial',
        top: 30,
        left: 20,
        shape: 'ellipse',
        extentKeyword: 'farthest-corner',
      });
      expect(regexp.test(gradient)).toBe(true)
    });
  });
});