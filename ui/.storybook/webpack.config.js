const genDefaultConfig = require('@kadira/storybook/dist/server/config/defaults/webpack.config.js');
const path = require('path');

module.exports = (config, env) => {
  var config = genDefaultConfig(config, env);

  config.module.loaders.push({
    test: /.md$/,
    loaders: ["raw"],
    include: path.resolve(__dirname, '../src')
  });

  return config;
};