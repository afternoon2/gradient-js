# gradient-js
Gradient creation library running in the browser 🖌🌈

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

`gradient-js` is a library that takes your source colors and a configuration object to produce a gradient suitable for your needs. You can choose between css, svg and raw (object) output.

`gradient-js` is built on top of [chroma-js](https://github.com/gka/chroma.js) color manipulation library, written by Gregor Aisch.

You need to install `chroma-js` as a dependency to start working with gradient-js.

## Modules

- [@gradient-js/core](https://github.com/afternoon2/gradient-js/tree/dev/packages/core) - generates raw objects as an output
- [@gradient-js/css](https://github.com/afternoon2/gradient-js/tree/dev/packages/css) - generates css strings as an output
- [@gradient-js/svg](https://github.com/afternoon2/gradient-js/tree/dev/packages/svg) - generates svg DOM nodes as an output
