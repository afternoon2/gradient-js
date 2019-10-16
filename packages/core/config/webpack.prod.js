const merge = require('webpack-merge');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new TerserWebpackPlugin({
      parallel: true,
      terserOptions: {
        mangle: false,
      }
    })
  ]
});
