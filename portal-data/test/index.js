'use strict';

const Code = require('code');
const Lab = require('lab');
const PortalData = require('../');


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


const internals = {
  options: { test: true, name: 'test' }
};


describe('createDeployment()', () => {
  it('creates a deployment record in the deployment table', (done) => {
    const data = new PortalData(internals.options);
    data.connect().then(() => {
      const deployment = {
        name: 'User Services',
        datacenter: 'us-sw-1'
      };

      data.createDeployment(deployment).then((deployment) => {
        expect(deployment.id).to.exist();
        done();
      });
    });
  });
});


describe('getDeployment()', () => {
  it('will retrieve an existing deployment', (done) => {
    const data = new PortalData(internals.options);
    data.connect().then(() => {
      const deployment = {
        name: 'User Services',
        datacenter: 'us-sw-1'
      };

      data.createDeployment(deployment).then((deployment) => {
        expect(deployment.id).to.exist();
        data.getDeployment(deployment.id).then((retrievedDeployment) => {
          expect(deployment).to.equal(retrievedDeployment);
          done();
        });
      });
    });
  });
});

describe('updateService()', () => {
  it('will update the services for an existing deployment', (done) => {
    const data = new PortalData(internals.options);
    data.connect().then(() => {
      const deployment = {
        name: 'User Services',
        datacenter: 'us-sw-1'
      };
      const service = {
        name: 'consul',
        containers: [
          {
            server_id: '423e7432-b760-11e2-bf6c-002590c3f1a0',
            alias: 'nodejsexample_consul_1',
            image_id: '91b757b5-bd29-2126-5ff9-ae9235011ff5',
            owner_id: '30f62ec2-24a2-6f8e-8fad-d46b04c8a0b9',
            id: '81205d4a-92f4-c4d9-da8a-aafd689eeabb'
          }
        ],
        count: 1
      };

      data.createDeployment(deployment).then((deployment) => {
        expect(deployment.id).to.exist();
        data.updateService(deployment.id, service).then((updatedService) => {
          expect(updatedService).to.equal(service);
          done();
        });
      });
    });
  });
});

describe('deploymentChanges()', () => {
  it('will execute the handler when a deployment service changes', (done) => {
    const data = new PortalData(internals.options);
    data.connect().then(() => {
      const deployment = {
        name: 'User Services',
        datacenter: 'us-sw-1'
      };
      const service1 = {
        name: 'consul',
        containers: [
          {
            server_id: '423e7432-b760-11e2-bf6c-002590c3f1a0',
            alias: 'nodejsexample_consul_1',
            image_id: '91b757b5-bd29-2126-5ff9-ae9235011ff5',
            owner_id: '30f62ec2-24a2-6f8e-8fad-d46b04c8a0b9',
            id: '81205d4a-92f4-c4d9-da8a-aafd689eeabb'
          }
        ],
        count: 1
      };

      const service2 = {
        name: 'consul',
        containers: [
          {
            server_id: '423e7432-b760-11e2-bf6c-002590c3f1a0',
            alias: 'nodejsexample_consul_1',
            image_id: '91b757b5-bd29-2126-5ff9-ae9235011ff5',
            owner_id: '30f62ec2-24a2-6f8e-8fad-d46b04c8a0b9',
            id: '81205d4a-92f4-c4d9-da8a-aafd689eeabb'
          },
          {
            server_id: '423e7432-b760-11e2-bf6c-002590c3f1a0',
            alias: 'nodejsexample_consul_2',
            image_id: '91b757b5-bd29-2126-5ff9-ae9235011ff5',
            owner_id: '30f62ec2-24a2-6f8e-8fad-d46b04c8a0b9',
            id: '81205d4a-92f4-c4d9-da8a-aafd689eeabb'
          },
          {
            server_id: '423e7432-b760-11e2-bf6c-002590c3f1a0',
            alias: 'nodejsexample_consul_3',
            image_id: '91b757b5-bd29-2126-5ff9-ae9235011ff5',
            owner_id: '30f62ec2-24a2-6f8e-8fad-d46b04c8a0b9',
            id: '81205d4a-92f4-c4d9-da8a-aafd689eeabb'
          }
        ],
        count: 3
      };

      data.createDeployment(deployment).then((deployment) => {
        expect(deployment.id).to.exist();
        data.updateService(deployment.id, service1).then((updatedService1) => {
          expect(updatedService1).to.equal(service1);

          let executed = false;
          data.deploymentChanges((err, changes) => {
            if (executed) {
              return;
            }

            expect(changes.before).to.exist();
            expect(changes.after).to.exist();
            done();
            executed = true;
          }).then(() => {
            data.updateService(deployment.id, service2).then((updatedService2) => {
              expect(updatedService2).to.equal(service2);
            });
          });
        });
      });
    });
  });
});


describe('insertMetrics()', () => {
  it('will add new metrics to a service and won\'t overwrite existing ones', (done) => {
    const data = new PortalData(internals.options);
    data.connect().then(() => {
      const containerId = '81205d4a-92f4-c4d9-da8a-aafd689eeabb';
      const metrics1 = [
        {
          timestamp: 1494360995851,
          cpu: 1.2,
          memory: 23344523,
          network: 5024
        }
      ];

      const metrics2 = [
        {
          timestamp: 1495360995851,
          cpu: 1.3,
          memory: 23344523,
          network: 4024
        }
      ];

      data.insertMetrics(containerId, metrics1).then((result1) => {
        expect(result1.id).to.equal(containerId);
        expect(result1.metrics).to.equal(metrics1);
        data.insertMetrics(containerId, metrics2).then((result2) => {
          expect(result2.id).to.equal(containerId);
          data.getMetrics(containerId).then((results) => {
            expect(results.metrics.length).to.equal(2);
            done();
          });
        });
      });
    });
  });
});
