const path = require('path');

module.exports = function(config) {
  // Add support for loading .graphql files
  config.module.loaders[0].exclude.push(/\.(graphql|gql)$/);

  config.module.loaders.push({
    test: /\.(graphql|gql)$/,
    exclude: /node_modules/,
    loader: require.resolve('graphql-tag/loader'),
  });

  return config;
}
