const test = require('ava');
const gql = require('graphql-tag');
const { readFile } = require('mz/fs');
const sortBy = require('lodash.sortby');
const path = require('path');
const execa = require('execa');
const IPC = require('crocket');

global.fetch = require('node-fetch');

const {
  default: ApolloClient,
  createNetworkInterface
} = require('apollo-client');

const EVENT_TYPES = [
  'manifest-provisioned',
  'instance-created',
  'instance-updated',
  'instance-provisioned',
  'instance-stopped',
  'instance-deleted',
  'instance-started',
  'instance-restarted',
  'service-updated',
  'service-created',
  'service-scaled',
  'service-deleted',
  'services-deleted',
  'service-restarted',
  'services-restarted',
  'service-stopped',
  'services-stopped',
  'service-started',
  'services-started',
  'dg-updated',
  'dg-created',
  'dg-deleted'
];

let port = 3000;
let sockPort = 2999;

const fetchTag = file =>
  readFile(path.join(__dirname, `tags/${file}.gql`), 'utf-8');

const listen = (socket, check) =>
  new Promise(resolve => {
    const events = [];
    let off = false;

    EVENT_TYPES.forEach(name =>
      socket.on(name, ({ index, payload }) => {
        // No .off API
        if (off) {
          return;
        }

        const ev = { name, index, payload };

        events.push(ev);

        if (!check(ev)) {
          return;
        }

        off = true;

        resolve(
          sortBy(events, ['index']).map(({ name, payload }) => ({
            name,
            payload
          }))
        );
      })
    );
  });

const getClient = () =>
  new Promise((resolve, reject) => {
    const sock = new IPC();

    // eslint-disable-next-line no-multi-assign
    const _port = (port += 1);
    // eslint-disable-next-line no-multi-assign
    const _sockPort = (sockPort -= 1);

    sock._sockPort = _sockPort;

    // eslint-disable-next-line no-console
    console.error('spawning node', {
      _port,
      _sockPort,
      pid: process.pid
    });

    const server = execa('node', ['.'], {
      stdio: 'pipe',
      cwd: path.join(__dirname, '..'),
      env: {
        PORT: _port,
        SOCK_PORT: _sockPort
      }
    });

    const client = new ApolloClient({
      networkInterface: createNetworkInterface({
        uri: `http://localhost:${port}/api/graphql`
      })
    });

    server.stdout.on('data', d => {
      if (!/server started at /.test(d)) {
        return;
      }

      sock.connect({ port: _sockPort }, err => {
        if (err) {
          return reject(err);
        }

        // eslint-disable-next-line no-console
        console.log('sock connected to %d', _sockPort);

        resolve(
          Object.assign(client, {
            sock,
            _sockPort,
            kill: () => {
              // eslint-disable-next-line no-console
              console.error('closing server & client', {
                _port,
                _sockPort,
                pid: process.pid
              });

              server.kill();
              sock.close();
            }
          })
        );
      });
    });

    server.stdout.pipe(process.stdout);
    server.stderr.pipe(process.stderr);
  });

test('getPortal', async t => {
  const client = await getClient();

  const res = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups'))
  });

  t.snapshot(JSON.stringify(res.data, null, 2));

  client.kill();
});

test('getDeploymentGroups', async t => {
  const client = await getClient();

  const res = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-direct'))
  });

  t.snapshot(JSON.stringify(res.data, null, 2));

  client.kill();
});

test('getDeploymentGroup', async t => {
  const client = await getClient();

  const res = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-group-direct')),
    variables: {
      id: 'e0ea0c02-55cc-45fe-8064-3e5176a59401'
    }
  });

  t.snapshot(JSON.stringify(res.data, null, 2));

  client.kill();
});

test('getServices', async t => {
  const client = await getClient();

  const res = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('services-direct'))
  });

  t.snapshot(JSON.stringify(res.data, null, 2));

  client.kill();
});

