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

  // check() follows these steps:
  // 1. grab all services from the db
  // 2. filter to only the unique consul hosts
  // 3. grab all instances from the db
  // 4. query each consul host for service names
  // 5. query the respective consul host for service health
  // 6. match node to instance using the address and update `healthy` if the status changes
  check (cb) {
    // 1. grab all services from the db
    this._data.services.all((err, services) => {
      if (err) {
        return cb(err);
      }

      if (!services) {
        return cb();
      }

      // 2. filter to only the unique consul hosts
      const consulHosts = [];
      services.forEach((service) => {
        if (!service.consul) {
          return;
        }

        if (consulHosts.indexOf(service.consul) === -1) {
          consulHosts.push(service.consul);
        }
      });

      // 3. grab all instances from the db
      this._data.instances.all((err, instances) => {
        if (err) {
          return cb(err);
        }

        // we match consul nodes using the IP address, remove those that won't match
        instances = instances.filter((instance) => {
          return instance.ips && instance.ips.length;
        });

        // include consul host on each instance
        // helps to identify the correct instance when comparing addresses
        instances.forEach((instance) => {
          const service = services.find((service) => {
            return (service.instance_ids.indexOf(instance.id) !== -1);
          });

          if (service) {
            instance.consul = service.consul;
          }
        });

        VAsync.forEachParallel({
          inputs: consulHosts,
          // 4. query each consul host for service names
          // 5. query the respective consul host for service health
          func: this._checkServicesHealth
        }, (err, results) => {
          if (err) {
            return cb(err);
          }

          // 6. match node to instance using the address and update `healthy` if the status changes
          this._findAndUpdateInstances(instances, results.successes, cb);
        });
      });
    });
  }

  _checkServicesHealth (consul, cb) {
    const consulite = new Consulite({ consul });

    consulite.getServiceNames((err, consulServices) => {
      if (err) {
        return cb(err);
      }

      // filter out telemetry services
      consulServices = consulServices.filter((consulService) => {
        return consulService !== 'containerpilot';
      });

      VAsync.forEachParallel({
        inputs: consulServices,
        func: (consulService, next) => {
          consulite.getServiceStatus(consulService, (err, nodes) => {
            if (err) {
              return next(err);
            }

            nodes = nodes.map((node) => {
              node.consul = consul;
              return node;
            });

            next(null, nodes);
          });
        }
      }, cb);
    });
  }

  _findAndUpdateInstances (instances, nodes, cb) {
    VAsync.forEachPipeline({
      inputs: nodes,
      func: (node, next) => {
        const healthy = (node.status === 'passing');

        const instance = instances.find((instance) => {
          return (instance.ips.indexOf(node.address) !== -1) &&
              (instance.consul === node.consul) &&
              (instance.healthy !== healthy);
        });

        if (!instance) {
          return next();
        }

        this._data.updateInstance({ id: instance.id, healthy }, next);
      }
    }, cb);
  }
};
