'use strict';

const Events = require('events');
const Consulite = require('consulite');
const VAsync = require('vasync');


module.exports = class Health extends Events {
  constructor (options) {
    super();

    options = options || {};

    // todo assert options
    this._data = options.data;
    this._frequency = options.frequency || 2000;

    // consul is the base url to the consul cluster
    if (options.consul) {
      Consulite.config({ consul: options.consul });
    }
  }

  poll () {
    if (this._timeoutId) {
      return;
    }

    this._timeoutId = setTimeout(() => {
      this.check((err) => {
        if (err) {
          this.emit('error', err);
        }

        delete this._timeoutId;
        this.poll();
      });
    }, this._frequency);
  }

  check (cb) {
    Consulite.getServiceNames((err, consulServices) => {
      if (err) {
        return cb(err);
      }

      // filter out telemetry services
      consulServices = consulServices.filter((consulService) => {
        return consulService !== 'containerpilot';
      });

      this._data.instances.all((err, instances) => {
        if (err) {
          return cb(err);
        }

        // we match consul nodes using the IP address
        instances = instances.filter((instance) => {
          return instance.ips && instance.ips.length;
        });

        VAsync.forEachParallel({
          inputs: consulServices,
          func: (consulService, next) => {
            Consulite.getServiceStatus(consulService, (err, nodes) => {
              if (err) {
                return next(err);
              }

              this.findAndUpdateInstances(instances, nodes, next);
            });
          }
        }, cb);
      });
    });
  }

  findAndUpdateInstances (instances, nodes, cb) {
    VAsync.forEachPipeline({
      inputs: nodes,
      func: (node, next) => {
        const instance = instances.find((instance) => {
          return (instance.ips.indexOf(nodes.address) !== -1);
        });

        if (!instance) {
          return next();
        }

        this._data.updateInstance({ id: instance.id, status: node.status }, next);
      }
    }, cb);
  }
};
