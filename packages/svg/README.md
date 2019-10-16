# `@gradient-js/svg`

`gradient-js` module for svg gradient generation

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

### CLI

#### Yarn

```
yarn add @gradient-js/svg
```

#### Npm

```
npm install --save @gradient-js/svg
```

### CDN

```
<script src="https://unpkg.com/gradient-js/svg@x.x.x/svg.js">
```

## Usage


```javascript
import { Svg } from '@gradient-js/svg';

const svg = new Svg();
const gradient = svg.get(colors, config);
```

## Inputs

In order to create a gradient you will need to pass an array of `colors` and an `options` object to the Svg's `get` method. `colors` should be an array of strings in any valid css format (rgb(a), hex or hsl(a)). `options` object consists of the [CoreOptions](https://github.com/afternoon2/gradient-js/tree/dev/packages/core#inputs) and following properties:

```typescript
type SvgOptions = CoreOptions & {
  id: string;
  type: 'linear' | 'radial';
  gradientUnits?: 'objectBoundingBox' | 'userSpaceOnUse';
  linearOptions?: SvgLinearGradientOptions;
  radialOptions?: SvgRadialGradientOptions;
};
```

### SvgLinearGradientOptions

```typescript
type SvgLinearGradientOptions = {
  angle: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};
```

[Attributes description here](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient)

### SvgRadialGradientOptions

```typescript
type SvgRadialGradientOptions = {
  cx: number;
  cy: number;
  r: number;
  fx: number;
  fy: number;
  spreadMethod: 'pad' | 'repeat' | 'reflect';
};
```

[Attributes description here](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/radialGradient#Attributes)

