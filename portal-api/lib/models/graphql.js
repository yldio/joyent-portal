'use strict';

const Graphql = require('graphql');


const internals = {
  schema: `
    scalar Object
    scalar Date

    type Activity {
      date: Date!
      type: String!
      meta: Object
    }

    type Datacenter {
      name: String!
      url: String!
    }

    input DeploymentCreate {
      name: String!
      datacenter: String!
    }

    input DeploymentUpdate {
      id: ID!
      name: String!
      datacenter: String!
    }

    type Deployment {
      id: ID!
      name: String!
      datacenter: String!
    }

    type Manifest {
      revision: Int!
      file: Object!
    }

    input ManifestCreate {
      file: Object!
    }

    type Metric {
      service: String!
      cpu: Float!
      memory: Float!
      network: Float!
    }

    type Service {
      name: String!
      count: Int!
    }

    input ServiceUpdate {
      name: String!
      count: Int!
    }

    type Mutation {
      createDeployment(deployment: DeploymentCreate!): Deployment!
      deleteDeployment(deploymentId: ID!): String
      updateDeployment(deployment: DeploymentUpdate!): Deployment!
      createManifest(deploymentId: ID!, manifest: ManifestCreate!): Manifest!
      updateService(deploymentId: ID!, service: ServiceUpdate!): Service!
    }

    type Query {
      getActivities: [Activity]
      getDatacenters: [Datacenter]
      getDeployment(id: ID!): Deployment
      getDeployments: [Deployment]
      getManifest(deploymentId: ID!, revision: Int!): Manifest
      getMetrics(deploymentId: ID!): [Metric]
      getServices(deploymentId: ID!): [Service]
    }
  `
};


exports.options = (data) => {
  const schema = Graphql.buildSchema(internals.schema);

  const createDeployment = function (args) {
    return data.createDeployment(args.deployment);
  };

  const deleteDeployment = function (args) {
    return data.deleteDeployment(args.deploymentId);
  };

  const updateDeployment = function (args) {
    return data.updateDeployment(args.deployment);
  };

  const createManifest = function (args) {
    return data.createManifest(args.deploymentId, args.manifest);
  };

  const updateService = function (args) {
    return data.updateService(args.deploymentId, args.service);
  };

  const getActivities = function () {
    return data.getActivities();
  };

  const getDatacenters = function () {
    return data.getDatacenters();
  };

  const getDeployment = function (args) {
    return data.getDeployment(args.id);
  };

  const getDeployments = function () {
    return data.getDeployments();
  };

  const getManifest = function (args) {
    return data.getManifest(args.deploymentId, args.revision);
  };

  const getMetrics = function (args) {
    return data.getMetrics(args.deploymentId);
  };

  const getServices = function (args) {
    return data.v(args.deploymentId);
  };

  return {
    schema,
    endpointURL: '/graphql',
    rootValue: {
      createDeployment,
      deleteDeployment,
      updateDeployment,
      createManifest,
      updateService,
      getActivities,
      getDatacenters,
      getDeployment,
      getDeployments,
      getManifest,
      getMetrics,
      getServices
    }
  };
};
