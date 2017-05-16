import { find, filter } from 'lodash';
import data from './mock-data';
import { normalMetricData, leakMetricData } from './mock-data/metrics';

const datacenters = data.datacenters.data;
const portal = { username: 'juditgreskovits', host: 'dockerhost', datacenter: datacenters[0]};
const deploymentGroups = data.projects.data.map(p => {
  p.pathName = p.id;
  return p;
});
const services = data.services.data.map(s => {
  s.pathName = s.id;
  return s;
});
const instances = data.instances.data;
const metricTypes = data.metrics.data.types;

const count = 10;
let index = 0;
const getInstanceMetricData = (dataset, type) => {
  return dataset[type].slice(index, index + count);
}

const tick = setInterval(() => index++, 15*1000);

const resolveFunctions = {
  Query: {
    portal() {
      return portal;
    },
    deploymentGroups() {
      return deploymentGroups;
    },
    deploymentGroup(_, { uuid, pathName }) {
      if(uuid) {
        return find(deploymentGroups, { uuid: uuid });
      }
      if(pathName) {
        return find(deploymentGroups, { pathName: pathName });
      }
      return null;
    },
    services(_, { deploymentGroupUuid=null, deploymentGroupPathName=null }) {
      if(deploymentGroupUuid) {
        return filter(services, { project: deploymentGroupUuid });
      }
      if(deploymentGroupPathName) {
        const deploymentGroup = find(deploymentGroups, { pathName: deploymentGroupPathName });
        if(deploymentGroup) {
          return filter(services, { project: deploymentGroup.uuid });
        }
        return null;
      }
      return services;
    },
    service(_, { uuid, pathName }) {
      if(uuid) {
        return find(services, { uuid: uuid });
      }
      if(pathName) {
        return find(services, { pathName: pathName });
      }
      return null;
    },
    instances(_, { serviceUuid=null, servicePathName=null }) {
      if(serviceUuid) {
        return filter(instances, { service: serviceUuid });
      }
      if(serviceId) {
        const service = find(services, { pathName: servicePathName });
        if(service) {
          return filter(instances, { service: service.uuid });
        }
        return null;
      }
      return instances;
    },
    metricTypes() {
      return metricTypes;
    },
    datacenters() {
      return datacenters;
    },
    // tmp test
    instanceMetric() {
      return {
        type: {
          uuid: 'node_memory_rss_bytes',
          id: 'node_memory_rss_bytes',
          name: 'node_memory_rss_bytes',
        },
        data: getInstanceMetricData(leakMetricData, 'node_memory_rss_bytes')
      };
    }
  },
  Portal: {
    deploymentGroups(portal) {
      return deploymentGroups;
    }
  },
  DeploymentGroup: {
    services(deploymentGroup) {
      return filter(services, { project: deploymentGroup.uuid });
    },
  },
  Service: {
    instances(service) {
      return filter(instances, { service: service.uuid });
    },
    metrics(service) {
      return service.metrics ?
        service.metrics.map((metric) =>
          find(metricTypes, { uuid: metric.type })) : [];
    },
    currentMetrics(service) {
      // tmp
      return [{
        "name": "CPU",
        "value": 50,
        "measurement": "%",
      }, {
        "name": "Memory",
        "value": 20,
        "measurement": "%",
      }, {
        "name": "Network",
        "value": 2.9,
        "measurement": "Kb/sec",
      }];
    },
  },
  Instance: {
    metrics(instance) {
      return ([{
        type: {
          uuid: 'metric-type-uuid',
          id: 'metric-type-id',
          name: 'metric-type-name'
        },
        data: normalMetricData.node_memory_rss_bytes
      }]);
    }
  }
};

export default resolveFunctions;
