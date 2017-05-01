'use strict';


exports.activities = [
  {
    date: Date.now(),
    type: 'start',
    meta: {
      user: 'Tom'
    }
  },
  {
    date: Date.now(),
    type: 'stop',
    meta: {
      user: 'Dave'
    }
  }
];


exports.datacenters = [
  { name: 'us-sw-1', url: 'https://us-sw-1.api.joyentcloud.com' },
  { name: 'us-west-1', url: 'https://us-west-1.api.joyentcloud.com' }
];


exports.deployments = [{
  id: 'd1f6c3af-1180-46cc-8d3f-1e7e90e5795d',
  name: 'User Services',
  datacenter: 'us-sw-1'
}];

exports.deployment = exports.deployments[0];


exports.manifest = {
  revision: 5,
  file: {
    consul: {
      image: 'autopilotpattern/consul:0.7.2-r0.8',
      restart: 'always',
      dns: ['127.0.0.1'],
      labels: ['triton.cns.services=consul'],
      ports: ['8500:8500'],
      command: `>
        /usr/local/bin/containerpilot
        /bin/consul agent -server
          -config-dir=/etc/consul
          -log-level=err
          -bootstrap-expect 1
          -ui-dir /ui`
    },
    prometheus: {
      image: 'autopilotpattern/prometheus:1.3.0r1.0',
      mem_limit: '128m',
      restart: 'always',
      ports: ['9090:9090']
    }
  }
};


exports.metrics = [
  {
    service: 'consul',
    cpu: 1.2,
    memory: 23344523,
    network: 5024
  },
  {
    service: 'prometheus',
    cpu: 24.2,
    memory: 514234453,
    network: 10024
  }
];


exports.services = [
  {
    name: 'consul',
    count: 3
  },
  {
    name: 'prometheus',
    count: 1
  }
];

exports.service = exports.services[0];


exports.state = {
  current: 'started'
};
