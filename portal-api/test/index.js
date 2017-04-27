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


describe('portal-api plugin', () => {
  it('can be registered with hapi', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(PortalApi, (err) => {
      expect(err).to.not.exist();
      done();
    });
  });
});


describe('deployments', () => {
  it('can be created', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(PortalApi, (err) => {
      expect(err).to.not.exist();
      const payload = {
        name: 'User Services',
        datacenter: 'us-sw-1'
      };

      server.inject({ method: 'POST', url: '/deployment', payload }, (res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.headers.location).to.exist();
        done();
      });
    });
  });

  it('can be updated', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(PortalApi, (err) => {
      expect(err).to.not.exist();
      const payload = {
        name: 'User Services',
        datacenter: 'us-sw-1'
      };

      server.inject({ method: 'PUT', url: '/deployment/42', payload }, (res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  it('can be retrieved', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(PortalApi, (err) => {
      expect(err).to.not.exist();

      server.inject({ method: 'GET', url: '/deployment/42' }, (res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.result.name).to.equal('User Services');
        done();
      });
    });
  });

  it('can be deleted', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(PortalApi, (err) => {
      expect(err).to.not.exist();

      server.inject({ method: 'DELETE', url: '/deployment/42' }, (res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  it('can all be retrieved', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(PortalApi, (err) => {
      expect(err).to.not.exist();

      server.inject({ method: 'GET', url: '/deployments' }, (res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.result.length).to.equal(1);
        done();
      });
    });
  });
});


describe('datacenters', () => {
  it('can be retrieved', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(PortalApi, (err) => {
      expect(err).to.not.exist();

      server.inject({ method: 'GET', url: '/datacenters' }, (res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.result.length).to.equal(2);
        done();
      });
    });
  });
});


describe('manifests', () => {
  it('can be created', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(PortalApi, (err) => {
      expect(err).to.not.exist();
      const payload = {
        file: {}
      };

      server.inject({ method: 'POST', url: '/deployment/42/manifest', payload }, (res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.headers.location).to.exist();
        done();
      });
    });
  });

  it('can be retrieved', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(PortalApi, (err) => {
      expect(err).to.not.exist();

      server.inject({ method: 'GET', url: '/deployment/42/manifest/5' }, (res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.result.file).to.exist();
        done();
      });
    });
  });
});


describe('activities', () => {
  it('can be retrieved', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(PortalApi, (err) => {
      expect(err).to.not.exist();

      server.inject({ method: 'GET', url: '/deployment/42/activities' }, (res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.result.length).to.equal(2);
        done();
      });
    });
  });
});


describe('metrics', () => {
  it('can be retrieved', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(PortalApi, (err) => {
      expect(err).to.not.exist();

      server.inject({ method: 'GET', url: '/deployment/42/metrics' }, (res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.result.length).to.equal(2);
        done();
      });
    });
  });
});


describe('deployment state', () => {
  it('can be retrieved', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(PortalApi, (err) => {
      expect(err).to.not.exist();

      server.inject({ method: 'GET', url: '/deployment/42/state' }, (res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  it('can be updated', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(PortalApi, (err) => {
      expect(err).to.not.exist();
      const payload = {
        action: 'restart'
      };

      server.inject({ method: 'PUT', url: '/deployment/42/state', payload }, (res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });
});


describe('services', () => {
  it('can be retrieved', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(PortalApi, (err) => {
      expect(err).to.not.exist();

      server.inject({ method: 'GET', url: '/deployment/42/services' }, (res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.result.length).to.equal(2);
        done();
      });
    });
  });

  it('can be updated', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(PortalApi, (err) => {
      expect(err).to.not.exist();
      const payload = {
        count: 3
      };

      server.inject({ method: 'PUT', url: '/deployment/42/service/consul', payload }, (res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.result.count).to.equal(3);
        done();
      });
    });
  });
});


describe('graphql', () => {
  it('route exists', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(PortalApi, (err) => {
      expect(err).to.not.exist();
      const url = '/graphql?query=%7B%0A%20%20getDeployment(id%3A%201)%20%7B%0A%20%20%20%20id%0A%20%20%7D%0A%7D';

      server.inject({ method: 'GET', url }, (res) => {
        expect(res.statusCode).to.equal(200);
        const result = JSON.parse(res.result);
        expect(result.data).to.exist();
        expect(result.data.getDeployment).to.exist();
        done();
      });
    });
  });
});
