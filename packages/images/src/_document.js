const get = require('lodash.get');
const Document = require('hapi-render-react-joyent-document');
const path = require('path');
const url = require('url');

const { default: theme } = require('./state/theme');
const { default: createClient } = require('./state/apollo-client');
const { default: createStore } = require('./state/redux-store');

const indexFile = path.join(__dirname, '../../build/index.html');

const getState = request => {
  const { req, res } = request.raw;

  const _font = get(theme, 'font.href', () => '');
  const _mono = get(theme, 'monoFont.href', () => '');
  const _addr = url.parse(`http://${req.headers.host}`);
  const _theme = Object.assign({}, theme, {
    font: Object.assign({}, theme.font, {
      href: () => _font(_addr)
    }),
    monoFont: Object.assign({}, theme.monoFont, {
      href: () => _mono(_addr)
    })
  });

  return {
    theme: _theme,
    createClient,
    createStore
  };
};

module.exports = Document({ indexFile, getState });
