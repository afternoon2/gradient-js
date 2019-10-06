const common = require('./webpack.common');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = common.map((config) => ({
  ...config,
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
}));
