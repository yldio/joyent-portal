const path = require('path');

const ROOT = path.join(__dirname, '../..');
const UI = path.join(ROOT, 'ui');
const FRONTEND = process.env.NODE_ENV === 'production'
  ? path.join(__dirname, '../')
  : path.join(ROOT, 'frontend');

module.exports = {
  ROOT,
  MODULES: [
    'node_modules',
    path.join(FRONTEND, 'node_modules'),
    path.join(UI, 'node_modules'),
  ],
  FRONTEND: path.join(FRONTEND, 'src'),
  UI: process.env.NODE_ENV === 'production'
    ? path.join(FRONTEND, 'node_modules', '@tomgco/joyent-portal-ui', 'dist')
    : path.join(UI, 'src'),
  STATIC: path.join(FRONTEND, 'static')
};
