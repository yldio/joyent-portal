const json = (() => {
  try {
    const res = require('dotenv').config({
      path: '../.env',
      silent: true
    });

    if (res.error) {
      throw res.error;
    }
  } catch (err) {
    try {
      return require('../config.json');
    } catch (err) {
      return {};
    }
  }

  return {};
})();

module.exports = {
  cert: process.env.DOCKER_CERT_PATH ||
    json.DOCKER_CERT_PATH ||
    json.cert ||
    '',
  host: process.env.DOCKER_HOST || json.DOCKER_HOST || json.host || '',
  tls_verify: process.env.DOCKER_TLS_VERIFY ||
    json.DOCKER_TLS_VERIFY ||
    json.tls_verify ||
    '',
  timeout: process.env.DOCKER_CLIENT_TIMEOUT ||
    json.DOCKER_CLIENT_TIMEOUT ||
    json.timeout ||
    ''
};
