const webpack = require('webpack');
const path = require('path');

const cfg = require('../webpack.config.js');

module.exports = [
  require('inert'),
  require('nes'), {
  register: require('good'),
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
          log: '*'
        }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  }
}, {
  register: require('hapi-webpack-dev-plugin'),
  options: {
    compiler: webpack(cfg),
    devIndex: path.join(__dirname, '../static')
  }
}];
