const request = require('./request');

// lists all networks, including fabric networks
module.exports.list = () => request('listNetworks');
module.exports.get = ctx => request('getNetwork', ctx);
// create fabric network
module.exports.create = () => request('');
// destroy fabric network
module.exports.destroy = () => request('');
