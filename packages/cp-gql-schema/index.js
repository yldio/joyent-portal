const path = require('path');
const { readFileSync } = require('fs');

const file = path.join(__dirname, 'schema.gql');

module.exports = readFileSync(file, 'utf-8');
