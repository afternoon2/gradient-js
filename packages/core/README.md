# `@gradient-js/core`

`gradient-js` module for raw (object) gradient output generation

## Installation

### CLI

#### Yarn
```
yarn install @gradient-js/core
```

#### Npm
```
npm install --save @gradient-js/core
```

### CDN

```
<script src="https://unpkg.com/gradient-js/core@x.x.x/core.js">
```

## Usage

```javascript
import { Core } from '@gradient-js/core';

const core = new Core();
const gradient = core.get(colors, options);
```

## Inputs

In order to create a gradient you will need to pass an array of `colors` and an `options` object to the Core's `get` method. `colors` should be an array of strings in any valid css format (rgb(a), hex or hsl(a)). `options` object consists of following properties:

```typescript
type CoreOptions = {
  useBezier: boolean;
  interpolation: InterpolationMode;
  samples: number;
  lightnessCorrection: boolean;
};
```
Where each property describes as it follows:

| Option | Type | Description
| - | - | - |
| `useBezier`| `boolean` | Decide whether to use chroma's `scale()` with `bezier` interpolation |
| `interpolation` | `chroma.InterpolationMode`| Color interpolation space, one of: <br />`"rgb" | "hsl" | "hsv" | "hsi" | "lab" | "lch" | "hcl" | "lrgb"` |
| `samples` | `number` | Amount of gradient parts in the output |
| `lightnessCorrection` | `boolean` | Decide whether to apply lightness correction to your gradient.

Core's `get` method will generate an array of `chroma.Color` objects.
