const fs = require('fs');
const path = require('path');
const originalConfig = require('./webpack.config.dev.original');

const FRONTEND_ROOT = process.cwd();
const FRONTEND = path.join(FRONTEND_ROOT, 'src');

const rules = originalConfig.module.rules.reduce((loaders, loader, index) => {
  if (index === 3) {
    loaders.push({
      test: loader.test,
      include: loader.include,
      loader: loader.loader,
      options: {
        babelrc: true,
        cacheDirectory: true
      }
    });
  } else if (index === 1) {
    loaders.push({
      exclude: loader.exclude.concat([/\.(graphql|gql)$/]),
      loader: loader.loader,
      options: loader.options
    });
  } else if (loader.include) {
    loaders.push(Object.assign({}, loader, { include: loader.include }));
  } else {
    loaders.push(loader);
  }
  return loaders;
}, []);

rules.push({
  test: /\.(graphql|gql)$/,
  exclude: /node_modules/,
  loader: require.resolve('graphql-tag/loader')
});

const aliases = Object.assign(
  {},
  originalConfig.resolve.alias,
  fs
    .readdirSync(FRONTEND)
    .map(name => path.join(FRONTEND, name))
    .filter(fullpath => fs.statSync(fullpath).isDirectory())
    .reduce(
      (aliases, fullpath) =>
        Object.assign(aliases, {
          [`@${path.basename(fullpath)}`]: fullpath
        }),
      {
        '@root': FRONTEND
      }
    )
);

originalConfig.module.rules = rules;
originalConfig.resolve.alias = aliases;
originalConfig.resolve.plugins = [];

module.exports = originalConfig;
