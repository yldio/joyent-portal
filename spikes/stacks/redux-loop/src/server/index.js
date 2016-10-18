const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config.js');
const WebpackDevServer = require('webpack-dev-server');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

// WebpackDevServer should only be used for dev
const server = new WebpackDevServer(webpack(webpackConfig), {
  hot: true,
  historyApiFallback: {
    index: './static/index.html'
  },
  setup: function(app) {
    app.use('/graphql', graphqlHTTP({
      schema: schema,
      graphiql: true
    }));
  },
  publicPath: webpackConfig.output.publicPath
});

server.listen(3000, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});
