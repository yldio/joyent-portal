const webpack = require('webpack');
const isString = require('lodash.isstring');
const fs = require('fs');
const path = require('path');

const FRONTEND_ROOT = process.cwd();
const FRONTEND = path.join(FRONTEND_ROOT, 'src');

module.exports = config => {
  config.resolve.plugins = [];

  config.plugins = config.plugins.filter(
    plugin => !(plugin instanceof webpack.optimize.UglifyJsPlugin)
  );

  config.module.rules = config.module.rules
    .reduce((loaders, loader, index) => {
      if (Array.isArray(loader.use)) {
        return loaders.concat([
          Object.assign(loader, {
            use: loader.use.map(l => {
              if (isString(l) || !isString(l.loader)) {
                return l;
              }

              if (!l.loader.match(/eslint-loader/)) {
                return l;
              }

              return Object.assign(l, {
                options: Object.assign(l.options, {
                  baseConfig: null,
                  useEslintrc: true
                })
              });
            })
          })
        ]);
      }

      if (!isString(loader.loader)) {
        return loaders.concat([loader]);
      }

      if (loader.loader.match(/babel-loader/)) {
        return loaders.concat([
          {
            test: loader.test,
            include: loader.include,
            loader: loader.loader,
            options: {
              babelrc: true,
              cacheDirectory: true
            }
          }
        ]);
      }

      if (loader.loader.match(/file-loader/)) {
        return loaders.concat([
          {
            exclude: loader.exclude.concat([/\.(graphql|gql)$/]),
            loader: loader.loader,
            options: loader.options
          }
        ]);
      }

      return loaders.concat([loader]);
    }, [])
    .concat([
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: require.resolve('graphql-tag/loader')
      }
    ]);

  config.resolve.alias = Object.assign(
    {},
    config.resolve.alias,
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

  return config;
};
