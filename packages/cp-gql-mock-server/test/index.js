const test = require('ava');
const gql = require('graphql-tag');
const { readFile } = require('mz/fs');
const path = require('path');
const execa = require('execa');
const wait = require('delay');

const {
  default: ApolloClient,
  createNetworkInterface
} = require('apollo-client');

let port = 3000;

const fetchTag = file =>
  readFile(path.join(__dirname, `tags/${file}.gql`), 'utf-8');

const getClient = () =>
  new Promise((resolve, reject) => {
    const server = execa('node', ['.'], {
      stdio: 'pipe',
      cwd: path.join(__dirname, '..'),
      env: {
        PORT: (port += 1)
      }
    });

    const client = new ApolloClient({
      networkInterface: createNetworkInterface({
        uri: `http://localhost:${port}/api/graphql`
      })
    });

    server.stdout.on('data', d => {
      if (/server started at /.test(d)) {
        resolve(client);
      }
    });

    server.stdout.pipe(process.stdout);
    server.stderr.pipe(process.stderr);
  });

test('should return everything', async t => {
  const client = await getClient();

  const res = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('all'))
  });

  t.snapshot(JSON.stringify(res.data, null, 2));
});

test('should return only Portal', async t => {
  const client = await getClient();

  const res = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('portal-only'))
  });

  t.snapshot(JSON.stringify(res.data, null, 2));
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
});

test('should delete DeploymentGroup', async t => {
  const client = await getClient();

  const created = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('create-deployment-group')),
    variables: {
      name: 'test1'
    }
  });

  const dgsBefore = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups'))
  });

  const dgsDirectBefore = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-direct'))
  });

  const fDgsBefore = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test1'
    }
  });

  const fDgsDirectBefore = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-direct-filtered')),
    variables: {
      slug: 'test1'
    }
  });

  t.snapshot(JSON.stringify(created.data, null, 2));
  t.snapshot(JSON.stringify(dgsBefore.data, null, 2));
  t.snapshot(JSON.stringify(dgsDirectBefore.data, null, 2));
  t.snapshot(JSON.stringify(fDgsBefore.data, null, 2));
  t.snapshot(JSON.stringify(fDgsDirectBefore.data, null, 2));

  await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('delete-deployment-group')),
    variables: {
      id: created.data.createDeploymentGroup.id
    }
  });

  const dgsAfter = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups'))
  });

  const dgsDirectAfter = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-direct'))
  });

  const fDgsAfter = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test1'
    }
  });

  const fDgsDirectAfter = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-direct-filtered')),
    variables: {
      slug: 'test1'
    }
  });

  t.snapshot(JSON.stringify(dgsAfter.data, null, 2));
  t.snapshot(JSON.stringify(dgsDirectAfter.data, null, 2));
  t.snapshot(JSON.stringify(fDgsAfter.data, null, 2));
  t.snapshot(JSON.stringify(fDgsDirectAfter.data, null, 2));
});

test('should provisionManifest', async t => {
  const client = await getClient();

  const dg = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('create-deployment-group')),
    variables: {
      name: 'test2'
    }
  });

  const provision = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('provision-manifest')),
    variables: {
      deploymentGroupId: dg.data.createDeploymentGroup.id,
      type: 'COMPOSE',
      format: 'YAML',
      environment: {},
      files: [],
      raw: `
        redis:
          image: redis:latest
      `
    }
  });

  const dgs = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test2'
    }
  });

  t.snapshot(JSON.stringify(dg.data, null, 2));
  t.snapshot(JSON.stringify(provision.data, null, 2));
  t.snapshot(JSON.stringify(dgs.data, null, 2));
});

test('should scale up', async t => {
  const client = await getClient();

  const dg = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('create-deployment-group')),
    variables: {
      name: 'test3'
    }
  });

  const provision = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('provision-manifest')),
    variables: {
      deploymentGroupId: dg.data.createDeploymentGroup.id,
      type: 'COMPOSE',
      format: 'YAML',
      environment: {},
      files: [],
      raw: `
        redis:
          image: redis:latest
      `
    }
  });

  const dgsBefore = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test3'
    }
  });

  await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('scale')),
    variables: {
      serviceId: dgsBefore.data.portal.deploymentGroups[0].services[0].id,
      replicas: 10
    }
  });

  await wait(3100);

  const dgsAfter = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test3'
    }
  });

  t.snapshot(JSON.stringify(dg.data, null, 2));
  t.snapshot(JSON.stringify(provision.data, null, 2));
  t.snapshot(JSON.stringify(dgsBefore.data, null, 2));
  t.snapshot(JSON.stringify(dgsAfter.data, null, 2));
});