test('getService', async t => {
  const client = await getClient();

  const res = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('service-direct-filtered')),
    variables: {
      id: '6d31aff4-de1e-4042-a983-fbd23d5c530c'
    }
  });

  t.snapshot(JSON.stringify(res.data, null, 2));

  client.kill();
});

test('getInstances', async t => {
  const client = await getClient();

  const res = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('instances-direct'))
  });

  t.snapshot(JSON.stringify(res.data, null, 2));

  client.kill();
});

test('getInstance', async t => {
  const client = await getClient();

  const res = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('instance-direct-filtered')),
    variables: {
      id: '25f6bc62-63b8-4959-908e-1f6d7ff6341d'
    }
  });

  t.snapshot(JSON.stringify(res.data, null, 2));

  client.kill();
});

test('should return everything', async t => {
  const client = await getClient();

  const res = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('all'))
  });

  t.snapshot(JSON.stringify(res.data, null, 2));

  client.kill();
});

test('should return only Portal', async t => {
  const client = await getClient();

  const res = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('portal-only'))
  });

  t.snapshot(JSON.stringify(res.data, null, 2));

  client.kill();
});

test("should return DeploymentGroup's", async t => {
  const client = await getClient();

  const dgs = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups'))
  });

  const dgsDirect = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-direct'))
  });

  t.snapshot(JSON.stringify(dgs.data, null, 2));
  t.snapshot(JSON.stringify(dgsDirect.data, null, 2));

  client.kill();
});

test("should return filtered DeploymentGroup's", async t => {
  const client = await getClient();

  const dgs = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'wordpress-blog-example'
    }
  });

  const dgsDirect = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-direct-filtered')),
    variables: {
      slug: 'wordpress-blog-example'
    }
  });

  t.snapshot(JSON.stringify(dgs.data, null, 2));
  t.snapshot(JSON.stringify(dgsDirect.data, null, 2));

  client.kill();
});

test('should return services', async t => {
  const client = await getClient();

  const services = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('services'))
  });

  const servicesDirect = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('services-direct'))
  });

  t.snapshot(JSON.stringify(services.data, null, 2));
  t.snapshot(JSON.stringify(servicesDirect.data, null, 2));

  client.kill();
});

test('should return filtered services', async t => {
  const client = await getClient();

  const services = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('services-filtered')),
    variables: {
      dgSlug: 'wordpress-blog-example',
      sSlug: 'nginx'
    }
  });

  const servicesDirect = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('services-direct-filtered')),
    variables: {
      sSlug: 'nginx'
    }
  });

  t.snapshot(JSON.stringify(services.data, null, 2));
  t.snapshot(JSON.stringify(servicesDirect.data, null, 2));

  client.kill();
});

test('should return instances', async t => {
  const client = await getClient();

  const instances = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('instances'))
  });

  const instancesDirect = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('instances-direct'))
  });

  t.snapshot(JSON.stringify(instances.data, null, 2));
  t.snapshot(JSON.stringify(instancesDirect.data, null, 2));

  client.kill();
});

test('should return filtered instances', async t => {
  const client = await getClient();

  const instances = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('instances-filtered')),
    variables: {
      dgSlug: 'cpexample',
      sSlug: 'mysql',
      iName: 'mysql-2',
      biName: 'mysql-1'
    }
  });

  const instancesDirect = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('instances-direct-filtered')),
    variables: {
      dgSlug: 'cpexample',
      sSlug: 'mysql',
      iName: 'mysql-2',
      biName: 'mysql-1'
    }
  });

  t.snapshot(JSON.stringify(instances.data, null, 2));
  t.snapshot(JSON.stringify(instancesDirect.data, null, 2));

  client.kill();
});

test('should create DeploymentGroup', async t => {
  const client = await getClient();

  const created = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('create-deployment-group')),
    variables: {
      name: 'test'
    }
  });

  const dgs = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups'))
  });

  const dgsDirect = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-direct'))
  });

  const fDgs = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test'
    }
  });

  const fDgsDirect = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-direct-filtered')),
    variables: {
      slug: 'test'
    }
  });

  t.snapshot(JSON.stringify(created.data, null, 2));
  t.snapshot(JSON.stringify(dgs.data, null, 2));
  t.snapshot(JSON.stringify(dgsDirect.data, null, 2));
  t.snapshot(JSON.stringify(fDgs.data, null, 2));
  t.snapshot(JSON.stringify(fDgsDirect.data, null, 2));

  client.kill();
});

