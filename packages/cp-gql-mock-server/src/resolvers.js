const { detailedDiff } = require('deep-object-diff');
const Delay = require('delay');
const forEach = require('apr-for-each/series');
const map = require('apr-map/series');
const paramCase = require('param-case');
const camelCase = require('camel-case');
const buildArray = require('build-array');
const forceArray = require('force-array');
const lfind = require('lodash.find');
const findIndex = require('lodash.findindex');
const flatten = require('lodash.flatten');
const uniq = require('lodash.uniq');
const yaml = require('js-yaml');
const hasha = require('hasha');
const moment = require('moment');
const IPC = require('crocket');
const Boom = require('boom');

const { NODE_ENV, SOCK_PORT } = process.env;
const IS_TEST = (NODE_ENV || '').toLowerCase() === 'test';

const emit = (() => {
  if (!IS_TEST) {
    return () => null;
  }

  let index = 0;
  const sock = new IPC();

  sock.listen({ port: Number(SOCK_PORT) }, err => {
    if (err) throw err;

    // eslint-disable-next-line no-console
    console.log('sock bound to %d', SOCK_PORT);
  });

  return (name, payload) => {
    sock.emit(name, { index: (index += 1), payload });
  };
})();

const wpData = require('./wp-data.json');
const cpData = require('./cp-data.json');
const complexData = require('./complex-data.json');
const metricData = [
  require('./metric-datasets-0.json'),
  require('./metric-datasets-1.json'),
  require('./metric-datasets-2.json')
];

const { datacenter, portal } = require('./data.json');

const deploymentGroups = [
  wpData.deploymentGroup,
  cpData.deploymentGroup,
  complexData.deploymentGroup
];

const services = wpData.services
  .concat(cpData.services)
  .concat(complexData.services);

const instances = wpData.instances
  .concat(cpData.instances)
  .concat(complexData.instances);

const INTERPOLATE_REGEX = /\$([_a-z][_a-z0-9]*)/gi;
const wait = (s, fn) => setTimeout(fn, s * 1000);
// eslint-disable-next-line new-cap
const delay = s => Delay(s * 1000);

const find = (query = {}) => item =>
  Object.keys(query).every(key => item[key] === query[key]);

const cleanQuery = (q = {}) => JSON.parse(JSON.stringify(q));

let metricDataIndex = 0;

const cleanDiff = (diff, meta) => {
  const obj = Object.assign(diff, meta);

  return Object.keys(obj).reduce((acc, key) => {
    if (
      ['added', 'deleted', 'updated'].indexOf(key) >= 0 &&
      !Object.keys(obj[key]).length
    ) {
      return acc;
    }

    acc[key] = obj[key];
    return acc;
  }, {});
};

const diff = (before, after, metaProp) => {
  if (!IS_TEST) {
    return;
  }

  const detail = detailedDiff(before, after);
  const cleaned = cleanDiff(detail, {
    [metaProp]: before[metaProp]
  });

  return ['added', 'deleted', 'updated'].reduce((diff, type) => {
    if (!diff[type]) {
      return diff;
    }

    return Object.assign(diff, {
      [type]: Object.keys(diff[type]).reduce(
        (change, name) =>
          Object.assign(change, {
            [name]: {
              before: before[name],
              after: diff[type][name]
            }
          }),
        {}
      )
    });
  }, cleaned);
};

/** *************************************************************************** */