test('should scale down', async t => {
  const client = await getClient();

  const dg = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('create-deployment-group')),
    variables: {
      name: 'test4'
    }
  });

  const provision = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('provision-manifest')),
    variables: {
      deploymentGroupId: dg.data.createDeploymentGroup.id,
      type: 'COMPOSE',
      format: 'YAML',
      environment: {},
      files: [],
      raw: `
        redis:
          image: redis:latest
      `
    }
  });

  const dgs = await client.query({
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
      serviceId: dgs.data.portal.deploymentGroups[0].services[0].id,
      replicas: 10
    }
  });

  await wait(3100);

  const dgsBefore = await client.query({
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
      serviceId: dgs.data.portal.deploymentGroups[0].services[0].id,
      replicas: 7
    }
  });

  await wait(3100);

  const dgsAfter = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-filtered')),
    variables: {
      slug: 'test4'
    }
  });

  t.snapshot(JSON.stringify(dg.data, null, 2));
  t.snapshot(JSON.stringify(provision.data, null, 2));
  t.snapshot(JSON.stringify(dgs.data, null, 2));
  t.snapshot(JSON.stringify(dgsBefore.data, null, 2));
  t.snapshot(JSON.stringify(dgsAfter.data, null, 2));
});

test("should delete Service's", async t => {
  const client = await getClient();

  const dgsInitial = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-direct-filtered')),
    variables: {
      slug: 'test5'
    }
  });

  const dg = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('create-deployment-group')),
    variables: {
      name: 'test5'
    }
  });

  await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('provision-manifest')),
    variables: {
      deploymentGroupId: dg.data.createDeploymentGroup.id,
      type: 'COMPOSE',
      format: 'YAML',
      environment: {},
      files: [],
      raw: `
        redis:
          image: redis:latest
      `
    }
  });

  const dgsBefore = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-direct-filtered')),
    variables: {
      slug: 'test5'
    }
  });

  const deleted = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('delete-services')),
    variables: {
      ids: dgsBefore.data.deploymentGroups
        .filter(({ id }) => id === dg.data.createDeploymentGroup.id)[0]
        .services.map(({ id }) => id)
    }
  });

  await wait(5100);

  const dgsAfter = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-direct-filtered')),
    variables: {
      slug: 'test5'
    }
  });

  t.snapshot(JSON.stringify(dgsInitial.data, null, 2));
  t.snapshot(JSON.stringify(dg.data, null, 2));
  t.snapshot(JSON.stringify(dgsBefore.data, null, 2));
  t.snapshot(JSON.stringify(deleted.data, null, 2));
  t.snapshot(JSON.stringify(dgsAfter.data, null, 2));
});

test("should restart Service's", async t => {
  const client = await getClient();

  const dgsInitial = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-direct-filtered')),
    variables: {
      slug: 'test6'
    }
  });

  const dg = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('create-deployment-group')),
    variables: {
      name: 'test6'
    }
  });

  await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('provision-manifest')),
    variables: {
      deploymentGroupId: dg.data.createDeploymentGroup.id,
      type: 'COMPOSE',
      format: 'YAML',
      environment: {},
      files: [],
      raw: `
        redis:
          image: redis:latest
      `
    }
  });

  const dgsBefore = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-direct-filtered')),
    variables: {
      slug: 'test6'
    }
  });

  const restarted = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('restart-services')),
    variables: {
      ids: dgsBefore.data.deploymentGroups
        .filter(({ id }) => id === dg.data.createDeploymentGroup.id)[0]
        .services.map(({ id }) => id)
    }
  });

  const dgsWhile = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-direct-filtered')),
    variables: {
      slug: 'test6'
    }
  });

  await wait(5100);

  const dgsAfter = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-direct-filtered')),
    variables: {
      slug: 'test6'
    }
  });

  t.snapshot(JSON.stringify(dgsInitial.data, null, 2));
  t.snapshot(JSON.stringify(dg.data, null, 2));
  t.snapshot(JSON.stringify(dgsBefore.data, null, 2));
  t.snapshot(JSON.stringify(restarted.data, null, 2));
  t.snapshot(JSON.stringify(dgsWhile.data, null, 2));
  t.snapshot(JSON.stringify(dgsAfter.data, null, 2));
});

