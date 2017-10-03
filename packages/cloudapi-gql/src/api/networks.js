const request = require('./request');

// lists all networks, including fabric networks
module.exports.list = () => request('listNetworks');
module.exports.get = ({ id }) => request('getNetwork', id);
// create fabric network
module.exports.create = () => request('');
// destroy fabric network
module.exports.destroy = () => request('');
