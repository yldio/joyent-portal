const fs = require('fs');
const path = require('path');
const paths = require('./paths');

const {
  ROOT,
  MODULES,
  FRONTEND,
  UI,
  STATIC
} = paths;

module.exports = function(config) {
  // Add support for loading .graphql files
  config.module.loaders[0].exclude.push(/\.(graphql|gql)$/);

  const loaders = config.module.loaders.reduce((loaders, loader) => {
    if(loader.loader === 'babel') {
      loaders.push({
        test: loader.test,
        include: loader.include,
        loader: loader.loader,
        query: {
          babelrc: false,
          presets: [require.resolve('babel-preset-react-app')],
          plugins: ["inline-react-svg"],
          cacheDirectory: true
        }
      })
    }
    else {
      loaders.push(loader);
    }
    return loaders;
  }, []);

  config.module.loaders = loaders;

  config.module.loaders.push({
    test: /\.(graphql|gql)$/,
    exclude: /node_modules/,
    loader: require.resolve('graphql-tag/loader'),
  });

  config.resolveLoader.modules = MODULES;

  config.resolve.modules = MODULES;

  config.resolve.alias = Object.assign({}, config.resolve.alias, fs.readdirSync(FRONTEND)
    .map((name) => path.join(FRONTEND, name))
    .filter((fullpath) => fs.statSync(fullpath).isDirectory())
    .reduce((aliases, fullpath) => Object.assign(aliases, {
      [`@${path.basename(fullpath)}`]: fullpath
    }), {
      '@root': FRONTEND,
      '@ui': UI
    }));

  config.module.loaders = config.module.loaders.map((loader) => {
    if(loader.include) {
      return Object.assign({}, loader, {include: [loader.include, UI]});
    }
    return loader;
  });

  return config;
}
