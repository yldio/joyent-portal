const babel = require('rollup-plugin-babel');
const { default: babelrc } = require('babelrc-rollup');
const path = require('path');

const pkg = require('../package.json');

module.exports = {
  entry: path.join(__dirname, '..', pkg.entry),
  external: Object.keys(pkg.dependencies),
  plugins: [
    babel(
      babelrc({
        path: path.join(__dirname, '../.babelrc')
      })
    )
  ],
  targets: [
    {
      dest: path.join(__dirname, '..', pkg.main),
      moduleName: pkg.name,
      format: 'umd',
      sourceMap: 'inline'
    },
    {
      dest: path.join(__dirname, '..', pkg.module),
      format: 'es',
      sourceMap: 'inline'
    }
  ]
};
