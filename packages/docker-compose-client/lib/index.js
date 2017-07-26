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
    this.client.invoke(method, options, manifest, cb);
  }

  close() {
    this.client.close();
  }

  provision({ projectName, environment, manifest, files }, cb) {
    this._invoke(
      'up',
      {
        // eslint-disable-next-line camelcase
        project_name: projectName,
        files,
        environment
      },
      manifest,
      cb
    );
  }

  scale({ projectName, services, environment, manifest, files }, cb) {
    const options = {
      environment,
      // eslint-disable-next-line camelcase
      project_name: projectName,
      files,
      services: Object.keys(services).map(name => ({
        name,
        num: services[name]
      }))
    };

    this._invoke('scale', options, manifest, cb);
  }

  config({ projectName, environment, manifest, files }, cb) {
    const options = {
      // eslint-disable-next-line camelcase
      project_name: projectName,
      files,
      environment
    };

    this._invoke('config', options, manifest, cb);
  }
};
