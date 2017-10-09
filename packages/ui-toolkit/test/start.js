const http = require('http');
const serveStatic = require('serve-static');
const jest = require('jest');

const serve = serveStatic('styleguide/');
const server = http.createServer((req, res) => {
  serve(req, res, (req, res) => console.log('yay'));
});
// "test": "cross-env NODE_ENV=test run-s styleguide:build test:visual",
// Listen
server.listen(6060);
