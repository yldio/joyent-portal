const DockerComposeClient = require('./vendor/docker-compose-client');
const Router = require('router');
const { createServer } = require('http');
const bodyParser = require('body-parser');
const next = require('next');
const TritonWatch = require('triton-watch');

const app = next({
  dev: process.env.NODE_ENV !== 'production'
});

const tritonWatch = new TritonWatch({
  frequency: 16,
  triton: {
    profileName: 'sw1',
    configDir: '~/.triton/'
  }
});

const containers = {};
const handle = app.getRequestHandler();
const client = new DockerComposeClient();
const router = Router();

router.use(bodyParser.json());

tritonWatch.on('change', container => (containers[container.id] = container));

router.get('/api/status', (req, res) => {
  res.end(JSON.stringify(containers));
});

router.post('/api/provision', (req, res) => {
  client
    .provision({
      projectName: req.body.name,
      manifest: req.body.manifest
    })
    .then(status => res.end(JSON.stringify(status)));
});

router.post('/api/scale', (req, res) => {
  client
    .provision({
      projectName: req.body.name,
      manifest: req.body.manifest,
      services: req.body.services
    })
    .then(status => res.end(JSON.stringify(status)));
});

tritonWatch.poll();

app.prepare().then(() =>
  createServer((req, res) => {
    router(req, res, () => handle(req, res));
  }).listen(3000)
);
