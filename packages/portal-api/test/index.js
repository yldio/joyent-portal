'use strict';

const Code = require('code');
const Hapi = require('hapi');
const Lab = require('lab');
const PortalApi = require('../');


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


const internals = {
  options: { data: { test: true, name: 'test' } }
};

internals.register = { register: PortalApi, options: internals.options };

describe('portal-api plugin', () => {
  it('can be registered with hapi', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(internals.register, (err) => {
      expect(err).to.not.exist();
      done();
    });
  });
});


describe('graphql', () => {
  it('route exists', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(internals.register, (err) => {
      expect(err).to.not.exist();
      const url = '/graphql?query=%7B%0A%20%20deploymentGroups(name%3A%22hi%22%2C%20slug%3A%20%22hi%22)%20%7B%0A%20%20%20%20id%0A%20%20%7D%0A%7D';

      server.inject({ method: 'GET', url }, (res) => {
        expect(res.statusCode).to.equal(200);
        const result = JSON.parse(res.result);
        expect(result.data).to.exist();
        expect(result.data.deploymentGroups).to.be.null();
        done();
      });
    });
  });
});
