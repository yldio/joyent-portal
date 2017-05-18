const credentials = require('../credentials');
const auth = require('smartdc-auth');
const cloudapi = require('triton/lib/cloudapi2');
const bunyan = require('bunyan');
const pkg = require('../../package.json');

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