test('should provisionManifest', async t => {
  const client = await getClient();

  const created = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('create-deployment-group')),
    variables: {
      name: 'test1'
    }
  });

  const dgsBeforeProvision = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test1'
    }
  });

  const version = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('provision-manifest')),
    variables: {
      deploymentGroupId: created.data.createDeploymentGroup.id,
      type: 'COMPOSE',
      format: 'YAML',
      environment: {},
      files: [],
      raw: `
        redis:
          image: redis:latest
        nginx:
          image: nginx:latest
      `
    }
  });

  const provisionEvents = await listen(
    client.sock,
    ({ name, payload }) =>
      name === 'manifest-provisioned' &&
      payload === version.data.provisionManifest.id
  );

  const dgsAfterProvision = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test1'
    }
  });

  t.snapshot(JSON.stringify(dgsBeforeProvision.data, null, 2));
  t.snapshot(JSON.stringify(provisionEvents, null, 2));
  t.snapshot(JSON.stringify(dgsAfterProvision.data, null, 2));

  client.kill();
});

test('should delete DeploymentGroup', async t => {
  const client = await getClient();

  const created = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('create-deployment-group')),
    variables: {
      name: 'test2'
    }
  });

  await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test2'
    }
  });

  const version = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('provision-manifest')),
    variables: {
      deploymentGroupId: created.data.createDeploymentGroup.id,
      type: 'COMPOSE',
      format: 'YAML',
      environment: {},
      files: [],
      raw: `
        redis:
          image: redis:latest
        nginx:
          image: nginx:latest
      `
    }
  });

  await listen(
    client.sock,
    ({ name, payload }) =>
      name === 'manifest-provisioned' &&
      payload === version.data.provisionManifest.id
  );

  const dgsAfterProvision = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test2'
    }
  });

  await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('delete-deployment-group')),
    variables: {
      id: created.data.createDeploymentGroup.id
    }
  });

  const deleteDgEvents = await listen(
    client.sock,
    ({ name, payload }) =>
      name === 'dg-deleted' && payload === created.data.createDeploymentGroup.id
  );

  const dgsAfterDelete = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test2'
    }
  });

  t.snapshot(JSON.stringify(dgsAfterProvision.data, null, 2));
  t.snapshot(JSON.stringify(deleteDgEvents, null, 2));
  t.snapshot(JSON.stringify(dgsAfterDelete.data, null, 2));

  client.kill();
});

test('should scale up', async t => {
  const client = await getClient();

  const created = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('create-deployment-group')),
    variables: {
      name: 'test3'
    }
  });

  await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test3'
    }
  });

  const version = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('provision-manifest')),
    variables: {
      deploymentGroupId: created.data.createDeploymentGroup.id,
      type: 'COMPOSE',
      format: 'YAML',
      environment: {},
      files: [],
      raw: `
        redis:
          image: redis:latest
        nginx:
          image: nginx:latest
      `
    }
  });

  await listen(
    client.sock,
    ({ name, payload }) =>
      name === 'manifest-provisioned' &&
      payload === version.data.provisionManifest.id
  );

  const dgsAfterProvision = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test3'
    }
  });

  const serviceId =
    dgsAfterProvision.data.portal.deploymentGroups[0].services[0].id;

  await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('scale')),
    variables: {
      serviceId,
      replicas: 10
    }
  });

  const scaleEvents = await listen(
    client.sock,
    ({ name, payload }) => name === 'service-scaled' && payload === serviceId
  );

  const dgsAfterScale = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test3'
    }
  });

  t.snapshot(JSON.stringify(dgsAfterProvision.data, null, 2));
  t.snapshot(JSON.stringify(scaleEvents, null, 2));
  t.snapshot(JSON.stringify(dgsAfterScale.data, null, 2));

  client.kill();
});

