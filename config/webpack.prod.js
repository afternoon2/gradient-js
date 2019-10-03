const common = require('./webpack.common');

module.exports = common.map((config) => ({
  ...config,
  mode: 'production',
}));
