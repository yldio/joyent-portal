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