test('should scale down', async t => {
  const client = await getClient();

  const created = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('create-deployment-group')),
    variables: {
      name: 'test4'
    }
  });

  await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test4'
    }
  });

  const version = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('provision-manifest')),
    variables: {
      deploymentGroupId: created.data.createDeploymentGroup.id,
      type: 'COMPOSE',
      format: 'YAML',
      environment: {},
      files: [],
      raw: `
        redis:
          image: redis:latest
        nginx:
          image: nginx:latest
      `
    }
  });

  await listen(
    client.sock,
    ({ name, payload }) =>
      name === 'manifest-provisioned' &&
      payload === version.data.provisionManifest.id
  );

  const dgsAfterProvision = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test4'
    }
  });

  const serviceId =
    dgsAfterProvision.data.portal.deploymentGroups[0].services[0].id;

  await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('scale')),
    variables: {
      serviceId,
      replicas: 10
    }
  });

  await listen(
    client.sock,
    ({ name, payload }) => name === 'service-scaled' && payload === serviceId
  );

  const dgsAfterScaleUp = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test4'
    }
  });

  await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('scale')),
    variables: {
      serviceId,
      replicas: 7
    }
  });

  const scaleDownEvents = await listen(
    client.sock,
    ({ name, payload }) => name === 'service-scaled' && payload === serviceId
  );

  const dgsAfterScaleDown = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test4'
    }
  });

  t.snapshot(JSON.stringify(dgsAfterScaleUp.data, null, 2));
  t.snapshot(JSON.stringify(scaleDownEvents, null, 2));
  t.snapshot(JSON.stringify(dgsAfterScaleDown.data, null, 2));

  client.kill();
});

test("shouldn't scale", async t => {
  const client = await getClient();

  const created = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('create-deployment-group')),
    variables: {
      name: 'test10'
    }
  });

  await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test10'
    }
  });

  const version = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('provision-manifest')),
    variables: {
      deploymentGroupId: created.data.createDeploymentGroup.id,
      type: 'COMPOSE',
      format: 'YAML',
      environment: {},
      files: [],
      raw: `
        redis:
          image: redis:latest
        nginx:
          image: nginx:latest
      `
    }
  });

  await listen(
    client.sock,
    ({ name, payload }) =>
      name === 'manifest-provisioned' &&
      payload === version.data.provisionManifest.id
  );

  const dgsAfterProvision = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test10'
    }
  });

  const serviceId =
    dgsAfterProvision.data.portal.deploymentGroups[0].services[0].id;

  const scaleUpVersion = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('scale')),
    variables: {
      serviceId,
      replicas: 10
    }
  });

  await listen(
    client.sock,
    ({ name, payload }) => name === 'service-scaled' && payload === serviceId
  );

  const dgsAfterScaleUp = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test10'
    }
  });

  const scaleEqVersion = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('scale')),
    variables: {
      serviceId,
      replicas: 10
    }
  });

  const dgsAfterScaleEq = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test10'
    }
  });

  t.deepEqual(scaleUpVersion.data, scaleEqVersion.data);
  t.deepEqual(dgsAfterScaleUp.data, dgsAfterScaleEq.data);

  client.kill();
});

