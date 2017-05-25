#!/usr/bin/env node

const { config } = require('../package.json');
const forceArray = require('force-array');
const execa = require('execa');
const globby = require('globby');
const main = require('apr-main');
const argv = require('yargs').argv;
const path = require('path');
const fs = require('fs');

const root = path.join(__dirname, '../');
const optOut = forceArray(config['fmt-opt-out']).map(pkg =>
  path.join(root, `packages/${pkg}`)
);

const filter = (files = []) =>
  files
    .filter(file => !/node_modules/.test(file))
    .map(file => path.resolve(root, file))
    .filter(file => !optOut.some(pkg => file.indexOf(pkg) === 0));

const run = async (files = []) => {
  const cp = execa(
    'prettier',
    ['--write', '--single-quote'].concat(filter(files))
  );

  cp.stdout.pipe(process.stdout);
  cp.stderr.pipe(process.stderr);

  return cp;
};

const all = async () => {
  const files = await globby('{scripts,packages}/**/*.js', {
    cwd: path.join(__dirname, '..')
  });

  return run(files);
};

main(argv._.length ? run(argv._) : all());
