const path = require('path');
const express = require('express');
const st = require('st');

const app = express();

var mount = st({
  path: path.join(__dirname, '../static'),
  url: 'static/',
  index: 'index.html',
  dot: false,
  passthrough: false,
  gzip: true,
  cors: false
});

app.use(mount);

app.get('/*', (req, res, next) => {
  mount(Object.assign(req, {
    sturl: '/static/index.html'
  }), res, next);
});

app.listen(8000, (err, address) => {
  if (err) {
    throw err;
  }

  console.log('Server running at: http://localhost:8000');
});
