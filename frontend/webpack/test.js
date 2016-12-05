const plugins = require('./plugins');

module.exports = {
  output: {
    libraryTarget: 'commonjs2'
  },
  plugins: [
    plugins['no-errors-plugin'],
    plugins['loader-options-plugin'],
    plugins['define-plugin']
  ],
  module: {
    loaders: [{
      test: /\.css?$/,
      loader: [
        'css-loader?',
        'modules&importLoaders=1&',
        'localIdentName=[name]__[local]___[hash:base64:5]!',
        'postcss-loader'
      ].join('')
    }]
  }
};
