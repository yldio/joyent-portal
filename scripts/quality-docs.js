#!/usr/bin/env node

const forEach = require('apr-for-each');
const execa = require('execa');
const globby = require('globby');
const main = require('apr-main');
const argv = require('yargs').argv;
const path = require('path');

const run = async (files = []) =>
  forEach(files, async file => {
    const cp = execa('quality-docs', [file]);

    cp.stdout.pipe(process.stdout);
    cp.stderr.pipe(process.stderr);

    return cp;
  });

const all = async () => {
  const files = await globby(['packages/**/*.md', './*.md'], {
    cwd: path.join(__dirname, '..')
  });

  return run(files.filter(pathname => !/node_modules/.test(pathname)));
};

main(argv._.length ? run(argv._) : all());
