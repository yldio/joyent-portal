const hook = require('node-hook');
const jsdom = require('jsdom');
const register = require('babel-register');
const requireHacker = require('require-hacker');

hook.hook('.png', () => '');
hook.hook('.eot', () => '');
hook.hook('.woff', () => '');
hook.hook('.woff2', () => '');
hook.hook('.ttf', () => '');
hook.hook('.svg', () => '');
hook.hook('.css', () => '');

register({
  extensions: ['.js']
});

// import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';

if (!global.document || !global.window) {
  global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
  global.window = global.document.defaultView;
  global.navigator = global.window.navigator;
}

const fakeComponentString = `
  require('react').createClass({
    render() {
      return null;
    }
  })
`;

// ensure inline svgs don't throw off testing
requireHacker.global_hook('inline-svgs', (path) => {
  if(path.match(/!babel-loader!svg-react-loader/)) {
    return `module.exports = ${fakeComponentString}`;
  }
});