test("should stop Service's", async t => {
  const client = await getClient();

  const dgsInitial = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-direct-filtered')),
    variables: {
      slug: 'test7'
    }
  });

  const dg = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('create-deployment-group')),
    variables: {
      name: 'test7'
    }
  });

  await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('provision-manifest')),
    variables: {
      deploymentGroupId: dg.data.createDeploymentGroup.id,
      type: 'COMPOSE',
      format: 'YAML',
      environment: {},
      files: [],
      raw: `
        redis:
          image: redis:latest
      `
    }
  });

  const dgsBefore = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-direct-filtered')),
    variables: {
      slug: 'test7'
    }
  });

  const stopped = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('stop-services')),
    variables: {
      ids: dgsBefore.data.deploymentGroups
        .filter(({ id }) => id === dg.data.createDeploymentGroup.id)[0]
        .services.map(({ id }) => id)
    }
  });

  const dgsWhile = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-direct-filtered')),
    variables: {
      slug: 'test7'
    }
  });

  await wait(5100);

  const dgsAfter = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-direct-filtered')),
    variables: {
      slug: 'test7'
    }
  });

  t.snapshot(JSON.stringify(dgsInitial.data, null, 2));
  t.snapshot(JSON.stringify(dg.data, null, 2));
  t.snapshot(JSON.stringify(dgsBefore.data, null, 2));
  t.snapshot(JSON.stringify(stopped.data, null, 2));
  t.snapshot(JSON.stringify(dgsWhile.data, null, 2));
  t.snapshot(JSON.stringify(dgsAfter.data, null, 2));
});

test("should start Service's", async t => {
  const client = await getClient();

  const dgsInitial = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-direct-filtered')),
    variables: {
      slug: 'test7'
    }
  });

  const dg = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('create-deployment-group')),
    variables: {
      name: 'test7'
    }
  });

  await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('provision-manifest')),
    variables: {
      deploymentGroupId: dg.data.createDeploymentGroup.id,
      type: 'COMPOSE',
      format: 'YAML',
      environment: {},
      files: [],
      raw: `
        redis:
          image: redis:latest
      `
    }
  });

  const dgsBeforeStop = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-direct-filtered')),
    variables: {
      slug: 'test7'
    }
  });

  const stopped = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('stop-services')),
    variables: {
      ids: dgsBeforeStop.data.deploymentGroups
        .filter(({ id }) => id === dg.data.createDeploymentGroup.id)[0]
        .services.map(({ id }) => id)
    }
  });

  const dgsWhileStop = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-direct-filtered')),
    variables: {
      slug: 'test7'
    }
  });

  await wait(5100);

  const dgsAfterStop = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-direct-filtered')),
    variables: {
      slug: 'test7'
    }
  });

  const started = await client.mutate({
    fetchPolicy: 'network-only',
    mutation: gql(await fetchTag('start-services')),
    variables: {
      ids: dgsBeforeStop.data.deploymentGroups
        .filter(({ id }) => id === dg.data.createDeploymentGroup.id)[0]
        .services.map(({ id }) => id)
    }
  });

  const dgsWhileStart = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-direct-filtered')),
    variables: {
      slug: 'test7'
    }
  });

  await wait(5100);

  const dgsAfterStart = await client.query({
    fetchPolicy: 'network-only',
    query: gql(await fetchTag('deployment-groups-direct-filtered')),
    variables: {
      slug: 'test7'
    }
  });

  t.snapshot(JSON.stringify(dgsInitial.data, null, 2));
  t.snapshot(JSON.stringify(dg.data, null, 2));
  t.snapshot(JSON.stringify(dgsBeforeStop.data, null, 2));
  t.snapshot(JSON.stringify(stopped.data, null, 2));
  t.snapshot(JSON.stringify(dgsWhileStop.data, null, 2));
  t.snapshot(JSON.stringify(dgsAfterStop.data, null, 2));
  t.snapshot(JSON.stringify(started.data, null, 2));
  t.snapshot(JSON.stringify(dgsWhileStart.data, null, 2));
  t.snapshot(JSON.stringify(dgsAfterStart.data, null, 2));
});
