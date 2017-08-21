'use strict';

const { it, expect } = exports.lab = require('lab').script();
const PortalWatch = require('../../lib/watch/machines');


it('updates instances with the current status', (done) => {
  const machine = {
    id: 'test-id',
    tags: {
      'docker:label:com.docker.compose.project': 'test-project',
      'docker:label:com.docker.compose.service': 'test-service',
      'docker:label:com.docker.compose.config-hash': 'test-hash'
    },
    state: 'deleted'
  };

  const data = {
    getDeploymentGroup: (options, next) => {
      expect(options.name).to.equal('test-project');
      next(null, { id: 'deployment-group-id' });
    },
    getServices: (options, next) => {
      expect(options.deploymentGroupId).to.equal('deployment-group-id');
      expect(options.name).to.equal('test-service');
      next(null, [{
        id: 'service-id',
        instances: () => {
          return Promise.resolve([{
            machineId: machine.id,
            id: 'instance-id'
          }]);
        }
      }]);
    },
    updateInstance: (options, next) => {
      expect(options.id).to.equal('instance-id');
      expect(options.status).to.equal('DELETED');
      done();
    }
  };

  const portalOptions = { data, url: 'url', account: 'account', keyId: process.env.SSH_KEYID || 'de:e7:73:9a:aa:91:bb:3e:72:8d:cc:62:ca:58:a2:ec' };
  const portalWatch = new PortalWatch(portalOptions);
  portalWatch._tritonWatch.removeAllListeners('change');

  portalWatch.onChange(machine);
});

it('creates new instance', (done) => {
  const machine = {
    id: 'test-id',
    tags: {
      'docker:label:com.docker.compose.project': 'test-project',
      'docker:label:com.docker.compose.service': 'test-service',
      'docker:label:com.docker.compose.config-hash': 'test-hash'
    },
    state: 'created'
  };

  const data = {
    getDeploymentGroup: (options, next) => {
      expect(options.name).to.equal('test-project');
      next(null, { id: 'deployment-group-id' });
    },
    getServices: (options, next) => {
      expect(options.deploymentGroupId).to.equal('deployment-group-id');
      expect(options.name).to.equal('test-service');
      next(null, [{
        id: 'service-id',
        instances: () => { return Promise.resolve([]); }
      }]);
    },
    createInstance: (options, next) => {
      expect(options.id).to.equal(undefined);
      expect(options.status).to.equal('CREATED');
      expect(options.machineId).to.equal('test-id');
      done();
    }
  };

  const portalOptions = { data, url: 'url', account: 'account', keyId: process.env.SSH_KEYID || 'de:e7:73:9a:aa:91:bb:3e:72:8d:cc:62:ca:58:a2:ec' };
  const portalWatch = new PortalWatch(portalOptions);
  portalWatch._tritonWatch.removeAllListeners('change');

  portalWatch.onChange(machine);
});
