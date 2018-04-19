const get = require('lodash.get');
const Document = require('hapi-render-react-joyent-document');
const path = require('path');
const url = require('url');

const { theme } = require('joyent-ui-toolkit');
const { default: createClient } = require('./state/apollo-client');
const { default: createStore } = require('./state/redux-store');

const indexFile = path.join(__dirname, '../../build/index.html');
const assets = require('../../build/asset-manifest.json');

const { NODE_ENV = 'development' } = process.env;

const getState = request => {
  const { req } = request.raw;
  const { headers } = req;
  const { host } = headers;

  const protocol = NODE_ENV === 'development' ? 'http:' : 'https:';
  const _font = get(theme, 'font.href', () => '');
  const _mono = get(theme, 'monoFont.href', () => '');
  const _addr = url.parse(`${protocol}//${host}`);

  const _theme = Object.assign({}, theme, {
    font: Object.assign({}, theme.font, {
      href: () =>
        _font(
          Object.assign(_addr, {
            namespace: 'console'
          })
        )
    }),
    monoFont: Object.assign({}, theme.monoFont, {
      href: () =>
        _mono(
          Object.assign(_addr, {
            namespace: 'console'
          })
        )
    })
  });

  return {
    theme: _theme,
    createClient,
    createStore
  };
};

module.exports = Document({
  namespace: 'console/',
  assets,
  indexFile,
  getState
});
