const uniq = require('lodash.uniq');
const flatten = require('lodash.flatten');
const argv = require('minimist')(process.argv);
const moment = require('moment');
const path = require('path');
const fs = require('fs');

if (!argv.file) {
  throw new Error('--file required');
}

const filename = path.resolve(__dirname, argv.file);

if (!fs.existsSync(filename)) {
  throw new Error('--file does not exist');
}

const data = require(filename);
const metrics = flatten(uniq(Object.keys(data.leak).map((service) => {
  return Object.keys(data.leak[service]);
})));

const aggregated = metrics.reduce((agg, name) => Object.assign(agg, {
  [name]: []
}), {});

const sort = (set) => {
  return set.sort((a, b) => {
    return moment(a[0], 'X').isAfter(moment(b[0], 'X')) ? 1 : -1;
  });
};

Object.keys(data.leak).forEach((service) => {
  Object.keys(data.leak[service]).forEach((metric) => {
    aggregated[metric] = aggregated[metric].concat(data.leak[service][metric]);
  });
});

Object.keys(aggregated).forEach((metric) => {
  console.error(metric);
  aggregated[metric] = sort(aggregated[metric]);
});

console.log(JSON.stringify(aggregated, null, 2));
