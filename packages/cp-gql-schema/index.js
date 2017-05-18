const path = require('path');
const { readFile } = require('mz/fs');
const { readFileSync } = require('fs');

const file = path.join(__dirname, 'schema.gql');

module.exports = () => readFile(file, 'utf-8');
module.exports.sync = () => readFileSync(file, 'utf-8');
