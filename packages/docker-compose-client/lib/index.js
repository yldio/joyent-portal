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

  provision({ projectName, environment, manifest }, cb) {
    return this._invoke('up', {
      // eslint-disable-next-line camelcase
      project_name: projectName,
      environment
    }, manifest, cb);
  }

  scale({ projectName, services, environment, manifest }, cb) {
    const options = {
      environment,
      // eslint-disable-next-line camelcase
      project_name: projectName,
      services: Object.keys(services).map(name => ({
        name,
        num: services[name]
      }))
    };

    return this._invoke('scale', options, manifest, cb);
  }

  config({ projectName, environment, manifest }, cb) {
    const options = {
      // eslint-disable-next-line camelcase
      project_name: projectName,
      environment
    };

    return this._invoke('config', options, manifest, cb);
  }
};
