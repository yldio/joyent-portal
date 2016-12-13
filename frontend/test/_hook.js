const hook = require('node-hook');
const register = require('babel-register');

hook.hook('.png', () => '');

register({
  extensions: ['.js']
});
