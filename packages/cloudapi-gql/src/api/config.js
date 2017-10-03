const { fetch } = require('./request');

module.exports = () => fetch('/:login/config');
