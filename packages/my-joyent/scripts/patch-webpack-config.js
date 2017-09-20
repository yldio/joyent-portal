const MinifyPlugin = require('babel-minify-webpack-plugin');
const webpack = require('webpack');
const isString = require('lodash.isstring');
const fs = require('fs');
const path = require('path');

const FRONTEND_ROOT = process.cwd();
const FRONTEND = path.join(FRONTEND_ROOT, 'src');

const BabelLoader = loader => ({
  test: loader.test,
  include: loader.include,
  loader: loader.loader,
  options: {
    babelrc: true,
    compact: true
  }
});

const FileLoader = loader => ({
  exclude: loader.exclude.concat([/\.(graphql|gql)$/]),
  loader: loader.loader,
  options: loader.options
});

module.exports = config => {
  config.resolve.plugins = [];

  config.plugins = config.plugins.map(
    plugin =>
      plugin instanceof webpack.optimize.UglifyJsPlugin
        ? new MinifyPlugin()
        : plugin
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

      if (Array.isArray(loader.oneOf)) {
        return loaders.concat([
          Object.assign(loader, {
            oneOf: loader.oneOf.map(loader => {
              if (!isString(loader.loader)) {
                return loader;
              }

              if (loader.loader.match(/babel-loader/)) {
                return BabelLoader(loader);
              }

              if (loader.loader.match(/file-loader/)) {
                return FileLoader(loader);
              }

              return loader;
            })
          })
        ]);
      }

      if (!isString(loader.loader)) {
        return loaders.concat([loader]);
      }

      if (loader.loader.match(/babel-loader/)) {
        return loaders.concat(BabelLoader(loader));
      }

      if (loader.loader.match(/file-loader/)) {
        return loaders.concat([FileLoader(loader)]);
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
