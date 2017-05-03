import { find, filter } from 'lodash';
import data from './mock-data';

const portal = { username: 'juditgreskovits', host: 'dockerhost'};
const deploymentGroups = data.projects.data;
const services = data.services.data;
const instances = data.instances.data;
const metricTypes = data.metrics.data.types;
const datacenters = data.datacenters.data;

const resolveFunctions = {
  Query: {
    portal() {
      return portal;
    },
    deploymentGroups() {
      return deploymentGroups;
    },
    deploymentGroup(_, { uuid }) {
      return find(deploymentGroups, { uuid: uuid });
    },
    services() {
      return services;
    },
    service(_, { uuid }) {
      return find(services, { uuid: uuid });
    },
    instances() {
      return instances;
    },
    metricTypes() {
      return metricTypes;
    },
    datacenters() {
      return datacenters;
    },
  },
  DeploymentGroup: {
    services(deploymentGroup) {
      return filter(services, { project: deploymentGroup.uuid })
    }
  },
  Service: {
    instances(service) {
      return filter(instances, { service: service.uuid })
    },
    metrics(service) {
      return service.metrics ?
        service.metrics.map((metric) =>
          find(metricTypes, { uuid: metric.type })) : []
    }
  },
};

export default resolveFunctions;
