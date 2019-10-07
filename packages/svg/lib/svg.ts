import { Core, CoreOptions } from '@gradient-js/core';
import { RequiredKeys, ValuesType } from 'utility-types';
import { Color } from 'chroma-js';

export type SvgLinearGradientOptions = {
  angle: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

export type SvgRadialGradientOptions = {
  cx: number;
  cy: number;
  r: number;
  fx: number;
  fy: number;
  spreadMethod: 'pad' | 'repeat' | 'reflect';
};

export type RawSvgGradient = {
  id: string,
  type: 'linear' | 'radial',
  attributes: {
    gradientUnits?: 'objectBoundingBox' | 'userSpaceOnUse';
  } & (Partial<SvgRadialGradientOptions> | Partial<SvgLinearGradientOptions>);
  stops: SVGStopElement[];
};

export type SvgOptions = CoreOptions & {
  [key: string]:
    | ('linear' | 'radial')
    | ('objectBoundingBox' | 'userSpaceOnUse')
    | SvgLinearGradientOptions
    | SvgRadialGradientOptions
    | string
    | boolean
    | number
    | undefined;
  id: string;
  type: 'linear' | 'radial';
  gradientUnits?: 'objectBoundingBox' | 'userSpaceOnUse';
  linearOptions?: SvgLinearGradientOptions;
  radialOptions?: SvgRadialGradientOptions;
};

export class Svg {
  private core: Core;
  private options?: SvgOptions;
  private colors?: Color[];

  constructor() {
    this.core = new Core();
  }

  get(colors: string[], options: SvgOptions): SVGElement {
    this.colors = this.core.get(colors, options);
    this.options = options;
    return this.createGradient();
  }

  private createSvgElement(type: RequiredKeys<SVGElementTagNameMap>): ValuesType<SVGElement> {
    return document.createElementNS('http://www.w3.org/2000/svg', type);
  }

  private createColorStop(color: string, index: number, length: number): SVGStopElement {
    const stop = this.createSvgElement('stop');
    stop.offset = `${100 * (index / length)}%`;
    stop.setAttribute('stop-color', color);
    return stop;
  }

  private colorsToStops(): SVGStopElement[] {
    const colors = this.colors as Color[];
    return colors.map((color: Color, index: number) => {
      const cssColor = `rgba(${color.rgba(true)})`;
      return this.createColorStop(cssColor, index, colors.length);
    });
  }

  private createGradientElement(): SVGGradientElement {
    const options = this.options as SvgOptions;
    const gradient = this.createSvgElement(`${options.type}Gradient` as RequiredKeys<SVGElementTagNameMap>);
    const attrs = /((id)|([c|f|x|y|r][x|y|1|2]?)|(gradientUnits))/;
    const gradientOptions = options[`${options.type}GradientOptions`] as (
      | SvgLinearGradientOptions
      | SvgRadialGradientOptions);
    const finalOptions = {
      id: options.id,
      type: options.type,
      gradientUnits: options.gradientUnits,
      ...gradientOptions,
    };
    Object.entries(finalOptions)
      .filter((entry: [string, unknown]) => attrs.test(entry[0]))
      .forEach((entry: [string, unknown]) => {
        if (entry[0] !== 'type') {
          gradient.setAttribute(entry[0], entry[1] as string);
        }
      });
    if (options.angle) {
      gradient.setAttribute('gradientTransform', `rotate(${options.angle})`);
    }
    return gradient;
  }

  private createGradient(): SVGGradientElement {
    const gradient = this.createGradientElement();
    const stops = this.colorsToStops();
    stops.forEach((stop: SVGElement) => gradient.appendChild(stop));
    return gradient;
  }
}
