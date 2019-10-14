const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  name: 'svg',
  entry: path.join(__dirname, '../lib/svg.ts'),
  resolve: {
    extensions: ['.ts'],
    plugins: [
      new TsconfigPathsPlugin(),
    ]
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'svg.js',
    library: 'GradientJsSvg',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: path.resolve(__dirname, '../tsconfig.json')
        }
      }
    ]
  },
  plugins: [
    new CheckerPlugin(),
  ],
};
