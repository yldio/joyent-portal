const argv = require('minimist')(process.argv.slice(2));
const getStdin = require('get-stdin');

const compile = require('./compile');

const {
  entrypoint,
  config
} = argv;

const webpackConfig = require(config);

getStdin().then((source) => {
  compile({
    source,
    entrypoint,
    config: webpackConfig
  }, (err, res) => {
    if (err) {
      throw err;
    }

    console.log(JSON.stringify(res));
  });
});