const getMetrics = query => {
  const { names, start, end, instanceId } = query;

  const metrics = names.reduce((metrics, name) => {
    // pick one of the three metric data jsons, so there's variety
    const index = metricDataIndex % metricData.length;
    metricDataIndex++;

    const md = metricData[index].find(md => md.name === name);
    const m = md.metrics;

    const s = moment.utc(start);
    const e = moment.utc(end);

    // how many records do we need?
    const duration = e.diff(s); // duration for which we need data
    const records = Math.floor(duration / 15000); // new metric record every 15 secs

    const requiredMetrics = [];
    let i = 0;
    const time = moment(s);
    // start at a random point within the dataset for variety
    const randomIndex = Math.round(Math.random() * m.length);
    while (i < records) {
      const index = (randomIndex + i) % m.length; // loop if not enough data
      const requiredMetric = m[index];
      requiredMetric.time = time
        .add(15, 'seconds')
        .utc()
        .format(); // we should have a new record every 15 secs
      requiredMetrics.push(requiredMetric);
      i++;
    }

    const requiredMetricData = {
      instance: instanceId,
      name,
      start: s.utc().format(),
      end: time.utc().format(), // this will be used by the frontend for the next fetch
      metrics: requiredMetrics
    };
    metrics.push(requiredMetricData);
    return metrics;
  }, []);

  return Promise.resolve(metrics);
};

const getInstanceMetrics = ({ id }) => query =>
  getMetrics(
    Object.assign({}, query, {
      instanceId: id
    })
  );

const updateInstance = async query => {
  await delay(0.5);

  const instanceIndex = findIndex(instances, ['id', query.id]);
  const original = cleanQuery(instances[instanceIndex]);

  instances[instanceIndex] = Object.assign(
    instances[instanceIndex],
    cleanQuery(query)
  );

  emit('instance-updated', diff(original, instances[instanceIndex], 'name'));

  return instances[instanceIndex];
};

const getInstances = async query => {
  await delay(0.1);

  return instances.filter(find(cleanQuery(query))).map(instance =>
    Object.assign({}, instance, {
      metrics: getInstanceMetrics(instance)
    })
  );
};

const getInstance = async query => {
  const instance = (await getInstances(query)).shift();

  if (!instance) {
    throw Boom.notFound();
  }

  return instance;
};

// Just creates an instance, but doesn't move it out of PROVISIONING
// it doesn't append the isntance to the global list of instances
const createInstance = async (service, i) => {
  await delay(0.5);

  const _instance = {
    name: camelCase(`${service.slug}_${i || 1}`),
    deploymentGroupId: service.deploymentGroupId,
    serviceId: service.id
  };

  const instance = Object.assign({}, _instance, {
    id: hasha(JSON.stringify(_instance)),
    status: 'PROVISIONING'
  });

  emit('instance-created', instance);

  return instance;
};

// Takes a PROVISIONING instance and moves it to RUNNING
// it doesn't append the isntance to the global list of instances
const provisionInstance = async instance => {
  await delay(3);

  await updateInstance({
    id: instance.id,
    status: 'READY'
  });

  await delay(1);

  await updateInstance({
    id: instance.id,
    status: 'RUNNING'
  });

  emit('instance-provisioned', instance.id);

  return instance;
};

const stopInstance = async id => {
  const instance = await getInstance({ id });

  if (!instance) {
    return;
  }

  if (instance.status === 'STOPPED') {
    return instance;
  }

  await delay(1);

  await updateInstance({
    id,
    status: 'STOPPING'
  });

  await delay(0.5);

  await updateInstance({
    id,
    status: 'STOPPED'
  });

  emit('instance-stopped', id);

  return getInstance({ id });
};

const deleteInstance = async id => {
  const instance = await getInstance({ id });

  if (!instance) {
    return;
  }

  if (instance.status === 'DELETED') {
    return instance;
  }

  await stopInstance(id);

  await delay(1);

  await updateInstance({
    id,
    status: 'DELETED'
  });

  emit('instance-deleted', id);

  return instance;
};

const startInstance = async id => {
  const instance = await getInstance({ id });

  if (!instance) {
    return;
  }

  if (instance.status === 'RUNNING') {
    return instance;
  }

  await updateInstance({
    id,
    status: 'READY'
  });

  await delay(1);

  await updateInstance({
    id,
    status: 'RUNNING'
  });

  emit('instance-started', id);

  return instance;
};

const restartInstance = async id => {
  const instance = await getInstance({ id });

  if (!instance) {
    return;
  }

  await stopInstance(id);
  await delay(1);
  await startInstance(id);

  emit('instance-restarted', id);

  return instance;
};

