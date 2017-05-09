const { Client } = require('zerorpc');
const { EventEmitter } = require('events');
const awaitify = require('apr-awaitify');

class DockerComposeClient extends EventEmitter {
  constructor(endpoint = 'tcp://0.0.0.0:4242') {
    super();

    this.client = new Client();
    this.client.connect(endpoint);
    this.client.on('error', err => this.emit('error', err));

    this._invoke = awaitify(this._invoke.bind(this));
  }

  // Why isn't client.connect async with error??
  _invoke(name, ...args) {
    return this.client.invoke(name, ...args);
  }

  close() {
    return this.client.close();
  }

  provision({ projectName, manifest }) {
    // eslint-disable-next-line camelcase
    return this._invoke('up', { project_name: projectName }, manifest);
  }

  scale({ projectName, services, manifest }) {
    return this._invoke(
      'scale',
      {
        // eslint-disable-next-line camelcase
        project_name: projectName,
        services: Object.keys(services).map(name => ({
          name,
          num: services[name]
        }))
      },
      manifest
    );
  }
}

module.exports = DockerComposeClient;
