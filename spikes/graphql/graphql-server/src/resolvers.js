import { find, filter } from 'lodash';
import paramCase from 'param-case';
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
    deploymentGroup(_, { uuid, id }) {
      if(uuid) {
        return find(deploymentGroups, { uuid: uuid });
      }
      if(id) {
        return find(deploymentGroups, { id: id });
      }
      return null;
    },
    services(_, { deploymentGroupUuid=null, deploymentGroupId=null }) {
      if(deploymentGroupUuid) {
        return filter(services, { project: deploymentGroupUuid });
      }
      if(deploymentGroupId) {
        const deploymentGroup = find(deploymentGroups, { id: deploymentGroupId });
        if(deploymentGroup) {
          return filter(services, { project: deploymentGroup.uuid });
        }
        return null;
      }
      return services;
    },
    service(_, { uuid, id }) {
      if(uuid) {
        return find(services, { uuid: uuid });
      }
      if(id) {
        return find(services, { id: id });
      }
      return null;
    },
    instances(_, { serviceUuid=null, serviceId=null }) {
      if(serviceUuid) {
        return filter(instances, { service: serviceUuid });
      }
      if(serviceId) {
        const service = find(services, { id: serviceId });
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
  },
  DeploymentGroup: {
    services(deploymentGroup) {
      return filter(services, { project: deploymentGroup.uuid })
    },
  },
  Service: {
    instances(service) {
      return filter(instances, { service: service.uuid })
    },
    metrics(service) {
      return service.metrics ?
        service.metrics.map((metric) =>
          find(metricTypes, { uuid: metric.type })) : []
    },
  },
};

export default resolveFunctions;
