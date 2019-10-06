import { Svg, SvgOptions } from '../lib/svg';

describe('@gradient-js/svg', () => {
  let svg: Svg;
  let colors: string[];

  beforeEach(() => {
    svg = new Svg();
    colors = ['rgba(1, 224, 128, 0.4)', 'rgba(100, 55, 4, 0.1)']
  });

  test('If SvgOverlay creates a gradient correctly', () => {
    const config: SvgOptions = {
      useBezier: false,
      samples: 10,
      interpolation: 'rgb',
      lightnessCorrection: false,
      type: 'linear',
      id: 'gradient-0',
      gradientUnits: 'userSpaceOnUse',
      linearOptions: {
        x1: 0,
        x2: 0,
        y1: 100,
        y2: 100,
        angle: 100,
      },
    };
    expect(svg.get(colors, config)).toBeInstanceOf(SVGElement);
  });
});

