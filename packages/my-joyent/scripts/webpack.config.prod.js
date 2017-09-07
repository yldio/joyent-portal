const originalConfig = require('./webpack.config.prod.original');
const patch = require('./patch-webpack-config');

module.exports = patch(originalConfig);
