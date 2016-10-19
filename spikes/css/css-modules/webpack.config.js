const webpack = require('webpack');
const path = require('path');

const config = {
  debug: true,
  devtool: 'eval',
  context: path.join(__dirname, './src'),
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './showcase/index.js'
  ],
  output: {
    path: path.join(__dirname, './static'),
    publicPath: '/static/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  postcss: () => {
    return [
      require('postcss-modules-values'),
      require('postcss-nested'),
      require('autoprefixer')
    ];
  },
  module: {
    loaders: [{
      test: /js?$/,
      exclude: /node_modules/,
      include: [
        path.join(__dirname, './src')
      ],
      loaders: ['babel']
    }, {
      test: /\.json?$/,
      exclude: /node_modules/,
      include: [
        path.join(__dirname, './src')
      ],
      loaders: ['json']
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      include: [
        path.join(__dirname, './src')
      ],
      loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
    }]
  }
};

const devServer = {
  hot: true,
  compress: true,
  lazy: false,
  publicPath: config.output.publicPath,
  historyApiFallback: {
    index: './static/index.html'
  }
};

module.exports = Object.assign({
  devServer
}, config);
