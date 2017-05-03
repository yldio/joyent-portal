import { find, filter } from 'lodash';
import data from './mock-data';

const portal = { username: 'juditgreskovits', host: 'dockerhost'};
const deployments = data.projects.data;
const services = data.services.data;
const instances = data.instances.data;
const metricTypes = data.metrics.data.types;
const datacenters = data.datacenters.data;

const resolveFunctions = {
  Query: {
    portal() {
      return portal;
    },
    deployments() {
      return deployments;
    },
    deployment(_, { uuid }) {
      return find(deployments, { uuid: uuid });
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
  Deployment: {
    services(deployment) {
      return filter(services, { project: deployment.uuid })
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
