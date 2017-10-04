const request = require('./request');

const transform = ({ os, type, state, ...rest }) =>
  Object.assign(rest, {
    type: type ? type.toLowerCase() : type,
    os: os ? os.toLowerCase() : os,
    state: state ? state.toLowerCase() : state
  });

module.exports.list = ctx => request('listImages', transform(ctx));
module.exports.get = ctx => request('getImage', ctx);
module.exports.destroy = uuid => request('deleteImage', uuid);
module.exports.export = uuid => request('deleteImage', uuid);
module.exports.create = ctx => request('createImageFromMachine', ctx);
module.exports.update = ctx => request('UpdateImage', ctx);
