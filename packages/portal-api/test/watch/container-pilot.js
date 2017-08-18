'use strict';

const { it, expect } = exports.lab = require('lab').script();
const Uuid = require('uuid/v4');

const ContainerPilotWatch = require('../../lib/watch/container-pilot');
const DataMock = require('../_mocks/data');
const TritonMock = require('../_mocks/triton');


it.skip('sets instance health statuses appropriately', (done) => {
  const networks = [{
    id: Uuid(),
    'public': false,
    subnet: '192.168.1.0/24'
  }, {
    id: Uuid(),
    'public': true
  }];

  const machines = [{
    id: Uuid(),
    ips: ['192.168.1.1', '72.2.119.1'],
    networks: networks.map(({ id }) => {
      return id;
    })
  }, {
    id: Uuid(),
    ips: ['192.168.1.2', '72.2.119.2'],
    networks: networks.map(({ id }) => {
      return id;
    })
  }, {
    id: Uuid(),
    ips: ['192.168.1.3', '72.2.119.3'],
    networks: networks.map(({ id }) => {
      return id;
    })
  }, {
    id: Uuid(),
    ips: ['192.168.1.4', '72.2.119.4'],
    networks: networks.map(({ id }) => {
      return id;
    })
  }, {
    id: Uuid(),
    ips: ['192.168.1.5', '72.2.119.5'],
    networks: networks.map(({ id }) => {
      return id;
    })
  }, {
    id: Uuid(),
    ips: ['192.168.1.6', '72.2.119.6'],
    networks: networks.map(({ id }) => {
      return id;
    })
  }, {
    id: Uuid(),
    ips: ['192.168.1.7', '72.2.119.7'],
    networks: networks.map(({ id }) => {
      return id;
    })
  }];

  const deploymentGroups = [{
    id: Uuid()
  }, {
    id: Uuid()
  }];

  const services = [{
    name: 'mysql',
    id: Uuid(),
    deploymentGroupId: deploymentGroups[0].id
  }, {
    name: 'api',
    id: Uuid(),
    deploymentGroupId: deploymentGroups[0].id
  }, {
    name: 'frontend',
    id: Uuid(),
    deploymentGroupId: deploymentGroups[0].id
  }, {
    name: 'redis',
    id: Uuid(),
    deploymentGroupId: deploymentGroups[1].id
  }, {
    name: 'auth',
    id: Uuid(),
    deploymentGroupId: deploymentGroups[1].id
  }];

  const instances = [{
    id: Uuid(),
    serviceId: services[0].id,
    machineId: machines[0].id
  }, {
    id: Uuid(),
    serviceId: services[0].id,
    machineId: machines[1].id
  }, {
    id: Uuid(),
    serviceId: services[0].id,
    machineId: machines[2].id
  }, {
    id: Uuid(),
    serviceId: services[1].id,
    machineId: machines[3].id
  }, {
    id: Uuid(),
    serviceId: services[2].id,
    machineId: machines[4].id
  }, {
    id: Uuid(),
    serviceId: services[3].id,
    machineId: machines[5].id
  }, {
    id: Uuid(),
    serviceId: services[4].id,
    machineId: machines[6].id
  }];

  const watch = new ContainerPilotWatch({
    data: DataMock({
      deploymentGroups,
      services,
      instances
    }),
    Triton: TritonMock({
      machines,
      networks
    })
  });

  watch.on('error', (err) => {
    done(err);
  });

  watch.check((err, data) => {
    console.log(err, data);
    done(err);
  });
});
