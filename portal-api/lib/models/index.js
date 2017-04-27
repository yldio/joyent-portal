'use strict';

const Joi = require('joi');
const Examples = require('./examples');


// Shared schema between schema sections

const internals = {
  serviceName: Joi.string().required().description('Unique name to identify the service')
};


// Activity

exports.activity = Joi.object({
  date: Joi.date().required().description('Date/time when the activity occurred'),
  type: Joi.string().required().description('The type of activity that occurred'),
  meta: Joi.object().optional().description('Any metadata related to the activity')
}).example(Examples.activities[0]);

exports.activities = Joi.array().items(exports.activity).example(Examples.activities);


// Datacenters

exports.datacenter = Joi.object({
  name: Joi.string().required().description('Name of datacenter'),
  url: Joi.string().required().description('URL of datacenter')
}).example(Examples.datacenters[0]);

exports.datacenters = Joi.array().items(exports.datacenter).example(Examples.datacenters);


// Deployments

exports.deploymentId = Joi.number().required().description('ID of deployment group');

exports.deploymentCreate = Joi.object({
  name: Joi.string().required().description('Name of deployment group'),
  datacenter: Joi.string().required().description('Datacenter the deployment group belongs to')
});

exports.deploymentUpdate = Joi.object({
  name: Joi.string().optional().description('Name of deployment group'),
  datacenter: Joi.string().optional().description('Datacenter the deployment group belongs to')
}).or('name', 'datacenter');

exports.deployment = exports.deploymentCreate.keys({
  id: exports.deploymentId
}).example(Examples.deployments[0]);

exports.deployments = Joi.array().items(exports.deployment);


// Manifests

exports.manifestRevision = Joi.number().required().description('Revision number of manifest').example(Examples.manifest.revision);

exports.manifestCreate = Joi.object({
  file: Joi.object().required().description('Manifest file represented as JSON').example(Examples.manifest.file)
});

exports.manifest = exports.manifestCreate.keys({
  revision: exports.manifestRevision
}).example(Examples.manifest);


// Metrics

exports.metric = Joi.object({
  service: internals.serviceName,
  cpu: Joi.number().required().description('CPU usage percentage'),
  memory: Joi.number().required().description('Total memory usage in bytes'),
  network: Joi.number().required().description('Total bytes per second transferred by the NIC')
}).example(Examples.metrics[0]);

exports.metrics = Joi.array().items(exports.metric).example(Examples.metrics);


// Services

exports.serviceName = internals.serviceName;

exports.serviceCount = Joi.number().default(1).description('Number of instances of the service');

exports.service = Joi.object({
  name: internals.serviceName,
  count: exports.serviceCount
}).example(Examples.services[0]);

exports.services = Joi.array().items(exports.service).example(Examples.services);

exports.serviceUpdate = Joi.object({
  count: exports.serviceCount.required()
});


// State

exports.stateAction = Joi.object({
  action: Joi.string().required().valid(['start', 'stop', 'restart'])
    .description('Action being performed on the deployment group')
});

exports.state = Joi.object({
  current: Joi.string().required().valid(['started', 'stopped'])
    .description('The current state of the deployment group')
});
