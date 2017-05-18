const request = require('./request');

module.exports = () => {
  return request('listServices');
};
