const { expect } = require('code');
const Lab = require('lab');
const Package = require('../package.json');
const { safeLoad } = require('js-yaml');
const { Server } = require('zerorpc');

// Test shortcuts

const lab = Lab.script();
exports.lab = lab;
const after = lab.after;
const it = lab.it;

const projectName = Package.name;
const endpoint = 'tcp://0.0.0.0:4040';
const DockerComposeClient = require('../');
const client = new DockerComposeClient(endpoint);

const server = new Server({
  // eslint-disable-next-line object-shorthand
  up: function(options, manifest, fn) {
    if (typeof options !== 'object') {
      return fn(new Error('Expected options'));
    }

    if (typeof options.project_name !== 'string') {
      return fn(new Error('Expected project name'));
    }

    if (typeof manifest !== 'string') {
      return fn(new Error('Expected manifest'));
    }

    try {
      safeLoad(manifest);
    } catch (err) {
      return fn(err);
    }

    fn(null, {
      projectName: options.project_name
    });
  },
  // eslint-disable-next-line object-shorthand
  scale: function(options, manifest, fn) {
    if (typeof options !== 'object') {
      return fn(new Error('Expected options'));
    }

    if (typeof options.project_name !== 'string') {
      return fn(new Error('Expected project name'));
    }

    if (!Array.isArray(options.services)) {
      return fn(new Error('Expected services'));
    }

    if (typeof manifest !== 'string') {
      return fn(new Error('Expected manifest'));
    }

    try {
      safeLoad(manifest);
    } catch (err) {
      return fn(err);
    }

    fn(null, {
      projectName: options.project_name,
      services: options.services
    });
  },
  // eslint-disable-next-line object-shorthand
  config: function(options, manifest, fn) {
    if (typeof options !== 'object') {
      return fn(new Error('Expected options'));
    }

    if (typeof options.project_name !== 'string') {
      return fn(new Error('Expected project name'));
    }

    if (typeof manifest !== 'string') {
      return fn(new Error('Expected manifest'));
    }

    try {
      safeLoad(manifest);
    } catch (err) {
      return fn(err);
    }

    fn(null, {
      projectName: options.project_name
    });
  }
});

server.bind(endpoint);

it('provision()', done => {
  const manifest = `
    hello:
      image: hello-world:latest
    world:
      image: consul:latest
    node:
      image: node:latest
  `;

  client.provision({ projectName, manifest }, (err, res) => {
    expect(err).to.not.exist();

    expect(res.projectName).to.equal(projectName);
    done();
  });
});

it('scale()', done => {
  const manifest = `
    hello:
      image: hello-world:latest
    world:
      image: consul:latest
    node:
      image: node:latest
  `;

  client.scale(
    {
      projectName,
      services: {
        hello: 2,
        world: 3
      },
      manifest
    },
    (err, res) => {
      expect(err).to.not.exist();

      expect(res).to.equal({
        projectName,
        services: [{ name: 'hello', num: 2 }, { name: 'world', num: 3 }]
      });
      done();
    }
  );
});

it('config()', done => {
  const manifest = `
    hello:
      image: hello-world:latest
    world:
      image: consul:latest
    node:
      image: node:latest
  `;

  client.config(
    {
      projectName,
      services: ['hello'],
      manifest
    },
    (err, res) => {
      expect(err).to.not.exist();
      expect(res).to.exist();
      done();
    }
  );
});

it('handles errors', done => {
  client.once('error', err => {
    expect(err).to.exist();
    done();
  });

  client.client.emit('error', new Error('test'));
});

after(done => {
  client.close();
  server.close();
  done();
});
