const request = require('./request');

module.exports = () => {
  return request('listDatacenters');
};
