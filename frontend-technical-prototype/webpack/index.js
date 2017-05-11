const NODE_ENV = process.env['NODE_ENV'] || 'development';

module.exports = require(`./${NODE_ENV}`);
