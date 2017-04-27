const pascalCase = require('pascal-case');
const upperCase = require('upper-case');

module.exports = (root, ctx, req, { fieldName }) => root[pascalCase(fieldName)] || root[upperCase(fieldName)];
