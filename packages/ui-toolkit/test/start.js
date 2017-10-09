const http = require('http');
const serveStatic = require('serve-static');
const jest = require('jest')


const serve = serveStatic('styleguide/');
const server = http.createServer((req, res) => {
    serve(req, res, (req, res) => console.log('yay'));
});

// Listen
server.listen(6060);