const updateService = async query => {
  await delay(0.5);

  const serviceIndex = findIndex(services, ['id', query.id]);
  const original = cleanQuery(services[serviceIndex]);

  services[serviceIndex] = Object.assign(services[serviceIndex], query);

  emit('service-updated', diff(original, services[serviceIndex], 'slug'));

  return services[serviceIndex];
};

// Just creates a service, but doesn't move it out of PROVISIONING
// it doesn't append the service to the global list of services
const createService = async ({ deploymentGroupId, name }) => {
  await delay(0.5);

  const _service = {
    deploymentGroupId,
    slug: paramCase(name),
    name
  };

  const service = Object.assign({}, _service, {
    id: hasha(JSON.stringify(_service)),
    status: 'PROVISIONING'
  });

  emit('service-created', service);

  return service;
};

// Takes a PROVISIONING service and moves it to ACTIVE
// it doesn't append the service to the global list of services
// it does append the created instances to the global list of instances
const provisionService = async service => {
  const instance = await createInstance(service);

  instances.push(instance);

  await provisionInstance(instance);

  await delay(0.5);

  return updateService({
    id: service.id,
    status: 'ACTIVE'
  });
};

const deleteService = async id => {
  const service = await getService({ id });

  if (service.status !== 'DELETED') {
    await updateService({
      id,
      status: 'DELETING'
    });
  }

  const instances = await getInstances({ serviceId: id });

  await forEach(instances.map(({ id }) => id), deleteInstance);
  await delay(0.5);

  if (service.status !== 'DELETED') {
    await updateService({
      id,
      status: 'DELETED'
    });

    emit('service-deleted', id);
  }

  return getService({ id });
};

const deleteServices = ({ ids }) => {
  wait(0.5, async () => {
    await forEach(ids, deleteService);
    emit('services-deleted', ids);
  });

  return forEach(ids, id => getService({ id }));
};

const getServiceInstances = async (query, { id }) => {
  await delay(0.1);

  const filter = Object.assign({}, query, {
    serviceId: id
  });

  return (await getInstances(filter)).filter(
    ({ status }) => ['DELETED', 'EXITED'].indexOf(status) < 0
  );
};

const getBranchInstances = async (query, instanceIds) =>
  map(instanceIds, id => getInstance({ id }));

const getServiceBranches = async (query, { branches }) => {
  await delay(0.1);

  return forceArray(branches)
    .filter(find(cleanQuery(query)))
    .map(branch =>
      Object.assign({}, branch, {
        id: hasha(JSON.stringify(branch)),
        instances: query => getBranchInstances(query, branch.instances)
      })
    );
};

const getServices = async query => {
  await delay(0.1);

  const _services = services.filter(find(cleanQuery(query))).map(service =>
    Object.assign({}, service, {
      instances: query => getServiceInstances(query, service),
      branches: query => getServiceBranches(query, service)
    })
  );

  if (
    (query.id || query.name || query.slug) &&
    (!_services || !_services.length)
  ) {
    throw Boom.notFound();
  }

  return _services;
};

const getService = async query => {
  const service = (await getServices(query)).shift();

  if (!service) {
    throw Boom.notFound();
  }

  return service;
};

const restartService = async id => {
  await updateService({
    id,
    status: 'RESTARTING'
  });

  const instances = await getInstances({ serviceId: id });

  await forEach(instances.map(({ id }) => id), restartInstance);

  await updateService({
    id,
    status: 'ACTIVE'
  });

  emit('service-restarted', id);

  return getService({ id });
};

const restartServices = async ({ ids }) => {
  wait(1, async () => {
    await forEach(ids, restartService);
    emit('services-restarted', ids);
  });

  return forEach(ids, id => getService({ id }));
};