test("should delete Service's", async t => {
  const client = await getClient();

  const created = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('create-deployment-group')),
    variables: {
      name: 'test5'
    }
  });

  await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test5'
    }
  });

  const version = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('provision-manifest')),
    variables: {
      deploymentGroupId: created.data.createDeploymentGroup.id,
      type: 'COMPOSE',
      format: 'YAML',
      environment: {},
      files: [],
      raw: `
        redis:
          image: redis:latest
        nginx:
          image: nginx:latest
      `
    }
  });

  await listen(
    client.sock,
    ({ name, payload }) =>
      name === 'manifest-provisioned' &&
      payload === version.data.provisionManifest.id
  );

  const dgsAfterProvision = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test5'
    }
  });

  const serviceIds = dgsAfterProvision.data.portal.deploymentGroups
    .filter(({ id }) => id === created.data.createDeploymentGroup.id)[0]
    .services.map(({ id }) => id);

  await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('delete-services')),
    variables: {
      ids: serviceIds
    }
  });

  const deleteServicesEvents = await listen(
    client.sock,
    ({ name, payload }) =>
      name === 'services-deleted' &&
      serviceIds.every(id => payload.indexOf(id) >= 0)
  );

  const dgsAfterDelete = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test5'
    }
  });

  t.snapshot(JSON.stringify(dgsAfterProvision.data, null, 2));
  t.snapshot(JSON.stringify(deleteServicesEvents, null, 2));
  t.snapshot(JSON.stringify(dgsAfterDelete.data, null, 2));

  client.kill();
});

test("shouldn't delete Service's twice", async t => {
  const client = await getClient();

  const created = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('create-deployment-group')),
    variables: {
      name: 'test5'
    }
  });

  await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test5'
    }
  });

  const version = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('provision-manifest')),
    variables: {
      deploymentGroupId: created.data.createDeploymentGroup.id,
      type: 'COMPOSE',
      format: 'YAML',
      environment: {},
      files: [],
      raw: `
        redis:
          image: redis:latest
        nginx:
          image: nginx:latest
      `
    }
  });

  await listen(
    client.sock,
    ({ name, payload }) =>
      name === 'manifest-provisioned' &&
      payload === version.data.provisionManifest.id
  );

  const dgsAfterProvision = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test5'
    }
  });

  const serviceIds = dgsAfterProvision.data.portal.deploymentGroups
    .filter(({ id }) => id === created.data.createDeploymentGroup.id)[0]
    .services.map(({ id }) => id);

  await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('delete-services')),
    variables: {
      ids: serviceIds
    }
  });

  const deleteServicesEvents = await listen(
    client.sock,
    ({ name, payload }) =>
      name === 'services-deleted' &&
      serviceIds.every(id => payload.indexOf(id) >= 0)
  );

  const dgsAfterDelete = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test5'
    }
  });

  await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('delete-services')),
    variables: {
      ids: serviceIds
    }
  });

  const deleteServicesAgainEvents = await listen(
    client.sock,
    ({ name, payload }) =>
      name === 'services-deleted' &&
      serviceIds.every(id => payload.indexOf(id) >= 0)
  );

  const dgsAfterDeleteAgain = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test5'
    }
  });

  t.snapshot(JSON.stringify(dgsAfterProvision.data, null, 2));
  t.snapshot(JSON.stringify(deleteServicesEvents, null, 2));
  t.snapshot(JSON.stringify(dgsAfterDelete.data, null, 2));
  t.snapshot(JSON.stringify(deleteServicesAgainEvents, null, 2));
  t.snapshot(JSON.stringify(dgsAfterDeleteAgain.data, null, 2));

  client.kill();
});

test("should restart Service's", async t => {
  const client = await getClient();

  const created = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('create-deployment-group')),
    variables: {
      name: 'test6'
    }
  });

  await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test6'
    }
  });

  const version = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('provision-manifest')),
    variables: {
      deploymentGroupId: created.data.createDeploymentGroup.id,
      type: 'COMPOSE',
      format: 'YAML',
      environment: {},
      files: [],
      raw: `
        redis:
          image: redis:latest
        nginx:
          image: nginx:latest
      `
    }
  });

  await listen(
    client.sock,
    ({ name, payload }) =>
      name === 'manifest-provisioned' &&
      payload === version.data.provisionManifest.id
  );

  const dgsAfterProvision = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test6'
    }
  });

  const serviceIds = dgsAfterProvision.data.portal.deploymentGroups
    .filter(({ id }) => id === created.data.createDeploymentGroup.id)[0]
    .services.map(({ id }) => id);

  await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('restart-services')),
    variables: {
      ids: serviceIds
    }
  });

  const restartEvents = await listen(
    client.sock,
    ({ name, payload }) =>
      name === 'services-restarted' &&
      serviceIds.every(id => payload.indexOf(id) >= 0)
  );

  const dgsAfterRestart = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test6'
    }
  });

  t.snapshot(JSON.stringify(dgsAfterProvision.data, null, 2));
  t.snapshot(JSON.stringify(restartEvents, null, 2));
  t.snapshot(JSON.stringify(dgsAfterRestart.data, null, 2));

  client.kill();
});

