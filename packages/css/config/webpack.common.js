const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  name: 'css',
  entry: path.join(__dirname, '../lib/css.ts'),
  resolve: {
    extensions: ['.ts'],
    plugins: [
      new TsconfigPathsPlugin(),
    ]
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'css.js',
    library: 'GradientJsCss',
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
