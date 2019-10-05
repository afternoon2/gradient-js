import chroma, { Color, Scale, InterpolationMode } from 'chroma-js';
import { messages } from './messages';

export type CoreOptions = {
  useBezier: boolean;
  interpolation: InterpolationMode;
  samples: number;
  lightnessCorrection: boolean;
};

type ScaleResult = {
  scale: Scale<Color>;
  options: CoreOptions;
};

export class Core {
  private defaultOptions: CoreOptions = {
    useBezier: false,
    interpolation: 'rgb',
    samples: 10,
    lightnessCorrection: false,
  };

  get(colors: string[], options: CoreOptions = this.defaultOptions): Color[] {
    if (colors.find((val: unknown) => typeof val !== 'string')) {
      throw new Error(messages.mixedColorTypes);
    }
    const { getLinearScale, getBezierScale, getBase } = this;
    const scale = options.useBezier ? getBezierScale : getLinearScale;
    return getBase(scale(options, colors));
  }

  private getLinearScale(options: CoreOptions, colors: string[]): ScaleResult {
    let result: ScaleResult;
    const scaled = chroma.scale(colors);
    if (!options.interpolation) {
      const scaledWithInterp = scaled;
      result = {
        scale: options.lightnessCorrection ? scaledWithInterp.correctLightness() : scaledWithInterp,
        options,
      };
    } else {
      result = {
        scale: options.lightnessCorrection ? scaled.mode(options.interpolation).correctLightness() : scaled,
        options,
      };
    }
    return result;
  }

  private getBezierScale(options: CoreOptions, colors: string[]): ScaleResult {
    const beziered = chroma.bezier(colors).scale();
    return {
      scale: options.lightnessCorrection ? beziered.correctLightness() : beziered,
      options,
    };
  }

  private getBase(result: ScaleResult): Color[] {
    return new Array(result.options.samples)
      .fill('')
      .map((el: string, index: number) => result.scale(index / result.options.samples));
  }
}
