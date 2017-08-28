'use strict';

const Hapi = require('hapi');
const { describe, it, beforeEach, afterEach, expect } = exports.lab = require('lab').script();
const PortalData = require('../lib/data');
const PortalApi = require('../');


const internals = {
  options: {
    data: {
      name: 'test',
      db: { test: true, host: 'rethinkdb' },
      server: {
        log: function () { }
      }
    }
  }
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
        expect(res.result.data).to.exist();
        done();
      });
    });
  });

  it('can query for a deployment group inside a portal', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(internals.register, (err) => {
      expect(err).to.not.exist();

      const payload = {
        query: '{ portal { datacenter { region }, deploymentGroups(name: "test1") { name, slug } } }'
      };

      server.inject({ method: 'POST', url: '/graphql', payload }, (res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.result.data).to.exist();
        expect(res.result.data.portal.deploymentGroups[0].name).to.equal('test1');
        done();
      });
    });
  });

  it('defaults to all deployment groups inside a portal', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(internals.register, (err) => {
      expect(err).to.not.exist();

      const payload = {
        query: '{ portal { datacenter { region }, deploymentGroups { name, slug } } }'
      };

      server.inject({ method: 'POST', url: '/graphql', payload }, (res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.result.data).to.exist();
        expect(res.result.data.portal.deploymentGroups.length).to.equal(2);
        done();
      });
    });
  });

  it('can sub-filter services for a deployment group', (done) => {
    const server = new Hapi.Server();
    server.connection();
    server.register(internals.register, (err) => {
      expect(err).to.not.exist();

      const payload = {
        query: '{ portal { datacenter { region }, deploymentGroups(name: "test") { name, services(name: "service") { name } } } }'
      };

      server.inject({ method: 'POST', url: '/graphql', payload }, (res) => {
        expect(res.statusCode).to.equal(200);
        console.log(res.result.data);
        const deploymentGroup = res.result.data.portal.deploymentGroups[0];
        expect(deploymentGroup.name).to.equal('test');
        expect(deploymentGroup.services[0].name).to.equal('service');
        done();
      });
    });
  });

  beforeEach((done) => {
    const data = new PortalData(internals.options.data);
    data.connect(() => {
      data.createDatacenter({ region: 'us-sw', name: 'us-sw' }, (err, datacenter) => {
        if (err) {
          return done(err);
        }

        data.createUser({ firstName: 'Nikola', lastName: 'Tesla', email: 'nikola@tesla.com', login: 'nikola' }, (err, user) => {
          if (err) {
            return done(err);
          }

          data.createPortal({
            user,
            datacenter
          }, (err, portal) => {
            if (err) {
              return done(err);
            }

            data.createDeploymentGroup({ name: 'test1' }, () => {
              data.createDeploymentGroup({ name: 'test2' }, (err, deploymentGroup) => {
                if (err) {
                  return done(err);
                }

                data.createService({
                  name: 'service',
                  slug: 'service_slug',
                  deploymentGroupId: deploymentGroup.id
                }, () => { done(); });
              });
            });
          });
        });
      });
    });
  });

  afterEach((done) => {
    const data = new PortalData(internals.options.data);
    data.connect(() => {
      data._db.r.dbDrop('test').run(data._db._connection, done);
    });
  });
});
