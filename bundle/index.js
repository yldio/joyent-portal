// Requires .env.js file with the following exports:
// SDC_URL, SDC_KEY_ID, SDC_KEY_PATH
require('./.env.js');

const Main = require('apr-main');
const Hapi = require('hapi');
const H2O2 = require('h2o2');
const Execa = require('execa');
const Path = require('path');
const Fs = require('fs');

const { PORT = 4000 } = process.env;
const ROOT = Path.join(__dirname, 'src');

const calcPort = i => Number(PORT) + Number(i) + 1;

const namespaces = Fs.readdirSync(ROOT)
  .filter(filename => /.js$/.test(filename))
  .map(filename => filename.replace(/.js$/, ''))
  .filter(filename => !['index', 'server'].includes(filename));

const routes = namespaces.map((namespace, i) => ({
  method: '*',
  path: `/${namespace}/{params*}`,
  handler: {
    proxy: {
      uri: `{protocol}://0.0.0.0:${calcPort(i)}/${namespace}/{params}`
    }
  }
}));

namespaces.forEach((namespace, i) => {
  const child = Execa('node', [namespace], {
    cwd: ROOT,
    cleanup: true,
    env: Object.assign({}, process.env, {
      PORT: calcPort(i),
      PREFIX: namespace
    })
  });

  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
});

Main(async () => {
  const server = Hapi.server({
    port: PORT,
    routes: {
      cors: {
        origin: ['*'],
        credentials: true,
        additionalHeaders: ['Cookie', 'X-CSRF-Token']
      }
    },
    debug: {
      log: ['error'],
      request: ['error']
    }
  });

  await server.register({
    plugin: H2O2
  });

  routes.map(route => server.route(route));

  await server.start();

  // eslint-disable-next-line no-console
  console.log(`server started at http://0.0.0.0:${server.info.port}`);
});
