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


describe('deployments', () => {
  it('can be created', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(internals.register, (err) => {
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
    server.register(internals.register, (err) => {
      expect(err).to.not.exist();
      const payload = {
        name: 'User Services',
        datacenter: 'us-sw-1'
      };

      server.inject({ method: 'POST', url: '/deployment', payload }, (res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.result.name).to.equal('User Services');
        payload.name = 'Customer Services';

        server.inject({ method: 'PUT', url: `/deployment/${res.result.id}`, payload }, (res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.result.name).to.equal('Customer Services');
          done();
        });
      });
    });
  });

  it('can be retrieved', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(internals.register, (err) => {
      expect(err).to.not.exist();

      const payload = {
        name: 'User Services',
        datacenter: 'us-sw-1'
      };

      server.inject({ method: 'POST', url: '/deployment', payload }, (res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.result.name).to.equal('User Services');

        server.inject({ method: 'GET', url: `/deployment/${res.result.id}` }, (res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.result.name).to.equal('User Services');
          done();
        });
      });
    });
  });

  it('can be deleted', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(internals.register, (err) => {
      expect(err).to.not.exist();

      const payload = {
        name: 'User Services',
        datacenter: 'us-sw-1'
      };

      server.inject({ method: 'POST', url: '/deployment', payload }, (res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.result.name).to.equal('User Services');

        server.inject({ method: 'DELETE', url: `/deployment/${res.result.id}` }, (res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
      });
    });
  });

  it('can all be retrieved', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(internals.register, (err) => {
      expect(err).to.not.exist();

      const deployment1 = {
        name: 'User Services',
        datacenter: 'us-sw-1'
      };

      const deployment2 = {
        name: 'Customer Services',
        datacenter: 'us-sw-1'
      };

      server.inject({ method: 'POST', url: '/deployment', payload: deployment1 }, (res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.result.name).to.equal(deployment1.name);

        server.inject({ method: 'POST', url: '/deployment', payload: deployment2 }, (res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.result.name).to.equal(deployment2.name);

          server.inject({ method: 'GET', url: '/deployments' }, (res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.result.length >= 2).to.be.true();
            done();
          });
        });
      });
    });
  });
});


describe('datacenters', () => {
  it('can be retrieved', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(internals.register, (err) => {
      expect(err).to.not.exist();

      server.inject({ method: 'GET', url: '/datacenters' }, (res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });
});


describe('manifests', () => {
  it('can be created', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(internals.register, (err) => {
      expect(err).to.not.exist();
      const payload = {
        raw: 'blah',
        obj: {}
      };

      const deployment = {
        name: 'User Services',
        datacenter: 'us-sw-1'
      };

      server.inject({ method: 'POST', url: '/deployment', payload: deployment }, (res) => {
        expect(res.statusCode).to.equal(201);

        server.inject({ method: 'POST', url: `/deployment/${res.result.id}/manifest`, payload }, (res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.headers.location).to.exist();
          done();
        });
      });
    });
  });

  it('can be retrieved', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(internals.register, (err) => {
      expect(err).to.not.exist();
      const payload = {
        raw: 'blah',
        obj: {}
      };

      const deployment = {
        name: 'User Services',
        datacenter: 'us-sw-1'
      };

      server.inject({ method: 'POST', url: '/deployment', payload: deployment }, (res) => {
        expect(res.statusCode).to.equal(201);

        server.inject({ method: 'POST', url: `/deployment/${res.result.id}/manifest`, payload }, (res) => {
          expect(res.statusCode).to.equal(201);

          server.inject(res.headers.location, (res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.result.raw).to.equal(payload.raw);
            done();
          });
        });
      });
    });
  });
});


describe('activities', () => {
  it('can be retrieved', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(internals.register, (err) => {
      expect(err).to.not.exist();

      const deployment = {
        name: 'User Services',
        datacenter: 'us-sw-1'
      };

      server.inject({ method: 'POST', url: '/deployment', payload: deployment }, (res) => {
        expect(res.statusCode).to.equal(201);

        server.inject({ method: 'GET', url: `/deployment/${res.result.id}/activities` }, (res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
      });
    });
  });
});


describe('metrics', () => {
  it.skip('can be retrieved', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(internals.register, (err) => {
      expect(err).to.not.exist();

      const deployment = {
        name: 'User Services',
        datacenter: 'us-sw-1'
      };

      server.inject({ method: 'POST', url: '/deployment', payload: deployment }, (res) => {
        expect(res.statusCode).to.equal(201);

        server.inject({ method: 'GET', url: `/deployment/${res.result.id}/metrics` }, (res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
      });
    });
  });
});


describe('services', () => {
  it('can be retrieved', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(internals.register, (err) => {
      expect(err).to.not.exist();

      const deployment = {
        name: 'User Services',
        datacenter: 'us-sw-1'
      };

      server.inject({ method: 'POST', url: '/deployment', payload: deployment }, (res) => {
        expect(res.statusCode).to.equal(201);

        server.inject({ method: 'GET', url: `/deployment/${res.result.id}/services` }, (res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
      });
    });
  });

  it('can be updated', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(internals.register, (err) => {
      expect(err).to.not.exist();

      const deployment = {
        name: 'User Services',
        datacenter: 'us-sw-1'
      };

      server.inject({ method: 'POST', url: '/deployment', payload: deployment }, (res) => {
        expect(res.statusCode).to.equal(201);
        const deploymentId = res.result.id;

        server.inject({ method: 'GET', url: `/deployment/${deploymentId}/services` }, (res) => {
          expect(res.statusCode).to.equal(200);

          const service = {
            count: 2
          };

          server.inject({ method: 'PUT', url: `/deployment/${deploymentId}/service/consul`, payload: service }, (res) => {
            expect(res.statusCode).to.equal(200);
            done();
          });
        });
      });
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
