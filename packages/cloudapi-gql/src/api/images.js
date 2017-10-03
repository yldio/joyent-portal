const request = require('./request');

module.exports.list = ctx => request('listImages', ctx);
module.exports.get = ctx => request('getImage', ctx);
module.exports.destroy = uuid => request('deleteImage', uuid);
module.exports.export = uuid => request('deleteImage', uuid);
module.exports.create = ctx => request('createImageFromMachine', ctx);
module.exports.update = ctx => request('UpdateImage', ctx);
