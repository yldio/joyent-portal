const forceArray = require('force-array');
const hasha = require('hasha');

module.exports.toKeyValue = r =>
  r &&
  Object.keys(r).map(name => ({
    id: hasha(JSON.stringify({ name, value: r[name] })),
    name,
    value: r[name]
  }));

module.exports.fromKeyValue = kvs =>
  forceArray(kvs).reduce(
    (rest, { name, value }) =>
      Object.assign(rest, {
        [name]: value
      }),
    {}
  );
