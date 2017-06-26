const { readFile, writeFile, exists } = require('mz/fs');
const main = require('apr-main');
const forEach = require('apr-for-each');
const path = require('path');

const ROOT = path.join(__dirname, '../node_modules/react-scripts/config');
const configs = ['webpack.config.dev', 'webpack.config.prod'];

const toCopy = [
  'patch-webpack-config',
  'webpack.config.dev',
  'webpack.config.prod'
];

const backup = async file => {
  const backupPath = path.join(ROOT, `${file}.original.js`);
  const backupExists = await exists(backupPath);

  if (backupExists) {
    return;
  }

  const originalPath = path.join(ROOT, `${file}.js`);
  const orignalConfig = await readFile(originalPath, 'utf-8');
  return writeFile(backupPath, orignalConfig);
};

const copy = async file => {
  const srcPath = path.join(__dirname, `${file}.js`);
  const destPath = path.join(ROOT, `${file}.js`);

  const src = await readFile(srcPath, 'utf-8');
  return writeFile(destPath, src);
};

main(
  (async () => {
    await forEach(configs, backup);
    await forEach(toCopy, copy);
  })()
);
