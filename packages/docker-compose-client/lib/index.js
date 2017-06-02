const { Client } = require('zerorpc');
const EventEmitter = require('events');

module.exports = class DockerComposeClient extends EventEmitter {
  constructor(endpoint = 'tcp://0.0.0.0:4242', timeout = 60 * 30) {
    super();

    this.client = new Client({
      heartbeatInterval: 60 * 4 * 1000, // 4m
      timeout // 30m
    });

    this.client.on('error', err => this.emit('error', err));
    this.client.connect(endpoint);
  }

  _invoke(method, options, manifest, cb) {
    return this.client.invoke(method, options, manifest, cb);
  }

  close() {
    return this.client.close();
  }

  provision({ projectName, manifest }, cb) {
    // eslint-disable-next-line camelcase
    return this._invoke('up', { project_name: projectName }, manifest, cb);
  }

  scale({ projectName, services, manifest }, cb) {
    const options = {
      // eslint-disable-next-line camelcase
      project_name: projectName,
      services: Object.keys(services).map(name => ({
        name,
        num: services[name]
      }))
    };

    return this._invoke('scale', options, manifest, cb);
  }
};
