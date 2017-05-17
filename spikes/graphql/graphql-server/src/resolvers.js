import { find, filter } from 'lodash';
import data from './mock-data';
import { normalMetricData, leakMetricData } from './mock-data/metrics';

const datacenters = data.datacenters.data;
const portal = { username: 'juditgreskovits', host: 'dockerhost', datacenter: datacenters[0]};
const deploymentGroups = data.projects.data.map(p => {
  p.slug = p.id;
  return p;
});
const services = data.services.data.map(s => {
  s.slug = s.id;
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

    deploymentGroups(_, { name, slug }) {
      return deploymentGroups;
    },
    deploymentGroup(_, { uuid, name, slug }) {
      if(uuid) {
        return find(deploymentGroups, { uuid: uuid });
      }
      if(slug) {
        return find(deploymentGroups, { slug: slug });
      }
      return null;
    },

    serviceScales(_, { serviceName, versionUuid }) { // : [ServiceScale]
      return [];
    },
    serviceScale(_, { uuid }) { // : ServiceScale
      return {};
    },

    convergenceActions(_, { type, service, versionUuid }) { // : [ConvergenceAction]
      return [];
    },
    convergenceAction(uuid) { // : ConvergenceAction
      return {};
    },

    stateConvergencePlans(_, { running, versionUuid }) { // : [StateConvergencePlan]
      return [];
    },
    stateConvergencePlan(_, { uuid }) { // : StateConvergencePlan
      return [];
    },

    versions(_, { manifestUuid, deploymentGroupUuid }) { // : [Version]
      return [];
    },
    version(_, { uuid, manifestUuid }) { // : Version
      return null;
    },

    manifests(_, { type, deploymentGroupUuid }) { // : [Manifest]
      return [];
    },
    manifest(_, { uuid }) { // : Manifest
      return null;
    },

    services(_, { name, slug, parentUuid, deploymentGroupUuid, deploymentGroupSlug }) { // }: [Service]
      if(deploymentGroupUuid) {
        return filter(services, { project: deploymentGroupUuid });
      }
      if(deploymentGroupSlug) {
        const deploymentGroup = find(deploymentGroups, { slug: deploymentGroupSlug });
        if(deploymentGroup) {
          return filter(services, { project: deploymentGroup.uuid });
        }
        return null;
      }
      return services;
    },
    service(_, { uuid, hash }) { // : Service
      if(uuid) {
        return find(services, { uuid: uuid });
      }
      if(hash) {
        return find(services, { hash: hash });
      }
      return null;
    },

    packages(_, { name, type, memory, disk, swap, lwps, vcpus, version, group }) { // : [Package]
      return [];
    },
    package(_, { uuid }) { // : Package
      return {};
    },

    instances(_, { name, machineId, status, serviceUuid, serviceSlug, deploymentGroupUuid, deploymentGroupSlug }) { // : [Instance]
      if(serviceUuid) {
        return filter(instances, { service: serviceUuid });
      }
      if(serviceSlug) {
        const service = find(services, { slug: serviceSlug });
        if(service) {
          return filter(instances, { service: service.uuid });
        }
        return null;
      }
      return instances;
    },
    instance(_, { uuid }) { // : Instance
      if(uuid) {
        return find(instances, { uuid: uuid });
      }
    },

    datacenter() {
      return {
        uuid: 'datacenter-uuid',
        region: 'us-east-1'
      };
    },

    /*metricTypes() {
      return metricTypes;
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
    }*/
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
    /*metrics(service) {
      return service.metrics ?
        service.metrics.map((metric) =>
          find(metricTypes, { uuid: metric.type })) : [];
    },*/
    /*currentMetrics(service) {
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
    },*/
  },
  /*Instance: {
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
  }*/
};

export default resolveFunctions;
