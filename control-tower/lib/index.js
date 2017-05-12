'use strict';

const CMonClient = require('cmon-client');
const PortalData = require('portal-data');
const VAsync = require('vasync');


const internals = {};


module.exports = class {
  constructor (options) {
    options = options || {};
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
        if (changes) {
          this._refreshContainers(changes.id);
        }
      });
    });
  }

  _refreshContainers (deploymentId) {
    this._data.getServices(deploymentId).then((services) => {
      this._deployments[deploymentId] = services.containers;
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
      setTimeout(() => this._poll(), 1000);
    };

    this._isPolling = true;
    VAsync.forEachParallel({
      func: this._cmon.metrics,
      inputs: this._listContainers()
    }, (err, results) => {
      if (err) {
        console.error(err);
        return finish();
      }

      this._saveMetrics(results, finish);
    });
  }

  _saveMetrics (metrics, cb) {
    cb();
  }
}
