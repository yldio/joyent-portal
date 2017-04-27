const client = require('./client');

// https://docs.docker.com/engine/api/v1.24/#list-containers
module.exports.list = () => client.listContainers();

module.exports.create = () => null;
module.exports.inspect = () => null;
module.exports.ps = () => null;
module.exports.logs = () => null;
module.exports.stats = () => null;
module.exports.changes = () => null;
module.exports['export'] = () => null;
module.exports.resize = () => null;
module.exports.start = () => null;
module.exports.stop = () => null;
module.exports.restart = () => null;
module.exports.kill = () => null;
module.exports.update = () => null;
module.exports.rename = () => null;
module.exports.pause = () => null;
module.exports.unpause = () => null;
module.exports.attach = () => null;
module.exports.wait = () => null;
module.exports.remove = () => null;
module.exports.archive = () => null;
module.exports.pause = () => null;
module.exports.exec = () => null;
module.exports.pause = () => null;
