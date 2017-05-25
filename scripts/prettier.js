#!/usr/bin/env node

const { config } = require('../package.json');
const forceArray = require('force-array');
const execa = require('execa');
const globby = require('globby');
const main = require('apr-main');
const argv = require('yargs').argv;
const path = require('path');

const optOut = forceArray(config['fmt-opt-out']);

const filter = (files = []) =>
  files
    .filter(file => !/node_modules/.test(file))
    .filter(file => !optOut.some(pkg => file.indexOf(`packages/${pkg}`) === 0));

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
