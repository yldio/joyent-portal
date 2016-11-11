const webpack = require('webpack');
const path = require('path');

const cfg = require('../webpack.config.js');

module.exports = [
  require('inert'),
  require('nes'), {
    register: require('hapi-webpack-dev-plugin'),
    options: {
      compiler: webpack(cfg),
      devIndex: path.join(__dirname, '../static')
    }
  }
];
