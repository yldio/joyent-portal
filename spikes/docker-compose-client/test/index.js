const { name } = require('../package.json');
const { safeLoad } = require('js-yaml');
const { Server } = require('zerorpc');
const intercept = require('apr-intercept');
const test = require('ava');

const DockerComposeClient = require('../');
const client = new DockerComposeClient();

const server = new Server({
  up: function(options, manifest, fn) {
    let m;

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
      m = safeLoad(manifest);
    } catch (err) {
      return fn(err);
    }

    fn(null, {
      projectName: options.project_name
    });
  },
  scale: function(options, manifest, fn) {
    let m;

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
      m = safeLoad(manifest);
    } catch (err) {
      return fn(err);
    }

    fn(null, {
      projectName: options.project_name,
      services: options.services
    });
  }
});

server.bind('tcp://0.0.0.0:4242');

test('provision', async t => {
  const [err, res] = await intercept(
    client.provision({
      projectName: name,
      manifest: `
      hello:
        image: hello-world:latest
      world:
        image: consul:latest
      node:
        image: node:latest
    `
    })
  );

  t.ifError(err);

  t.deepEqual(res, {
    projectName: name
  });
});

test('scale', async t => {
  const [err, res] = await intercept(
    client.scale({
      projectName: name,
      services: {
        hello: 2,
        world: 3
      },
      manifest: `
      hello:
        image: hello-world:latest
      world:
        image: consul:latest
      node:
        image: node:latest
    `
    })
  );

  t.ifError(err);

  t.deepEqual(res, {
    projectName: name,
    services: [{ name: 'hello', num: 2 }, { name: 'world', num: 3 }]
  });
});

test.after(() => {
  client.close();
  server.close();
});
