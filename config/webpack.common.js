const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');

const rootPath = (folder) => './packages/' + folder + '/lib/' + folder + '.ts';

const commonConfig = {
  resolve: {
    extensions: ['.ts'],
  },
  plugins: [
    new CheckerPlugin(),
  ],
};

module.exports = [
  {
    name: 'core',
    entry: rootPath('core'),
    output: {
      path: path.join(__dirname, '../packages/core/dist'),
      filename: 'core.js'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
          options: {
            useCache: true,
            declaration: true,
            configFileName: path.resolve(__dirname, '../packages/core/tsconfig.json')
          }
        }
      ]
    },
    ...commonConfig,
  },
  {
    name: 'css',
    entry: rootPath('css'),
    output: {
      path: path.join(__dirname, '../packages/css/dist'),
      filename: 'css.js'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
          options: {
            useCache: true,
            declaration: true,
            configFileName: path.resolve(__dirname, '../packages/css/tsconfig.json')
          }
        }
      ]
    },
    ...commonConfig,
  },
  {
    name: 'svg',
    entry: rootPath('svg'),
    output: {
      path: path.join(__dirname, '../packages/svg/dist'),
      filename: 'svg.js'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
          query: {
            useCache: true,
            declaration: true,
            configFileName: path.resolve(__dirname, '../packages/svg/tsconfig.json'),
          }
        }
      ]
    },
    ...commonConfig,
  },
];