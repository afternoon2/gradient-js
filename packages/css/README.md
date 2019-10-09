# `@gradient-js/css`

`gradient-js` module for css gradient generation

## Installation

### CLI

#### Yarn

```
yarn add @gradient-js/css
```

#### Npm

```
npm install --save @gradient-js/css
```

### CDN

```
<script src="https://unpkg.com/gradient-js/css@x.x.x/css.js">
```

## Usage

```javascript
import { Css } from '@gradient-js/css';

const css = new Css();
const gradient = css.get(colors, config);
```

## Inputs

In order to create a gradient you will need to pass an array of `colors` and an `options` object to the Css' `get` method. `colors` should be an array of strings in any valid css format (rgb(a), hex or hsl(a)). `options` object consists of the [CoreOptions](https://github.com/afternoon2/gradient-js/tree/dev/packages/core#inputs) and following properties:

```typescript
type CssOptions = CoreOptions & {
  type: 'linear' | 'radial';
  angle?: number;
  left?: number;
  top?: number;
  shape?: 'ellipse' | 'circle';
  extentKeyword?: 'none' | 'closest-side' | 'closest-corner' | 'farthest-side' | 'farthest-corner';
};
```

Where each property can be described as it follows:

| Option | Type | Description |
| - | - | - |
| `type` | `'linear'` or `'radial'` | CSS gradient type - linear or radial |
| `angle`| `number` | Applied to linear gradients only |
| `left` | `number` | Applied to radial gradients only |
| `top` | `number` | Applied to radial gradients only |
| `shape` | `'ellipse'` or `'circle'` | Applied to radial gradients only |
| `extentKeyword` | `'none'` or `'closest-side'` or `'closest-corner'` or `'farthest-side'` or `'farthest-corner'`| Applied to radial gradients only |