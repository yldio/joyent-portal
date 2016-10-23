const path = require('path');
const fs = require('fs');

const docs = path.join(__dirname, '../docs/index');
const src = path.join(__dirname, '../src/');
const ui = path.join(src, './index.js');

module.exports = fs
  .readdirSync(src)
  .filter((entry) => fs.statSync(path.join(src, entry)).isDirectory())
  .map((entry) => ({
    name: entry,
    path: path.join(src, entry, './index.js')
  }))
  .concat([{
    name: 'docs',
    path: docs
  }, {
    name: 'ui',
    path: ui
  }]);
