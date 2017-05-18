const Docker = require('dockerode');
const url = require('url');
const path = require('path');
const fs = require('fs');

const config = require('../config');
const location = url.parse(config.host);

module.exports = new Docker({
  host: location.hostname,
  port: Number(location.port),
  ca: fs.readFileSync(path.join(config.cert, 'ca.pem')),
  cert: fs.readFileSync(path.join(config.cert, 'cert.pem')),
  key: fs.readFileSync(path.join(config.cert, 'key.pem')),
  version: 'v1.24'
});
