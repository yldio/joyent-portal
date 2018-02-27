const HTMLtoJSX = require('htmltojsx');
const { default: forEach } = require('apr-for-each');
const main = require('apr-main');
const pascalCase = require('pascal-case');
const { readFile, writeFile } = require('mz/fs');
const execa = require('execa');
const globby = require('globby');
const path = require('path');

const ASSETS_ROOT = path.join(__dirname, 'assets');
const SRC_ROOT = path.join(__dirname, 'src');

const converter = new HTMLtoJSX({
  createClass: false
});

main(async () => {
  const files = await globby(`${ASSETS_ROOT}/*.svg`);

  await forEach(files, async file => {
    const svg = await readFile(file, 'utf-8');
    const jsx = converter.convert(svg);
    const header = jsx.match(/(^<svg)([^>]*)/gi)[0];

    await writeFile(
      file.replace(/logos\/assets\//, '/logos/src/').replace(/\.svg$/, '.js'),
      `
      import React from 'react';\n
      export default (props) => (${jsx.replace(
        header,
        `${header} {...props}`
      )});
    `
    );
  });

  await writeFile(
    path.join(SRC_ROOT, 'index.js'),
    files
      .map(file => {
        const name = path.basename(file).replace(/\.svg$/, '');
        return `export { default as ${pascalCase(name)} } from './${name}'`;
      })
      .join('\n')
  );

  await execa('prettier', ['--write', '--single-quote', 'src/*.js'], {
    cwd: __dirname
  });
});
