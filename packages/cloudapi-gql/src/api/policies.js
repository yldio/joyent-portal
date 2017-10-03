const request = require('./request');
// const aperture = require('aperture');
// const { config } = require('aperture-config');
//
// const parser = aperture.createParser({
//   types: aperture.types,
//   typeTable: config.typeTable
// });
// .then(policies =>
//   policies.map(({ rules, ...policy }) =>
//     Object.assign(policy, {
//       rules: Object.assign(rules.map(parser.parse.bind(parser)), {
//         str: rule
//       })
//     })
//   )
// );

module.exports.list = () => request('listPolicies');
module.exports.get = ctx => request('getPolicy', ctx);
module.exports.create = ctx => request('createPolicy', ctx);
module.exports.update = ctx => request('updatePolicy', ctx);
module.exports.destroy = ctx => request('deletePolicy', ctx);
