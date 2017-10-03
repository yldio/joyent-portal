const { createError } = require('apollo-errors');
const awaitify = require('apr-awaitify');
const auth = require('smartdc-auth');
const cloudapi = require('triton/lib/cloudapi2');
const bunyan = require('bunyan');
const fetch = require('node-fetch');
const url = require('url');

const pkg = require('../../package.json');
const credentials = require('../credentials');
const errors = require('./errors.json');

const STATUSES = [
  400,
  401,
  403,
  404,
  405,
  406,
  409,
  413,
  415,
  420,
  449,
  500,
  503
];

const ERRORS = Object.keys(errors).reduce(
  (errs, code) =>
    Object.assign(errs, {
      [code]: createError(code, { message: errors[code] })
    }),
  {}
);

const log = bunyan.createLogger({
  name: pkg.name
});

const client = cloudapi.createClient({
  log,
  url: credentials.url,
  account: credentials.account,
  user: credentials.user,
  sign: auth.cliSigner({
    log,
    keyId: credentials.keyId,
    user: credentials.account,
    subuser: credentials.user
  })
});

const { _path, _getAuthHeaders, account, url: host } = client;
const getAuthHeaders = awaitify(_getAuthHeaders.bind(client));

module.exports = (method, args) => {
  return new Promise((resolve, reject) => {
    const fn = client[method].bind(client);

    const cb = (err, res) => {
      if (err) {
        return reject(err);
      }

      resolve(res);
    };

    return args ? fn(args, cb) : fn(cb);
  });
};

module.exports.client = client;

module.exports.fetch = async (_pathanme, reqOpts = {}) => {
  const method = (reqOpts.method || 'get').toUpperCase();
  const pathname = _path.call(client, _pathanme.replace(/:login/, account));
  const headers = await getAuthHeaders(method, pathname);

  const href = url.format({
    protocol: 'https',
    host: host.replace(/^https:\/\//, ''),
    pathname
  });

  return fetch(
    href,
    Object.assign(reqOpts, {
      method,
      headers: Object.assign({}, reqOpts.headers, headers)
    })
  )
    .then(async response => [response.status, await response.json()])
    .then(([status, body]) => {
      // eslint-disable-next-line no-implicit-coercion
      if (~STATUSES.indexOf(status)) {
        const { code, message } = body;
        const CustomError = ERRORS[code] || ERRORS.UnknownError;

        throw new CustomError({
          message,
          data: { pathname, body: reqOpts.body }
        });
      }

      return body;
    });
};