test("should stop Service's", async t => {
  const client = await getClient();

  const created = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('create-deployment-group')),
    variables: {
      name: 'test7'
    }
  });

  await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test7'
    }
  });

  const version = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('provision-manifest')),
    variables: {
      deploymentGroupId: created.data.createDeploymentGroup.id,
      type: 'COMPOSE',
      format: 'YAML',
      environment: {},
      files: [],
      raw: `
        redis:
          image: redis:latest
        nginx:
          image: nginx:latest
      `
    }
  });

  await listen(
    client.sock,
    ({ name, payload }) =>
      name === 'manifest-provisioned' &&
      payload === version.data.provisionManifest.id
  );

  const dgsAfterProvision = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test7'
    }
  });

  const serviceIds = dgsAfterProvision.data.portal.deploymentGroups
    .filter(({ id }) => id === created.data.createDeploymentGroup.id)[0]
    .services.map(({ id }) => id);

  await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('stop-services')),
    variables: {
      ids: serviceIds
    }
  });

  const stopEvents = await listen(
    client.sock,
    ({ name, payload }) =>
      name === 'services-stopped' &&
      serviceIds.every(id => payload.indexOf(id) >= 0)
  );

  const dgsAfterStop = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test7'
    }
  });

  t.snapshot(JSON.stringify(dgsAfterProvision.data, null, 2));
  t.snapshot(JSON.stringify(stopEvents, null, 2));
  t.snapshot(JSON.stringify(dgsAfterStop.data, null, 2));

  client.kill();
});

test("shouldn't stop Service's twice", async t => {
  const client = await getClient();

  const created = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('create-deployment-group')),
    variables: {
      name: 'test9'
    }
  });

  await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test9'
    }
  });

  const version = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('provision-manifest')),
    variables: {
      deploymentGroupId: created.data.createDeploymentGroup.id,
      type: 'COMPOSE',
      format: 'YAML',
      environment: {},
      files: [],
      raw: `
        redis:
          image: redis:latest
        nginx:
          image: nginx:latest
      `
    }
  });

  await listen(
    client.sock,
    ({ name, payload }) =>
      name === 'manifest-provisioned' &&
      payload === version.data.provisionManifest.id
  );

  const dgsAfterProvision = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test9'
    }
  });

  const serviceIds = dgsAfterProvision.data.portal.deploymentGroups
    .filter(({ id }) => id === created.data.createDeploymentGroup.id)[0]
    .services.map(({ id }) => id);

  await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('stop-services')),
    variables: {
      ids: serviceIds
    }
  });

  const stopEventsBefore = await listen(
    client.sock,
    ({ name, payload }) =>
      name === 'services-stopped' &&
      serviceIds.every(id => payload.indexOf(id) >= 0)
  );

  const dgsAfterStop = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test9'
    }
  });

  await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('stop-services')),
    variables: {
      ids: serviceIds
    }
  });

  const stopEventsAfter = await listen(
    client.sock,
    ({ name, payload }) =>
      name === 'services-stopped' &&
      serviceIds.every(id => payload.indexOf(id) >= 0)
  );

  const dgsAfterStopAgain = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test9'
    }
  });

  t.snapshot(JSON.stringify(dgsAfterProvision.data, null, 2));
  t.snapshot(JSON.stringify(stopEventsBefore, null, 2));
  t.snapshot(JSON.stringify(dgsAfterStop.data, null, 2));
  t.snapshot(JSON.stringify(stopEventsAfter, null, 2));
  t.snapshot(JSON.stringify(dgsAfterStopAgain.data, null, 2));

  client.kill();
});

