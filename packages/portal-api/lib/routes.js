'use strict';

const Handlers = require('./handlers');
const Models = require('./models');


module.exports = [
  {
    path: '/deployment',
    method: 'post',
    config: {
      tags: ['api', 'deployment'],
      description: 'Create new deployment group',
      validate: {
        payload: Models.deploymentCreate
      },
      response: {
        schema: Models.deployment
      },
      handler: Handlers.deploymentCreate,
      plugins: {
        'hapi-swagger': {
          responses: {
            '201': {
              description: 'Deployment group created',
              schema: Models.deployment
            }
          }
        }
      }
    }
  },
  {
    path: '/deployment/{deploymentId}',
    method: 'get',
    config: {
      id: 'deploymentGet',
      tags: ['api', 'deployment'],
      description: 'Retrieve a deployment group',
      validate: {
        params: {
          deploymentId: Models.deploymentId
        }
      },
      response: {
        schema: Models.deployment
      },
      handler: Handlers.deploymentGet
    }
  },
  {
    path: '/deployment/{deploymentId}',
    method: 'put',
    config: {
      tags: ['api', 'deployment'],
      description: 'Update a deployment group',
      validate: {
        params: {
          deploymentId: Models.deploymentId
        },
        payload: Models.deploymentUpdate
      },
      response: {
        schema: Models.deployment
      },
      handler: Handlers.deploymentUpdate
    }
  },
  {
    path: '/deployment/{deploymentId}',
    method: 'delete',
    config: {
      tags: ['api', 'deployment'],
      description: 'Delete a deployment group',
      validate: {
        params: {
          deploymentId: Models.deploymentId
        }
      },
      handler: Handlers.deploymentDelete
    }
  },
  {
    path: '/deployments',
    method: 'get',
    config: {
      tags: ['api', 'deployment'],
      description: 'Retrieve a list of deployment groups',
      response: {
        schema: Models.deployments
      },
      handler: Handlers.deploymentsGet
    }
  },
  {
    path: '/datacenters',
    method: 'get',
    config: {
      tags: ['api', 'datacenter'],
      description: 'Retrieve a list of available datacenters',
      response: {
        schema: Models.datacenters
      },
      handler: Handlers.datacentersGet
    }
  },
  {
    path: '/deployment/{deploymentId}/manifest',
    method: 'post',
    config: {
      tags: ['api', 'deployment', 'manifest'],
      description: 'Create a new manifest revision for a deployment group',
      validate: {
        params: {
          deploymentId: Models.deploymentId
        },
        payload: Models.manifestCreate
      },
      response: {
        schema: Models.manifest
      },
      handler: Handlers.manifestCreate,
      plugins: {
        'hapi-swagger': {
          responses: {
            '201': {
              description: 'Manifest revision created',
              schema: Models.manifest
            }
          }
        }
      }
    }
  },
  {
    path: '/deployment/{deploymentId}/manifest/{manifestId}',
    method: 'get',
    config: {
      id: 'manifestGet',
      tags: ['api', 'deployment', 'manifest'],
      description: 'Retrieve a manifest revision for a deployment group',
      validate: {
        params: {
          deploymentId: Models.deploymentId,
          manifestId: Models.manifestId
        }
      },
      response: {
        schema: Models.manifest
      },
      handler: Handlers.manifestGet
    }
  },
  {
    path: '/deployment/{deploymentId}/activities',
    method: 'get',
    config: {
      tags: ['api', 'deployment', 'activity'],
      description: 'Retrieve the recent activities for the deployment group',
      validate: {
        params: {
          deploymentId: Models.deploymentId
        }
      },
      response: {
        schema: Models.activities
      },
      handler: Handlers.activitiesGet
    }
  },
  {
    path: '/deployment/{deploymentId}/metrics',
    method: 'get',
    config: {
      tags: ['api', 'deployment', 'metric'],
      description: 'Retrieve metrics for the deployment group',
      validate: {
        params: {
          deploymentId: Models.deploymentId
        }
      },
      response: {
        schema: Models.metrics
      },
      handler: Handlers.metricsGet
    }
  },
  {
    path: '/deployment/{deploymentId}/services',
    method: 'get',
    config: {
      tags: ['api', 'deployment', 'service'],
      description: 'Retrieve the services for a deployment group',
      validate: {
        params: {
          deploymentId: Models.deploymentId
        }
      },
      response: {
        schema: Models.services
      },
      handler: Handlers.servicesGet
    }
  },
  {
    path: '/deployment/{deploymentId}/service/{name}',
    method: 'put',
    config: {
      tags: ['api', 'deployment', 'service'],
      description: 'Perform an action on the named service',
      validate: {
        params: {
          deploymentId: Models.deploymentId,
          name: Models.serviceName
        },
        payload: Models.serviceUpdate
      },
      response: {
        schema: Models.service
      },
      handler: Handlers.serviceUpdate
    }
  }
];
