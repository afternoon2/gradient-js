import { Core, CoreOptions } from '@gradient-js/core';
import { Color } from 'chroma-js';

export type CssOptions = CoreOptions & {
  type: 'linear' | 'radial';
  angle?: number;
  left?: number;
  top?: number;
  shape?: 'ellipse' | 'circle';
  extentKeyword?: 'none' | 'closest-side' | 'closest-corner' | 'farthest-side' | 'farthest-corner';
};
export class Css {
  private core: Core;
  private options?: CssOptions;
  private colors?: Color[];

  constructor() {
    this.core = new Core();
  }

  get(colors: string[], options: CssOptions): string {
    this.options = options;
    this.colors = this.core.get(colors, options);
    return `${options.type}-gradient(${this.angle}${this.shape}${this.extentKeyword}${this.cssifyColors()})`;
  }

  private cssifyColors(): string[] {
    const colors = this.colors as Color[];
    return colors.map((color: Color) => `rgba(${color.rgba()})`);
  }

  private get angle(): string {
    const options = this.options as CssOptions;
    return options.angle && options.type === 'linear' ? `${options.angle}deg, ` : '';
  }

  private get shape(): string {
    const options = this.options as CssOptions;
    let shape = '';
    if (options.type === 'radial') {
      if (options.shape && options.shape !== 'ellipse' && (!options.top && !options.left)) {
        shape = `${options.shape}, `;
      }
      if (options.shape && options.shape !== 'ellipse' && (options.top && options.left)) {
        shape = `${options.shape} at ${options.left}% ${options.top}%, `;
      }
      if (
        options.shape &&
        options.shape === 'ellipse' &&
        (options.top && options.left) &&
        options.extentKeyword === 'none'
      ) {
        shape = `${options.shape} at ${options.left}% ${options.top}%, `;
      }
      if (
        options.shape &&
        options.shape === 'ellipse' &&
        (options.top && options.left) &&
        options.extentKeyword !== 'none'
      ) {
        shape = '';
      }
    } else {
      shape = '';
    }
    return shape;
  }

  private get extentKeyword(): string {
    let extentKeyword: string;
    const options = this.options as CssOptions;
    const afterExtent = options.top && options.left ? ` at ${options.left}% ${options.top}%, ` : ', ';
    if (options.shape === 'ellipse' && options.extentKeyword && options.extentKeyword !== 'none') {
      extentKeyword = options.extentKeyword + afterExtent;
    } else if (options.shape === 'ellipse' && !options.extentKeyword && options.top && options.left) {
      extentKeyword = afterExtent;
    } else {
      extentKeyword = '';
    }
    return extentKeyword;
  }
}