const stopService = async id => {
  const service = await getService({ id });

  if (service.status !== 'STOPPED') {
    await updateService({
      id,
      status: 'STOPPING'
    });
  }

  const instances = await getInstances({ serviceId: id });

  await forEach(instances.map(({ id }) => id), stopInstance);

  if (service.status !== 'STOPPED') {
    await updateService({
      id,
      status: 'STOPPED'
    });

    emit('service-stopped', id);
  }

  return getService({ id });
};

const stopServices = async ({ ids }) => {
  wait(1, async () => {
    await forEach(ids, stopService);
    emit('services-stopped', ids);
  });

  return forEach(ids, id => getService({ id }));
};

const startService = async id => {
  const instances = await getInstances({ serviceId: id });

  await forEach(instances.map(({ id }) => id), startInstance);
  const service = await getService({ id });

  if (service.status !== 'ACTIVE') {
    await updateService({
      id,
      status: 'ACTIVE'
    });
  }

  return getService({ id });
};

const startServices = async ({ ids }) => {
  wait(1, async () => {
    await forEach(ids, startService);
    emit('services-started', ids);
  });

  return forEach(ids, id => getService({ id }));
};

const scale = async ({ serviceId, replicas }) => {
  const service = lfind(services, ['id', serviceId]);

  const currentScale = instances.filter(
    find({
      serviceId
    })
  ).length;

  const dg = await getDeploymentGroup({ id: service.deploymentGroupId });

  if (currentScale === replicas) {
    return dg.version;
  }

  const version = {
    id: hasha(JSON.stringify({ currentScale, serviceId, replicas }))
  };

  await updateDeploymentGroup({
    id: service.deploymentGroupId,
    history: forceArray(dg.history).concat(version),
    version
  });

  await updateService({
    id: serviceId,
    status: 'SCALING'
  });

  const up = async n =>
    forEach(buildArray(n), async (_, i) => {
      const instance = await createInstance(service, currentScale + i);

      instances.push(instance);

      await delay(3);

      await updateInstance({
        id: instance.id,
        status: 'READY'
      });

      await delay(1);

      await updateInstance({
        id: instance.id,
        status: 'RUNNING'
      });
    });

  const down = async n => {
    const instances = (await getInstances({ serviceId }))
      .map(({ id }) => id)
      .slice(0, n);

    await forEach(instances, deleteInstance);
  };

  wait(1, async () => {
    const diff = replicas - currentScale;
    const fn = diff >= 0 ? up : down;

    await fn(Math.abs(diff));
    await delay(1);

    await updateService({
      id: serviceId,
      status: 'ACTIVE'
    });

    emit('service-scaled', serviceId);
  });

  return version;
};

const provisionManifest = async query => {
  const { deploymentGroupId, raw } = query;

  const version = {
    id: hasha(JSON.stringify(query)),
    type: query.type,
    format: query.format
  };

  const dg = await getDeploymentGroup({ id: deploymentGroupId });

  await updateDeploymentGroup({
    id: deploymentGroupId,
    status: 'PROVISIONING'
  });

  wait(3, async () => {
    const _services = await map(Object.keys(yaml.safeLoad(raw)), async name => {
      const service = await createService({ deploymentGroupId, name });
      services.push(service);
      return service;
    });

    await updateDeploymentGroup({
      id: deploymentGroupId,
      status: 'ACTIVE'
    });

    await forEach(_services, provisionService);

    emit('manifest-provisioned', version.id);
  });

  await updateDeploymentGroup({
    id: deploymentGroupId,
    history: forceArray(dg.history).concat(version),
    version
  });

  return version;
};

const createDeploymentGroup = async ({ name }) => {
  await delay(1);

  const _dg = {
    slug: paramCase(name),
    name
  };

  const dg = Object.assign({}, _dg, {
    id: hasha(JSON.stringify(_dg)),
    status: 'ACTIVE'
  });

  deploymentGroups.push(dg);

  emit('dg-created', dg);

  return dg;
};

