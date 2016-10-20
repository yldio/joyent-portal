const uniq = require('lodash.uniq');
const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(path.join(__dirname, '../static/locales'));

module.exports = uniq(files.map((file) => {
  return file.replace(/\.js$/, '');
}).filter((file) => {
  return file.match(/.*?-.*?/);
}));
