'use strict';

const CMonClient = require('cmon-client');
const PortalData = require('portal-data');
const VAsync = require('vasync');


module.exports = class {
  constructor (options) {
    options = options || {};
    this._settings = options;
    this._data = new PortalData(options.data);
    this._cmon = new CMonClient(options.cmon);
    this._deployments = {};
  }

  start (cb) {
    this._data.connect((err) => {
      if (err) {
        return cb(err);
      }

      this._poll();

      this._data.deploymentChanges((err, changes) => {
        if (err) {
          console.error(err);
        }

        if (changes) {
          this._refreshContainers(changes.id);
        }
      });
    });
  }

  _refreshContainers (deploymentId) {
    this._data.getServices(deploymentId).then((services) => {
      this._deployments[deploymentId] = services[0].containers;
    });
  }

  _listContainers () {
    let containers = [];
    const deploymentIds = Object.keys(this._deployments);
    deploymentIds.forEach((deploymentId) => {
      containers = containers.concat(this._deployments[deploymentId]);
    });

    return containers;
  }

  _poll () {
    if (this._isPolling) {
      return;
    }

    const finish = () => {
      this._isPolling = false;
      setTimeout(() => { this._poll(); }, this._settings.frequency || 5000);
    };

    const containers = this._listContainers();
    if (!containers || !containers.length) {
      return finish();
    }


    this._isPolling = true;
    VAsync.forEachParallel({
      func: (containerId, next) => {
        this._cmon.metrics(containerId, (err, metrics) => {
          if (err) {
            return next(err);
          }

          next(null, { containerId, metrics });
        });
      },
      inputs: containers
    }, (err, results) => {
      if (err) {
        console.error(err);
        return finish();
      }

      if (!results.successes || !results.successes.length) {
        return finish();
      }
      this._saveMetrics(results.successes, finish);
    });
  }

  _saveMetrics (successes, cb) {
    const metricOperations = successes.map((success) => {
      const metrics = this._formatMetrics(success);
      return this._data.insertMetrics(success.containerId, metrics);
    });

    Promise.all(metricOperations).then(() => {
      cb();
    }).catch((err) => {
      cb(err);
    });
  }

  _formatMetrics (success) {
    const time = success.metrics.find((metric) => {
      if (metric.name === 'time_of_day') {
        return metric;
      }
    });

    const formatted = success.metrics.map((metric) => {
      return {
        name: metric.name,
        value: metric.metrics[0].value,
        time: time.metrics[0].value
      };
    });

    return formatted;
  }
};
