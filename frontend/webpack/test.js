const base = require('./base');

module.exports = {
  output: {
    libraryTarget: 'commonjs2'
  },
  plugins: [
    base.plugins['no-errors-plugin'],
    base.plugins['loader-options-plugin'],
    base.plugins['define-plugin']
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
