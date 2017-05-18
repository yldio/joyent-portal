// const DOCKER_URL = url.parse(DOCKER_HOST);

// {
//   // host: DOCKER_URL.hostname,
//   // port: DOCKER_URL.port,
//   // ca: fs.readFileSync(path.join(DOCKER_CERT_PATH, 'ca.pem')),
//   // cert: fs.readFileSync(path.join(DOCKER_CERT_PATH, 'cert.pem')),
//   // key: fs.readFileSync(path.join(DOCKER_CERT_PATH, 'key.pem')),
//   version: 'v1.24'
// }
// const DOCKER_CERT_PATH = process.env.DOCKER_CERT_PATH;
// const DOCKER_HOST = process.env.DOCKER_HOST;
//
// if (!DOCKER_HOST || !DOCKER_CERT_PATH) {
//   throw new Error(`
//     Required ENV variables: DOCKER_HOST and DOCKER_CERT_PATH
//   `);
// }

const prometheus = require('./scripts/prometheus');
const Docker = require('dockerode');
const url = require('url');
const path = require('path');
const fs = require('fs');
const delay = require('delay');
const until = require('apr-until');
const forEach = require('apr-for-each');
const filter = require('apr-filter');
const some = require('apr-some');
const map = require('apr-map');
const intercept = require('apr-intercept');
const find = require('apr-find');
const parallel = require('apr-parallel');
const awaitify = require('apr-awaitify');
const flatten = require('lodash.flatten');
const yaml = require('js-yaml');
const axios = require('axios');

const start = new Date().getTime();
const window = 1000 * 60 * 60 * 5; // 5h
const interval = 1000 * 15; // 15s
const dockerComposeFilename = path.join(__dirname, 'docker-compose.yml');
const services = yaml.safeLoad(fs.readFileSync(dockerComposeFilename, 'utf-8'));
const docker = new Docker();
const writeFile = awaitify(fs.writeFile);
let restarts = 0;

const getContainer = async (Id) => {
  const container = docker.getContainer(Id)
  const meta = await container.inspect();
  return { container, meta };
};

const getServiceName = ({ Config }) => {
  return Config.Labels['com.docker.compose.service'];
};

const getHrefs = async ({ NetworkSettings }) => {
  const ports = await filter(NetworkSettings.Ports, Boolean);

  const hrefs = await map(ports, async (values = []) => {
    return await map(values, ({ HostIp, HostPort }) => url.format({
      hostname: HostIp,
      port: HostPort,
      protocol: 'http:',
      slashes: true
    }));
  });

  return flatten(Object.keys(hrefs).map((name) => hrefs[name]));
};

const findContainer = async (name) => {
  const ps = await docker.listContainers();

  const { Id } = await find(ps, async ({ Id }) => {
    const { container, meta } = await getContainer(Id);
    return getServiceName(meta) === name;
  });

  return await getContainer(Id);
}

const report = async () => {
  const { telemetry, meta } = await findContainer('telemetry')
  const hrefs = await getHrefs(meta);

  if (!hrefs.length) {
    console.error('Telemetry service unavailable');
    return;
  }

  const [pErr, data] = await intercept(prometheus.range({
    host: url.parse(hrefs[0]).host,
    query: [
      'node_memory_rss_bytes',
      'node_memory_heap_total_bytes',
      'node_memory_heap_used_bytes',
      'process_heap_bytes',
      'process_resident_memory_bytes',
      'process_virtual_memory_bytes',
      'process_cpu_seconds_total',
      'process_cpu_system_seconds_total',
      'process_cpu_user_seconds_total',
      'node_lag_duration_milliseconds',
      'http_request_duration_milliseconds'
    ],
    ago: '24h ago',
    step: '15s'
  }));

  if (pErr) {
    return;
  }

  const [dErr] = await intercept(writeFile(
    path.join(__dirname, `datasets-${start}-${restarts}.json`),
    JSON.stringify(data, null, 2),
    'utf-8'
  ));

  return !dErr
    ? console.log('Updated datasets.json')
    : console.error(err);
};

const checkHref = async (href) => {
  const [err] = await intercept(axios.get(`${href}/metrics`, {
    timeout: 500
  }));

  return !!err;
};

const inspectContainer = async ({ Id }) => {
  const { container, meta } = await getContainer(Id);
  const hrefs = await getHrefs(meta);
  const serviceName = getServiceName(meta);
  const service = services[serviceName];
  const isUnreachable = await some(hrefs, checkHref);

  const shouldRestart = !!(
    isUnreachable || (
      service.ports &&
      !Object.keys(hrefs).length
    )
  );

  console.log(`${serviceName} is ${isUnreachable ? 'unreachable' : 'reachable'}`);

  if (!shouldRestart) {
    return;
  }

  console.log(`\n\nIS GOING TO RESTART: ${serviceName}\n\n`);

  const artilleryServiceName = serviceName.replace(/node/, 'artillery');
  const { container: artillery } = await findContainer(artilleryServiceName);

  restarts = (serviceName === 'telemetry')
    ? restarts + 1
    : restarts;

  await parallel([
    () => container.restart(),
    () => artillery.restart()
  ]);
};

const inspect = async () => {
  const ps = await docker.listContainers();
  await forEach(ps, inspectContainer);
};

// const handleError = async (p) => {
//   const [err] = await intercept(p);
//
//   if (err) {
//     console.error(err);
//   }
// }

const tick = () => parallel({
  inspect,
  report
});

const check = () => !((new Date().getTime() - start) > window)
  ? delay(interval)
  : true;

until(check, tick).then(() => {
  console.log('done')
}, (err) => {
  console.error(err)
});
