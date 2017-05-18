const request = require('./request');

module.exports.list = ctx => {
  return request('listImages', ctx);
};

module.exports.get = ctx => {
  return request('getImage', ctx);
};

module.exports.create = ctx => {
  return request('createImageFromMachine', ctx);
};

// Module.exports.update = (ctx) => {
//   return request('UpdateImage', ctx);
// };

module.exports.destroy = uuid => {
  return request('deleteImage', uuid);
};

// Module.exports.xport = (uuid) => {
//   return request('deleteImage', uuid);
// };
