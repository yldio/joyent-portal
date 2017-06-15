'use strict';

// const Assert = require('assert');
const TritonWatch = require('triton-watch');


const DEPLOYMENT_GROUP = 'docker:label:com.docker.compose.project';
const SERVICE = 'docker:label:com.docker.compose.service';
const HASH = 'docker:label:com.docker.compose.config-hash';


module.exports = class Watcher {
  constructor (options) {
    options = options || {};

    // todo assert options
    this._data = options.data;

    this._tritonWatch = new TritonWatch({
      frequency: 500,
      triton: {
        profile: {
          url: options.url || process.env.SDC_URL,
          account: options.account || process.env.SDC_ACCOUNT,
          keyId: options.keyId || process.env.SDC_KEY_ID
        }
      }
    });

    this._tritonWatch.on('change', (container) => { return this.onChange(container); });
  }

  getDeploymentGroupId (name, cb) {
    this._data.getDeploymentGroup({ name }, (err, deploymentGroup) => {
      if (err) {
        return cb(err);
      }

      return cb(null, deploymentGroup && deploymentGroup.id);
    });
  }

  getServiceId ({ serviceName, deploymentGroupId }, cb) {
    this._data.getServices({ name: serviceName, deploymentGroupId }, (err, services) => {
      if (err) {
        return cb(err);
      }

      if (!services || !services.length) {
        return cb();
      }

      return cb(null, services.pop().id);
    });
  }

  getInstance (machineId, cb) {
    this._data.getInstances({ machineId }, (err, instances) => {
      if (err) {
        return cb(err);
      }

      if (!instances || !instances.length) {
        return cb();
      }

      return cb(null, instances.pop());
    });
  }

  resolveChanges ({ machine, deploymentGroupId, serviceId, instance }) {
    const handleError = (err) => {
      if (err) {
        console.error(err);
      }
    };

    const create = () => {
      return this._data.updateInstance({
        name: machine.name,
        status: machine.state.toUpperCase(),
        machineId: machine.id
      }, handleError);
    };

    const update = () => {
      return this._data.updateInstance({
        id: instance.id,
        status: machine.state.toUpperCase()
      }, handleError);
    };

    return (!instance || !instance.id) ?
      create() :
      update();
  }

  onChange (machine) {
    if (!machine) {
      console.error('`change` event received without machine data');
      return;
    }

    const { id, tags = [] } = machine;

    // assert id existence
    if (!id) {
      console.error('`change` event received for a machine without `id`');
      return;
    }

    // assert that it's a docker-compose project
    const isCompose = [DEPLOYMENT_GROUP, SERVICE, HASH].every(
      (name) => { return tags[name]; }
    );

    if (!isCompose) {
      console.error(`Changed machine ${id} was not provisioned by docker-compose`);
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

    const getInstance = (deploymentGroupId, serviceId) => {
      this.getInstance(id, handleError((instance) => {
        return this.resolveChanges({
          machine,
          deploymentGroupId,
          serviceId,
          instance
        });
      }));
    };

    // assert that service exists
    const assertService = (deploymentGroupId) => {
      this.getServiceId({ serviceName, deploymentGroupId }, handleError((serviceId) => {
        if (!serviceId) {
          console.error(`Service "${serviceName}" form DeploymentGroup "${deploymentGroupName}" for machine ${id} not found`);
          return;
        }

        getInstance(deploymentGroupId, serviceId);
      }));
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
