const template = require('lodash.template');
const locale = require('locale');
const path = require('path');
const express = require('express');
const st = require('st');
const fs = require('fs');

const app = express();

const index = path.join(__dirname, './index.html');
const html = template(fs.readFileSync(index, 'utf-8'));

var mount = st({
  path: path.join(__dirname, '../static'),
  url: 'static/',
  index: false,
  dot: false,
  passthrough: false,
  gzip: true,
  cors: false
});

app.use(mount);
app.use(locale(require('./locales')));

app.get('/*', (req, res, next) => {
  const locale = (req.locale || '').toLowerCase();
  const lang = locale.split(/\-/)[0];

  res.header('Content-Type', 'text/html');

  res.send(html({
    locale,
    lang
  }));
});

app.listen(8000, (err, address) => {
  if (err) {
    throw err;
  }

  console.log('Server running at: http://localhost:8000');
});
