const originalConfig = require('./webpack.config.dev.original');
const patch = require('./patch-webpack-config');

module.exports = patch(originalConfig);
