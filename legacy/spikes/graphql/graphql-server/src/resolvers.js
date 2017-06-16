import { find, filter } from 'lodash';
import data from './mock-data';
import { normalMetricData, leakMetricData } from './mock-data/metrics';

// TMP / Util
const datacenter = {
  id: 'datacenter-id',
  region: 'us-east-1'
};
const user = {
  id: 'unique-user-id',
  firstName: 'Judit',
  lastName: 'Greskovits',
  email: 'name@email.com',
  login: 'juditgreskovits'
};
const portal = { user, host: 'dockerhost', datacenter };
const deploymentGroups = data.projects.data.map(p => {
  p.slug = p.id;
  p.id = p.uuid;
  return p;
});
const services = data.services.data.map(s => {
  s.slug = s.id;
  s.id = s.uuid;
  return s;
});
const instances = data.instances.data.map(i => {
  i.slug = i.id;
  i.id = i.uuid;
  return i;
});
const metricTypes = data.metrics.data.types;

const count = 10;
let index = 0;
const getInstanceMetricData = (dataset, type) => {
  return dataset[type].slice(index, index + count);
};

const tick = setInterval(() => index++, 15 * 1000);

// GraphQL

const queries = {
  portal() {
    return portal;
  },

  deploymentGroups(_, { name, slug }) {
    return deploymentGroups;
  },
  deploymentGroup(_, { id, name, slug }) {
    if (id) {
      return find(deploymentGroups, { id: id });
    }
    if (slug) {
      return find(deploymentGroups, { slug: slug });
    }
    return null;
  },

  serviceScales(_, { serviceName, versionUuid }) {
    // : [ServiceScale]
    return [];
  },
  serviceScale(_, { id }) {
    // : ServiceScale
    return {};
  },

  convergenceActions(_, { type, service, versionUuid }) {
    // : [ConvergenceAction]
    return [];
  },
  convergenceAction(id) {
    // : ConvergenceAction
    return {};
  },

  stateConvergencePlans(_, { running, versionUuid }) {
    // : [StateConvergencePlan]
    return [];
  },
  stateConvergencePlan(_, { id }) {
    // : StateConvergencePlan
    return [];
  },

  versions(_, { manifestUuid, deploymentGroupUuid }) {
    // : [Version]
    return [];
  },
  version(_, { id, manifestUuid }) {
    // : Version
    return null;
  },

  manifests(_, { type, deploymentGroupUuid }) {
    // : [Manifest]
    return [];
  },
  manifest(_, { id }) {
    // : Manifest
    return null;
  },

  services(
    _,
    { name, slug, parentUuid, deploymentGroupUuid, deploymentGroupSlug }
  ) {
    // }: [Service]
    if (deploymentGroupUuid) {
      return filter(services, { project: deploymentGroupUuid });
    }
    if (deploymentGroupSlug) {
      const deploymentGroup = find(deploymentGroups, {
        slug: deploymentGroupSlug
      });
      if (deploymentGroup) {
        if (slug) {
          return filter(services, { project: deploymentGroup.id, slug: slug });
        }
        return filter(services, { project: deploymentGroup.id });
      }
      return null;
    }
    return services;
  },
  service(_, { id, hash }) {
    // : Service
    if (id) {
      return find(services, { id: id });
    }
    if (hash) {
      return find(services, { hash: hash });
    }
    return null;
  },

  packages(_, { name, type, memory, disk, swap, lwps, vcpus, version, group }) {
    // : [Package]
    return [];
  },
  package(_, { id }) {
    // : Package
    return {};
  },

  instances(
    _,
    {
      name,
      machineId,
      status,
      serviceUuid,
      serviceSlug,
      deploymentGroupUuid,
      deploymentGroupSlug
    }
  ) {
    // : [Instance]
    if (serviceUuid) {
      return filter(instances, { service: serviceUuid });
    }
    if (serviceSlug) {
      const service = find(services, { slug: serviceSlug });
      if (service) {
        return filter(instances, { service: service.id });
      }
      return null;
    }
    return instances;
  },
  instance(_, { id }) {
    // : Instance
    if (id) {
      return find(instances, { id: id });
    }
  },

  datacenter() {
    return datacenter;
  }

  /*metricTypes() {
    return metricTypes;
  },
  // tmp test
  instanceMetric() {
    return {
      type: {
        id: 'node_memory_rss_bytes',
        id: 'node_memory_rss_bytes',
        name: 'node_memory_rss_bytes',
      },
      data: getInstanceMetricData(leakMetricData, 'node_memory_rss_bytes')
    };
  }*/
};

const resolveFunctions = {
  Query: queries,
  Portal: {
    deploymentGroups(portal, args, context) {
      return deploymentGroups;
    }
  },
  DeploymentGroup: {
    services(deploymentGroup, args, context) {
      const a = Object.assign({}, args, {
        deploymentGroupSlug: deploymentGroup.slug
      });
      return queries.services(null, a);
    }
  },
  Service: {
    instances(service, args, context) {
      return filter(instances, { service: service.id });
    }
    /*metrics(service) {
      return service.metrics ?
        service.metrics.map((metric) =>
          find(metricTypes, { id: metric.type })) : [];
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
  }
  /*Instance: {
    metrics(instance) {
      return ([{
        type: {
          id: 'metric-type-id',
          id: 'metric-type-id',
          name: 'metric-type-name'
        },
        data: normalMetricData.node_memory_rss_bytes
      }]);
    }
  }*/
};

export default resolveFunctions;
