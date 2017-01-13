const hook = require('node-hook');
const jsdom = require('jsdom');
const register = require('babel-register');

hook.hook('.png', () => '');
hook.hook('.eot', () => '');
hook.hook('.woff', () => '');
hook.hook('.woff2', () => '');
hook.hook('.ttf', () => '');
hook.hook('.svg', () => '');

register({
  extensions: ['.js']
});

// import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';

if (!global.document || !global.window) {
  global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
  global.window = global.document.defaultView;
  global.navigator = global.window.navigator;
}
