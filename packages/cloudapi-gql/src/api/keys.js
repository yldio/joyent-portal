const { fetch, client } = require('./request');

const { principal } = client;

const getLoginPrefix = user =>
  user && principal.account !== user
    ? `:login/users/${user}`
    : principal.user && principal.user.length
      ? `:login/users/${principal.user}`
      : ':login';

module.exports.list = (opts = {}) =>
  fetch(`/${getLoginPrefix(opts.login)}/keys`);

module.exports.get = ({ login, name }) =>
  fetch(`/${getLoginPrefix(login)}/keys/${name}`);

module.exports.create = ({ login, name, key }) =>
  fetch(`/${getLoginPrefix(login)}/keys`, {
    method: 'POST',
    body: { name, key }
  });

module.exports.destroy = ({ login, name }) =>
  fetch(`/${getLoginPrefix(login)}/keys/${name}`, { method: 'DELETE' });
