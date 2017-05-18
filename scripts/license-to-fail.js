#!/usr/bin/env node

const forEach = require('apr-for-each');
const execa = require('execa');
const globby = require('globby');
const main = require('apr-main');
const argv = require('yargs').argv;
const path = require('path');

const config = path.join(__dirname, '../.licensesrc.json');
const CWD = path.join(__dirname, '..');
const BIN = path.join(CWD, 'node_modules/.bin/license-to-fail');

const run = async (dirs = []) =>
  forEach(dirs, async dir => {
    const cp = execa(BIN, [config], {
      cwd: dir
    });

    cp.stdout.pipe(process.stdout);
    cp.stderr.pipe(process.stderr);

    return cp;
  });

const all = async () => {
  const files = await globby(['packages/*/', '.'], {
    cwd: CWD
  });

  return run(files.filter(pathname => !/node_modules/.test(pathname)));
};

main(argv._.length ? run(argv._) : all());
