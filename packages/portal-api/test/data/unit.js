'use strict';

const Http = require('http');
const { describe, it, expect } = exports.lab = require('lab').script();
const PortalData = require('../../lib/data');


describe('getMetrics()', () => {
  it('queries prometheus for the instance metrics', (done) => {
    const server = Http.createServer((req, res) => {
      const payload = JSON.stringify({ 'status': 'success', 'data': { 'resultType': 'matrix', 'result': [{ 'metric': { '__name__': 'mem_agg_usage', 'instance': 'joyentportal_compose-api_1', 'job': 'triton' }, 'values': [[1502896217.371, '60518400'], [1502899817.371, '60641280'], [1502903417.371, '60575744']] } ] } });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(payload);
    });

    server.listen(9090, (err) => {
      expect(err).to.not.exist();

      const options = {
        deploymentGroupId: 'deploymentGroup',
        names: ['AVG_MEM_BYTES'],
        instances: ['joyentportal_compose-api_1'],
        start: new Date(Date.now() - 10000).toISOString(),
        end: new Date(Date.now()).toISOString()
      };

      const dataThis = {
        getServices: ({ deploymentGroupId, name }, next) => {
          const instance = {
            machine_id: 'machineId'
          };

          const service = {
            instances: () => { return Promise.resolve([instance]); }
          };

          next(null, [service]);
        },
        _triton: {
          getInstance: (id, next) => {
            const tritonInstance = {
              primaryIp: 'localhost'
            };

            next(null, tritonInstance);
          }
        }
      };


      PortalData.prototype.getMetrics.call(dataThis, options, (err, metrics) => {
        expect(err).to.not.be.an.error();
        expect(metrics.length).to.equal(1);
        expect(metrics[0].name).to.equal('AVG_MEM_BYTES');
        done();
      });
    });
  });
});