test("should start Service's", async t => {
  const client = await getClient();

  const created = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('create-deployment-group')),
    variables: {
      name: 'test8'
    }
  });

  await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test8'
    }
  });

  const version = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('provision-manifest')),
    variables: {
      deploymentGroupId: created.data.createDeploymentGroup.id,
      type: 'COMPOSE',
      format: 'YAML',
      environment: {},
      files: [],
      raw: `
        redis:
          image: redis:latest
        nginx:
          image: nginx:latest
      `
    }
  });

  await listen(
    client.sock,
    ({ name, payload }) =>
      name === 'manifest-provisioned' &&
      payload === version.data.provisionManifest.id
  );

  const dgsAfterProvision = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test8'
    }
  });

  const serviceIds = dgsAfterProvision.data.portal.deploymentGroups
    .filter(({ id }) => id === created.data.createDeploymentGroup.id)[0]
    .services.map(({ id }) => id);

  await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('start-services')),
    variables: {
      ids: serviceIds
    }
  });

  const startEvents = await listen(
    client.sock,
    ({ name, payload }) =>
      name === 'services-started' &&
      serviceIds.every(id => payload.indexOf(id) >= 0)
  );

  const dgsAfterStart = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test8'
    }
  });

  t.snapshot(JSON.stringify(dgsAfterProvision.data, null, 2));
  t.snapshot(JSON.stringify(startEvents, null, 2));
  t.snapshot(JSON.stringify(dgsAfterStart.data, null, 2));

  client.kill();
});

test("shouldn't start Service's twice", async t => {
  const client = await getClient();

  const created = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('create-deployment-group')),
    variables: {
      name: 'test10'
    }
  });

  await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test10'
    }
  });

  const version = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('provision-manifest')),
    variables: {
      deploymentGroupId: created.data.createDeploymentGroup.id,
      type: 'COMPOSE',
      format: 'YAML',
      environment: {},
      files: [],
      raw: `
        redis:
          image: redis:latest
        nginx:
          image: nginx:latest
      `
    }
  });

  await listen(
    client.sock,
    ({ name, payload }) =>
      name === 'manifest-provisioned' &&
      payload === version.data.provisionManifest.id
  );

  const dgsAfterProvision = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test10'
    }
  });

  const serviceIds = dgsAfterProvision.data.portal.deploymentGroups
    .filter(({ id }) => id === created.data.createDeploymentGroup.id)[0]
    .services.map(({ id }) => id);

  await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('stop-services')),
    variables: {
      ids: serviceIds
    }
  });

  await listen(
    client.sock,
    ({ name, payload }) =>
      name === 'services-stopped' &&
      serviceIds.every(id => payload.indexOf(id) >= 0)
  );

  const dgsAfterStop = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test10'
    }
  });

  await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('start-services')),
    variables: {
      ids: serviceIds
    }
  });

  const startEvents = await listen(
    client.sock,
    ({ name, payload }) =>
      name === 'services-started' &&
      serviceIds.every(id => payload.indexOf(id) >= 0)
  );

  const dgsAfterStart = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test10'
    }
  });

  await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('start-services')),
    variables: {
      ids: serviceIds
    }
  });

  const startAgainEvents = await listen(
    client.sock,
    ({ name, payload }) =>
      name === 'services-started' &&
      serviceIds.every(id => payload.indexOf(id) >= 0)
  );

  const dgsAfterStartAgain = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test10'
    }
  });

  t.snapshot(JSON.stringify(dgsAfterStop.data, null, 2));
  t.snapshot(JSON.stringify(startEvents, null, 2));
  t.snapshot(JSON.stringify(dgsAfterStart.data, null, 2));
  t.snapshot(JSON.stringify(startAgainEvents, null, 2));
  t.snapshot(JSON.stringify(dgsAfterStartAgain.data, null, 2));

  client.kill();
});
