'use strict';

// const Assert = require('assert');
const Throat = require('throat');
const TritonWatch = require('triton-watch');
const util = require('util');


const DEPLOYMENT_GROUP = 'docker:label:com.docker.compose.project';
const SERVICE = 'docker:label:com.docker.compose.service';
const HASH = 'docker:label:com.docker.compose.config-hash';

module.exports = class Watcher {
  constructor (options) {
    options = options || {};

    // todo assert options
    this._data = options.data;
    this._frequency = 500;

    this._tritonWatch = new TritonWatch({
      frequency: this._frequency,
      triton: {
        profile: {
          url: options.url || process.env.SDC_URL,
          account: options.account || process.env.SDC_ACCOUNT,
          keyId: options.keyId || process.env.SDC_KEY_ID
        }
      }
    });

    this._queues = {};

    this._tritonWatch.on('change', (container) => { return this.onChange(container); });

    this._tritonWatch.on('all', (containers) => {
      containers.forEach((container) => {
        this.onChange(container);
      });
    });
  }

  poll () {
    this._tritonWatch.poll();
  }

  getContainers () {
    return this._tritonWatch.getContainers();
  }

  pushToQueue ({ serviceName, deploymentGroupId }, cb) {
    const name = `${deploymentGroupId}-${serviceName}`;

    if (this._queues[name]) {
      this._queues[name](cb);
      return;
    }

    this._queues[name] = Throat(1);
    this._queues[name](cb);
  }

  getDeploymentGroupId (name, cb) {
    this._data.getDeploymentGroup({ name }, (err, deploymentGroup) => {
      if (err) {
        return cb(err);
      }

      return cb(null, deploymentGroup && deploymentGroup.id);
    });
  }

  getService ({ serviceName, serviceHash, deploymentGroupId }, cb) {
    this._data.getServices({ name: serviceName, hash: serviceHash, deploymentGroupId }, (err, services) => {
      if (err) {
        return cb(err);
      }

      if (!services || !services.length) {
        return cb();
      }

      return cb(null, services.pop());
    });
  }

  getInstances (service, cb) {
    service.instances()
      .then((instances) => { return cb(null, instances); })
      .catch((err) => { return cb(err); });
  }

  resolveChanges ({ machine, service, instances }, cb) {
    // 1. if instance doesn't exist, create new
    // 2. if instance exist, update status

    const handleError = (cb) => {
      return (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        if (cb) {
          cb(err, data);
        }
      };
    };

    const isNew = instances
      .every(({ machineId }) => { return machine.id !== machineId; });

    const instance = instances
      .filter(({ machineId }) => { return machine.id === machineId; })
      .pop();

    const updateService = (updatedService, cb) => {
      console.log('-> updating service', util.inspect(updatedService));
      return this._data.updateService(updatedService, handleError(cb));
    };

    const create = (cb) => {
      const status = (machine.state || '').toUpperCase();

      if (status === 'DELETED') {
        return cb();
      }

      const instance = {
        name: machine.name,
        status,
        machineId: machine.id
      };

      console.log('-> creating instance', util.inspect(instance));
      return this._data.createInstance(instance, handleError((_, instance) => {
        return updateService({
          id: service.id,
          instances: instances.concat(instance)
        }, cb);
      }));
    };

    const update = (cb) => {
      const updatedInstance = {
        id: instance.id,
        status: (machine.state || '').toUpperCase()
      };

      console.log('-> updating instance', util.inspect(updatedInstance));
      return this._data.updateInstance(updatedInstance, handleError(() => {
        if (['DELETED', 'DESTROYED'].indexOf(machine.state.toUpperCase()) < 0) {
          return cb();
        }

        return setTimeout(() => {
          return updateService({
            id: service.id,
            instances: instances.filter(({ id }) => {
              return id !== instance.id;
            })
          }, cb);
        }, this._frequency * 3);
      }));
    };

    return isNew ?
      create(cb) :
      update(cb);
  }

  onChange (machine) {
    if (!machine) {
      console.error('-> `change` event received without machine data');
      return;
    }

    console.log('-> `change` event received', util.inspect(machine));

    const { id, tags = {} } = machine;

    // assert id existence
    if (!id) {
      console.error('-> `change` event received for a machine without `id`');
      return;
    }

    // assert that it's a docker-compose project
    const isCompose = [DEPLOYMENT_GROUP, SERVICE, HASH].every(
      (name) => { return tags[name]; }
    );

    if (!isCompose) {
      console.error(`-> Changed machine ${id} was not provisioned by docker-compose`);
      return;
    }

    const deploymentGroupName = tags[DEPLOYMENT_GROUP];
    const serviceName = tags[SERVICE];

    const handleError = (next) => {
      return (err, item) => {
        if (err) {
          console.error(err);
          return;
        }

        next(item);
      };
    };

    const getInstances = (service, cb) => {
      this.getInstances(service, handleError((instances) => {
        return this.resolveChanges({
          machine,
          service,
          instances
        }, cb);
      }));
    };

    // assert that service exists
    const assertService = (deploymentGroupId) => {
      this.pushToQueue({ serviceName, deploymentGroupId }, () => {
        return new Promise((resolve) => {
          this.getService({ serviceName, deploymentGroupId }, handleError((service) => {
            if (!service) {
              console.error(`Service "${serviceName}" form DeploymentGroup "${deploymentGroupName}" for machine ${id} not found`);
              return;
            }

            getInstances(service, resolve);
          }));
        });
      });
    };

    // assert that project managed by this portal
    const assertDeploymentGroup = () => {
      this.getDeploymentGroupId(deploymentGroupName, handleError((deploymentGroupId) => {
        if (!deploymentGroupId) {
          console.error(`DeploymentGroup "${deploymentGroupName}" for machine ${id} not found`);
          return;
        }

        assertService(deploymentGroupId);
      }));
    };

    assertDeploymentGroup();
  }
};

module.exports.DEPLOYMENT_GROUP = DEPLOYMENT_GROUP;
module.exports.SERVICE = SERVICE;
module.exports.HASH = HASH;
