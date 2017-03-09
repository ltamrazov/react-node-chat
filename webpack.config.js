const path = require('path');
const configMerge = require('webpack-merge');

const env = process.env.NODE_ENV || 'development';

const getConfigs = (...names) =>
  names.map(name => require(path.join(__dirname, 'environments/', name))
);

module.exports = configMerge.smart(...getConfigs('common', env));