const getDeploymentGroups = async query => {
  await delay(0.1);

  const addNestedResolvers = dg =>
    Object.assign({}, dg, {
      services: () => getServices({ deploymentGroupId: dg.id })
    });

  const dgs = deploymentGroups
    .filter(find(cleanQuery(query)))
    .map(addNestedResolvers);

  if ((query.ids || query.name || query.slug) && (!dgs || !dgs.length)) {
    throw Boom.notFound();
  }

  return dgs;
};

const getDeploymentGroup = async query =>
  (await getDeploymentGroups(query)).shift();

const updateDeploymentGroup = async query => {
  await delay(0.5);

  const dgIndex = findIndex(deploymentGroups, ['id', query.id]);
  const original = cleanQuery(deploymentGroups[dgIndex]);

  deploymentGroups[dgIndex] = Object.assign(deploymentGroups[dgIndex], query);

  emit('dg-updated', diff(original, deploymentGroups[dgIndex], 'slug'));

  return deploymentGroups[dgIndex];
};

const deleteDeploymentGroup = async ({ id }) => {
  const dg = await getDeploymentGroup({ id });

  await updateDeploymentGroup({
    id,
    status: 'DELETING'
  });

  wait(1, async () => {
    const services = await dg.services();

    await forEach(services.map(({ id }) => id), deleteService);

    await updateDeploymentGroup({
      id,
      status: 'DELETED'
    });

    emit('dg-deleted', id);
  });

  return getDeploymentGroup({ id });
};

const getPortal = async () => {
  await delay(0.1);

  return Object.assign({}, portal, {
    datacenter,
    deploymentGroups: getDeploymentGroups
  });
};

const parseEnvVars = (str = '') =>
  str
    .split(/\n/g)
    .filter(line => line.match(/\=/g))
    .map(line => line.split(/\=/))
    .reduce(
      (acc, [name, value]) =>
        Object.assign(acc, {
          [name.trim()]: value.trim()
        }),
      {}
    );

const findEnvInterpolation = (str = '') =>
  uniq(str.match(INTERPOLATE_REGEX).map(name => name.replace(/^\$/, '')));

const config = ({ environment = '', files = [], raw = '', _plain = false }) => {
  const interpolatableNames = findEnvInterpolation(raw);
  const interpolatableEnv = parseEnvVars(environment);

  const interpolatedRaw = interpolatableNames.reduce(
    (str = '', name) =>
      str.replace(new RegExp(`\\$${name}`), interpolatableEnv[name]),
    raw
  );

  const manifest = yaml.safeLoad(interpolatedRaw);
  const services = manifest.services || manifest;

  const config = Object.keys(services)
    .map(name =>
      Object.assign(services[name], {
        name
      })
    )
    // eslint-disable-next-line camelcase
    .map(({ name, image, env_file, environment }) => ({
      name,
      slug: paramCase(name),
      instances: [],
      config: {
        image,
        environment: forceArray(env_file).reduce(
          (env, file) =>
            Object.assign(
              env,
              parseEnvVars(lfind(files, ['name', file]).value)
            ),
          forceArray(environment)
            .map(parseEnvVars)
            .reduce(
              (genv, variable) => Object.assign(genv, variable),
              interpolatableEnv
            )
        )
      }
    }))
    .map(service =>
      Object.assign(service, {
        id: hasha(JSON.stringify(service)),
        config: Object.assign(service.config, {
          id: hasha(JSON.stringify(service.config)),
          environment: Object.keys(service.config.environment).map(name => ({
            name,
            id: hasha(JSON.stringify(service.config.environment[name])),
            value: service.config.environment[name]
          }))
        })
      })
    );

  return _plain ? config : Promise.resolve(config);
};

module.exports = {
  portal: getPortal,
  deploymentGroups: getDeploymentGroups,
  deploymentGroup: getDeploymentGroup,
  services: getServices,
  service: getService,
  instances: getInstances,
  instance: getInstance,
  createDeploymentGroup,
  config,
  provisionManifest,
  deleteDeploymentGroup,
  deleteServices,
  scale,
  restartServices,
  stopServices,
  startServices,
  getMetrics
};
