
'use strict';

// core modules
const EventEmitter = require('events');
const Fs = require('fs');
const Path = require('path');
const Url = require('url');
const Util = require('util');

// 3rd party modules
const Boom = require('boom');
const CIDRMatcher = require('cidr-matcher');
const DockerClient = require('docker-compose-client');
const Dockerode = require('dockerode');
const ForceArray = require('force-array');
const Hoek = require('hoek');
const Find = require('lodash.find');
const Flatten = require('lodash.flatten');
const Get = require('lodash.get');
const UniqBy = require('lodash.uniqby');
const ParamCase = require('param-case');
const Penseur = require('penseur');
const Prometheus = require('prom-query');
const Triton = require('triton');
const Uuid = require('uuid/v4');
const VAsync = require('vasync');

// local modules
const Transform = require('./transform');
const { DEPLOYMENT_GROUP, SERVICE, HASH } = require('../watch/machines');


const NON_IMPORTABLE_STATES = [
  'EXITED',
  'DELETED',
  'STOPPED',
  'FAILED'
];

const NEW_INSTANCE_ID = '__NEW__';
const UNKNOWN_INSTANCE_ID = '__UNKNOWN__';

const DOCKER_HOST_URL = process.env.DOCKER_HOST ? Url.parse(process.env.DOCKER_HOST) : {};

const internals = {
  defaults: {
    name: 'portal',
    db: {
      host: 'rethinkdb'
    },
    docker: {
      protocol: 'https',
      host: DOCKER_HOST_URL.hostname,
      port: DOCKER_HOST_URL.port,
      ca: process.env.DOCKER_CERT_PATH ?
        Fs.readFileSync(Path.join(process.env.DOCKER_CERT_PATH, 'ca.pem')) :
        undefined,
      cert: process.env.DOCKER_CERT_PATH ?
        Fs.readFileSync(Path.join(process.env.DOCKER_CERT_PATH, 'cert.pem')) :
        undefined,
      key: process.env.DOCKER_CERT_PATH ?
        Fs.readFileSync(Path.join(process.env.DOCKER_CERT_PATH, 'key.pem')) :
        undefined
    },
    triton: {
      url: process.env.SDC_URL,
      account: process.env.SDC_ACCOUNT,
      keyId: process.env.SDC_KEY_ID
    },
    dockerComposeHost: 'tcp://compose-api:4242'
  },
  tables: {
    'portals': { id: { type: 'uuid' }, primary: 'id', secondary: false, purge: false },
    'datacenters': { id: { type: 'uuid' }, primary: 'id', secondary: false, purge: false },
    'deployment_groups': { id: { type: 'uuid' }, primary: 'id', secondary: false, purge: false },
    'versions': { id: { type: 'uuid' }, primary: 'id', secondary: false, purge: false },
    'manifests': { id: { type: 'uuid' }, primary: 'id', secondary: false, purge: false },
    'services': { id: { type: 'uuid' }, primary: 'id', secondary: false, purge: false },
    'packages': { id: { type: 'uuid' }, primary: 'id', secondary: false, purge: false },
    'instances': { id: { type: 'uuid' }, primary: 'id', secondary: false, purge: false },
    'users': { id: { type: 'uuid' }, primary: 'id', secondary: false, purge: false }
  },
  resolveCb: (resolve, reject) => {
    return (err, ...args) => {
      if (err) {
        return reject(err);
      }

      resolve(...args);
    };
  },
  fromKeyValueToDict: (kv) => {
    return kv.reduce((acc, { name, value }) => {
      return Object.assign(acc, {
        [name]: value
      });
    }, {});
  },
  isNotFound: (err) => {
    return err && (err['typeof'] === Boom.notFound);
  }
};


class Data extends EventEmitter {
  constructor (options) {
    super();

    this._settings = Hoek.applyToDefaults(internals.defaults, options || {});

    // Penseur will assert that the options are correct
    this._db = new Penseur.Db(this._settings.name, this._settings.db);
    this._dockerCompose = new DockerClient(this._settings.dockerComposeHost);
    this._docker = new Dockerode(this._settings.docker);
    this._machines = null;
    this._triton = null;
    this._server = this._settings.server;

    Triton.createClient({
      profile: this._settings.triton
    }, (err, client) => {
      if (err) {
        this.emit('error', err);
        return;
      }

      this._triton = client.cloudapi;
    });

    this._dockerCompose.on('error', (err) => {
      this.emit('error', err);
    });
  }

  setMachinesWatcher (machinesWatcher) {
    this._machines = machinesWatcher;
  }

  connect (cb) {
    this._db.establish(internals.tables, cb);
  }

  reconnectCompose (dockerComposeHost) {
    this._dockerCompose.close();
    this._dockerCompose = new DockerClient(dockerComposeHost);

    this._dockerCompose.on('error', (err) => {
      this.emit('error', err);
    });
  }

  reconnectDb (db) {
    this._settings.db = db;

    try {
      this._db.close();
    } catch (ex) {}

    this._db = new Penseur.Db(this._settings.name, this._settings.db);

    this.connect((err) => {
      if (err) {
        this.emit('error', err);
      }
    });
  }

  // portals

  createPortal (clientPortal, cb) {
    const portal = Transform.toPortal(clientPortal);
    this._db.portals.insert(portal, (err, key) => {
      if (err) {
        return cb(err);
      }

      portal.id = key;
      cb(null, Transform.fromPortal({ portal }));
    });
  }

  getPortal (options, cb) {
    this._db.portals.all((err, portals) => {
      if (err) {
        return cb(err);
      }

      if (!portals) {
        return cb();
      }

      const portal = portals.shift();

      // Sub query/filter for deploymentGroups
      const deploymentGroups = (args, cb) => {
        if (typeof cb === 'function') {
          return this.getDeploymentGroups(args, cb);
        }

        return new Promise((resolve, reject) => {
          this.getDeploymentGroups(args, internals.resolveCb(resolve, reject));
        });
      };

      // Sub query/filter for user
      const user = () => {
        return new Promise((resolve, reject) => {
          this.getUser({}, internals.resolveCb(resolve, reject));
        });
      };

      // Sub query/filter for datacenter
      const datacenter = () => {
        return new Promise((resolve, reject) => {
          this.getDatacenter({ id: portal.datacenter_id }, internals.resolveCb(resolve, reject));
        });
      };

      cb(null, Transform.fromPortal({
        portal,
        deploymentGroups,
        datacenter,
        user
      }));
    });
  }


  // datacenters

  createDatacenter (datacenter, cb) {
    this._db.datacenters.insert(datacenter, (err, key) => {
      if (err) {
        return cb(err);
      }

      datacenter.id = key;
      cb(null, datacenter);
    });
  }

  getDatacenters (cb) {
    this._db.datacenters.all(cb);
  }

  getDatacenter ({ id, region }, cb) {
    Hoek.assert(id || region, 'id or region are required to retrieve a datacenter');

    if (region) {
      return this._db.datacenters.query({ region }, (err, datacenters) => {
        if (err) {
          return cb(err);
        }

        return cb(null, datacenters && datacenters.length ? datacenters[0] : null);
      });
    }

    this._db.datacenters.get(id, cb);
  }


  // users

  createUser (clientUser, cb) {
    const user = Transform.toUser(clientUser);
    this._db.users.insert(user, (err, key) => {
      if (err) {
        return cb(err);
      }

      user.id = key;
      cb(null, Transform.fromUser(user));
    });
  }

  getUser (options, cb) {
    this._db.users.all((err, users) => {
      if (err) {
        return cb(err);
      }

      if (!users || !users.length) {
        return cb();
      }

      cb(null, Transform.fromUser(users[0]));
    });
  }


  // deployment_groups

  createDeploymentGroup (clientDeploymentGroup, cb) {
    const dg = Transform.toDeploymentGroup(clientDeploymentGroup);
    this._server.log(['debug'], `-> creating DeploymentGroup: ${Util.inspect(dg)}`);

    this._db.deployment_groups.query({
      slug: dg.slug
    }, (err, dgs) => {
      if (err) {
        return cb(err);
      }

      if (dgs && dgs.length) {
        return cb(new Error(`DeploymentGroup "${dg.slug}" already exists (${dgs[0].id})`));
      }

      this._db.deployment_groups.insert(dg, (err, key) => {
        if (err) {
          return cb(err);
        }

        dg.id = key;
        cb(null, Transform.fromDeploymentGroup(dg));
      });
    });
  }

  updateDeploymentGroup (clientDeploymentGroup, cb) {
    const dg = Transform.toDeploymentGroup(clientDeploymentGroup);
    this._server.log(['debug'], `-> updating DeploymentGroup: ${Util.inspect(dg)}`);

    this._db.deployment_groups.update([dg], (err) => {
      if (err) {
        return cb(err);
      }

      this.getDeploymentGroup({ id: clientDeploymentGroup.id }, cb);
    });
  }

  _getDeploymentGroupFns (deploymentGroup) {
    const getServices = (args, cb) => {
      args = args || {};
      args.ids = deploymentGroup.service_ids;

      if (typeof cb === 'function') {
        return args.ids && args.ids.length ?
          this.getServices(args, cb) :
          cb(null, []);
      }

      return new Promise((resolve, reject) => {
        return args.ids && args.ids.length ?
          this.getServices(args, internals.resolveCb(resolve, reject)) :
          resolve([]);
      });
    };

    const getVersion = (args, cb) => {
      args = args || {};
      args.id = deploymentGroup.version_id;

      if (typeof cb === 'function') {
        return deploymentGroup.version_id ?
          this.getVersion(args, cb) :
          cb(null);
      }

      return new Promise((resolve, reject) => {
        return deploymentGroup.version_id ?
          this.getVersion(args, internals.resolveCb(resolve, reject)) :
          resolve(null);
      });
    };

    const getHistory = (args, cb) => {
      args = args || {};
      args.version_ids = ForceArray(deploymentGroup.history_version_ids);

      if (typeof cb === 'function') {
        return args.version_ids && args.version_ids.length ?
          this.getHistory(args, cb) :
          cb(null, []);
      }

      return new Promise((resolve, reject) => {
        return args.version_ids && args.version_ids.length ?
          this.getHistory(args, internals.resolveCb(resolve, reject)) :
          resolve([]);
      });
    };

    return Object.assign(deploymentGroup, {
      services: getServices,
      version: getVersion,
      history: getHistory
    });
  }

  getDeploymentGroups ({ ids, name, slug }, cb) {
    const finish = (err, deploymentGroups) => {
      if (err) {
        return cb(err);
      }

      if ((ids || name || slug) && (!deploymentGroups || !deploymentGroups.length)) {
        return cb(Boom.notFound());
      }

      if (!deploymentGroups || !deploymentGroups.length) {
        return cb(null, []);
      }

      cb(null, deploymentGroups.map((dg) => {
        return Transform.fromDeploymentGroup(this._getDeploymentGroupFns(dg));
      }));
    };

    if (ids) {
      return this._db.deployment_groups.get(ids, finish);
    }

    if (name) {
      return this._db.deployment_groups.query({ name }, finish);
    }

    if (slug) {
      return this._db.deployment_groups.query({ slug }, finish);
    }

    return this._db.deployment_groups.all(finish);
  }

  getDeploymentGroup (query, cb) {
    query = query || {};

    this._db.deployment_groups.query(query, (err, deploymentGroups) => {
      if (err) {
        return cb(err);
      }

      if (!deploymentGroups || !deploymentGroups.length) {
        return cb(Boom.notFound());
      }

      cb(null, Transform.fromDeploymentGroup(this._getDeploymentGroupFns(deploymentGroups[0])));
    });
  }

  deleteDeploymentGroup ({ id }, cb) {
    // dg, services, instances, versions, manifests

    const remove = (err, result) => {
      if (err) {
        return cb(err);
      }

      const res = ForceArray(result.successes).reduce((acc, res) => {
        return Object.assign(acc, res);
      }, {});

      VAsync.parallel({
        funcs: [
          (cb) => {
            if (!res.dg) {
              return cb();
            }

            this._db.deployment_groups.remove({ id }, cb);
          },
          (cb) => {
            if (!res.services) {
              return cb();
            }

            VAsync.forEachParallel({
              inputs: res.services,
              func: ({ id }, next) => {
                this._db.services.remove({ id }, next);
              }
            });
          },
          (cb) => {
            if (!res.instances) {
              return cb();
            }

            VAsync.forEachParallel({
              inputs: res.instances,
              func: ({ id }, next) => {
                this._db.instances.remove({ id }, next);
              }
            });
          },
          (cb) => {
            VAsync.forEachParallel({
              inputs: res.versions,
              func: ({ id }, next) => {
                this._db.versions.remove({ id }, next);
              }
            });
          },
          (cb) => {
            VAsync.forEachParallel({
              inputs: res.manifests,
              func: ({ id }, next) => {
                this._db.manifests.remove({ id }, next);
              }
            });
          }
        ]
      }, (err) => {
        cb(err, res.cb);
      });
    };

    VAsync.parallel({
      funcs: [
        (cb) => {
          this.getDeploymentGroup({ id }, (err, dg) => {
            if (internals.isNotFound(err)) {
              return cb(null, {});
            }

            cb(err, { dg });
          });
        },
        (cb) => {
          this.getServices({ deploymentGroupId: id }, (err, services) => {
            if (internals.isNotFound(err)) {
              return cb(null, {});
            }

            cb(err, { services });
          });
        },
        (cb) => {
          this.getInstances({ deploymentGroupId: id }, (err, instances) => {
            if (internals.isNotFound(err)) {
              return cb(null, {});
            }

            cb(err, { instances });
          });
        },
        (cb) => {
          this.getVersions({ deploymentGroupId: id }, (err, versions) => {
            cb(err, { versions });
          });
        },
        (cb) => {
          this.getManifests({ deploymentGroupId: id }, (err, manifests) => {
            cb(err, { manifests });
          });
        }
      ]
    }, remove);
  }

  // versions

  _versionFns (version) {
    return Object.assign(version, {
      manifest: (args) => {
        return new Promise((resolve, reject) => {
          return this.getManifest({
            id: version.manifest_id
          }, internals.resolveCb(resolve, reject));
        });
      }
    });
  }

  createVersion (clientVersion, cb) {
    Hoek.assert(clientVersion, 'version is required');
    Hoek.assert(clientVersion.manifest, 'manifest is required');
    Hoek.assert(clientVersion.deploymentGroupId, 'deploymentGroupId is required');

    this._server.log(['debug'], `-> creating new Version for DeploymentGroup ${clientVersion.deploymentGroupId}: ${Util.inspect(clientVersion)}`);

    const version = Transform.toVersion(clientVersion);
    this._db.versions.insert(version, (err, key) => {
      if (err) {
        return cb(err);
      }

      this._server.log(['debug'], `-> new Version for DeploymentGroup ${clientVersion.deploymentGroupId} created: ${key}`);
      this._db.deployment_groups.query({
        id: clientVersion.deploymentGroupId
      }, (err, deploymentGroup) => {
        if (err) {
          return cb(err);
        }

        const changes = {
          id: clientVersion.deploymentGroupId,
          version_id: key,
          history_version_ids: deploymentGroup.version_id ?
            ForceArray(deploymentGroup.history_version_ids).concat([]) :
            []
        };

        this._server.log(['debug'], `-> updating DeploymentGroup ${clientVersion.deploymentGroupId} to add Version ${key}`);

        this._db.deployment_groups.update([changes], (err) => {
          if (err) {
            return cb(err);
          }

          this.getVersion({ id: key }, cb);
        });
      });
    });
  }

  updateVersion (clientVersion, cb) {
    this._db.versions.update([Transform.toVersion(clientVersion)], (err) => {
      if (err) {
        return cb(err);
      }

      this.getVersion({ id: clientVersion.id }, cb);
    });
  }

  getVersion ({ id, manifestId }, cb) {
    const query = id ? { id } : { manifest_id: manifestId };
    this._db.versions.single(query, (err, version) => {
      if (err) {
        return cb(err);
      }

      if (!version) {
        return cb(null, null);
      }

      cb(null, Transform.fromVersion(this._versionFns(version)));
    });
  }

  getVersions ({ manifestId, deploymentGroupId }, cb) {
    const finish = (err, versions) => {
      if (err) {
        return cb(err);
      }

      versions = versions || [];
      cb(null, versions.map((version) => {
        return Transform.fromVersion(this._versionFns(version));
      }));
    };

    // ensure the data is in sync
    this._db.versions.sync(() => {
      if (manifestId) {
        return this._db.versions.query({ manifest_id: manifestId }, finish);
      }

      this.getDeploymentGroup({ id: deploymentGroupId }, (err, deploymentGroup) => {
        if (err) {
          return finish(err);
        }

        this._db.versions.get(deploymentGroup.history, finish);
      });
    });
  }

  getHistory ({ version_ids }, cb) {
    this._db.services.get(version_ids, (err, versions) => {
      if (err) {
        return cb(err);
      }

      if (!versions || !versions.length) {
        return cb(null, []);
      }

      cb(null, versions.map((version) => {
        return Transform.fromVersion(this._versionFns(version));
      }));
    });
  }

  // static _calcCurrentScale ({ config, currentVersion }, cb) {
  //   return config.map(({ name }) => {
  //     const currentScale = Find(ForceArray(currentVersion ? currentVersion.scale : []), [
  //       'serviceName',
  //       name
  //     ]);
  //
  //     return {
  //       id: Uuid(),
  //       serviceName: name,
  //       replicas: Number.isFinite(currentScale) ? currentScale : 1
  //     };
  //   });
  // }

  _getCurrentScale (deploymentGroupId, cb) {
    const handleServiceInstanceMap = (err, result) => {
      if (err) {
        return cb(err);
      }

      cb(err, ForceArray(result.successes).map(({ name, instances }) => ({
        id: Uuid(),
        serviceName: name,
        replicas: ForceArray(instances).length
      })));
    };

    const handleServices = ({ dg }) => (err, services) => {
      if (err) {
        return cb(err);
      }

      VAsync.forEachParallel({
        inputs: services,
        func: (service, next) => {
          service.instances({}, (err, instances) => {
            if (err) {
              return next(err);
            }

            next(err, Object.assign({}, service, {
              instances
            }));
          });
        }
      }, handleServiceInstanceMap);
    };

    const handleDeploymentGroup = (err, dg) => {
      if (err) {
        return cb(err);
      }

      dg.services({}, handleServices({ dg }));
    };

    this.getDeploymentGroup({ id: deploymentGroupId }, handleDeploymentGroup);
  }

  scale ({ serviceId, replicas }, cb) {
    Hoek.assert(serviceId, 'service id is required');
    Hoek.assert(typeof replicas === 'number' && replicas >= 0, 'replicas must be a number no less than 0');

    // get the service
    // check service status
    // update service status
    // get the deployment group
    // use the deployment group to find the current version and manifest
    // get instances
    // get current scale
    // identify plan and future scale
    // update version
    // callback
    // scale the service

    // this._scale({ service, deployment_group, version, manifest, replicas }, cb);

    const ctx = {
      isHandled: false
    };

    this._server.log(['debug'], '-> scale request received');

    const handleFailedScale = (err1, cb) => {
      if (err1) {
        console.error(err1);
      }

      this.updateService({
        id: serviceId,
        status: 'ACTIVE'
      }, (err2) => {
        if (err2) {
          console.error(err2);
        }

        if (typeof cb === 'function') {
          cb(err1 || err2);
        }
      });
    };

    const handleTriggeredScale = (err) => {
      if (err) {
        return handleFailedScale(err);
      }

      if (ctx.isHandled) {
        return;
      }

      ctx.isHandled = true;

      this._server.log(['debug'], `-> got response from docker-compose to scale ${ctx.service.name} to ${replicas} replicas`);
    };

    const triggerScale = (err, newVersion) => {
      if (err) {
        return handleFailedScale(err, cb);
      }

      this._server.log(['debug'], '-> new Version created');

      cb(null, newVersion);

      setImmediate(() => {
        this._server.log(['debug'], `-> requesting docker-compose to scale ${ctx.service.name} to ${replicas} replicas`);

        this._dockerCompose.scale({
          projectName: ctx.deploymentGroup.name,
          environment: ctx.manifest.environment,
          files: internals.fromKeyValueToDict(ctx.manifest.files),
          manifest: ctx.manifest.raw,
          services: {
            [ctx.service.name]: replicas
          }
        }, handleTriggeredScale);
      });
    };

    const getNewScale = () => {
      return ctx.currentScale.map(({ serviceName, replicas }) => {
        return {
          id: Uuid(),
          serviceName: serviceName,
          replicas: serviceName === ctx.service.name ?
            (ctx.serviceScale + ctx.diff) :
            replicas
        };
      });
    };

    const handleScaleDown = () => {
      const payload = {
        manifest: ctx.manifest,
        deploymentGroupId: ctx.deploymentGroup.id,
        scale: getNewScale(),
        plan: [{
          id: Uuid(),
          type: 'REMOVE',
          service: ctx.service.name,
          toProcess: Math.abs(ctx.diff),
          machines: ctx.instances.map(({ machineId }) => {
            return machineId;
          })
        }],
        hasPlan: true
      };

      this._server.log(['debug'], `-> creating new Version for DOWN scale ${Util.inspect(payload)}`);

      // note: createVersion updates deploymentGroup
      this.createVersion(payload, triggerScale);
    };

    const handleScaleUp = () => {
      const payload = {
        manifest: ctx.manifest,
        deploymentGroupId: ctx.deploymentGroup.id,
        scale: getNewScale(),
        plan: [{
          id: Uuid(),
          type: 'CREATE',
          service: ctx.service.name,
          toProcess: Math.abs(ctx.diff),
          machines: ctx.instances.map(({ machineId }) => {
            return machineId;
          })
        }],
        hasPlan: true
      };

      this._server.log(['debug'], `-> creating new Version for UP scale ${Util.inspect(payload)}`);

      // note: createVersion updates deploymentGroup
      this.createVersion(payload, triggerScale);
    };

    const handleCurrentScale = (err, currentScale) => {
      if (err) {
        return handleFailedScale(err, cb);
      }

      this._server.log(['debug'], `-> got current scale ${Util.inspect(currentScale)}`);

      const serviceReplicas = Find(currentScale, ['serviceName', ctx.service.name]).replicas;
      const serviceScale = Number.isFinite(serviceReplicas) ? serviceReplicas : 1;

      const diff = replicas - serviceScale;

      if (diff === 0) {
        return handleFailedScale(null, cb);
      }

      ctx.serviceScale = serviceScale;
      ctx.serviceReplicas = serviceReplicas;
      ctx.currentScale = currentScale;
      ctx.diff = diff;

      return (diff > 0) ?
        handleScaleUp() :
        handleScaleDown();
    };

    const handleManifest = (err, manifest) => {
      if (err) {
        return handleFailedScale(err, cb);
      }

      if (!manifest) {
        return cb(new Error(`manifest not found for service with service id: ${serviceId}`));
      }

      ctx.manifest = manifest;

      this._server.log(['debug'], '-> fetching current scale');

      this._getCurrentScale(ctx.deploymentGroup.id, handleCurrentScale);
    };

    const handleVersion = (err, version) => {
      if (err) {
        return handleFailedScale(err, cb);
      }

      if (!version) {
        return cb(new Error(`Version not found for service with service id: ${serviceId}`));
      }

      ctx.version = version;

      this._server.log(['debug'], `-> fetching Manifest ${version.manifest_id}`);

      this._db.manifests.single({
        id: version.manifest_id
      }, handleManifest);
    };

    const handleDeploymentGroup = (err, deploymentGroup) => {
      if (err) {
        return handleFailedScale(err, cb);
      }

      if (!deploymentGroup) {
        return cb(new Error(`deployment group not found for service with service id: ${serviceId}`));
      }

      ctx.deploymentGroup = deploymentGroup;

      this._server.log(['debug'], `-> fetching Version ${ctx.deploymentGroup.version_id}`);

      this._db.versions.single({
        id: deploymentGroup.version_id
      }, handleVersion);
    };

    const handleInstances = (err, instances = []) => {
      if (err) {
        return handleFailedScale(err, cb);
      }

      this._server.log(['debug'], `-> got ${instances.length} Instances from ${ctx.service.name}`);

      ctx.instances = instances;

      this._server.log(['debug'], `-> fetching DeploymentGroup ${ctx.service.deployment_group_id}`);

      this._db.deployment_groups.single({
        id: ctx.service.deployment_group_id
      }, handleDeploymentGroup);
    };

    const handleUpdatedService = (err) => {
      if (err) {
        return handleFailedScale(err, cb);
      }

      this._server.log(['debug'], `-> fetching Instances from ${ctx.service.name}`);

      this.getInstances({ ids: ctx.service.instance_ids }, handleInstances);
    };

    const handleService = (err, service) => {
      if (err) {
        return cb(err);
      }

      if (!service) {
        return cb(new Error(`Service not found for id: ${serviceId}`));
      }

      if (service.status !== 'ACTIVE') {
        return cb(new Error(`Can't scale when the status is "${service.status}"`));
      }

      ctx.service = service;

      this._server.log(['debug'], `-> fetching DeploymentGroup ${service.deployment_group_id}`);

      this.updateService({
        id: serviceId,
        status: 'SCALING'
      }, handleUpdatedService);
    };

    this._server.log(['debug'], `-> fetching Service ${serviceId}`);

    this._db.services.single({ id: serviceId }, handleService);
  }


  // manifests

  provisionManifest (clientManifest, cb) {
    // 1. check that the deploymentgroup exists
    // 2. update Deployment Group to set PROVISIONING status
    // 3. get docker-compose config for the given manifest
    // 4. create a new manifest
    // 5. fetch current version
    // 6. get curent scale based on machines in triton
    // 7. create new version
    // 8. call `up` and get the response
    // 9. iterate over services from provision response
    // 10. on each service, either create or update it with new status and hash
    // 11. fetch all the existing services
    // 12. for each existing service, check if it still exists on this provision. if it doesn't update to mark DELETING
    // 13. update deployment group with calculated plan and ACTIVE status

    const ctx = {
      isHandled: false
    };

    this._server.log(['debug'], '-> provision request received');

    const handleFailedProvision = (err) => {
      if (!err) {
        return;
      }

      console.error(err);

      this.updateVersion({
        id: ctx.newVersion.id,
        error: `${err.message}\n${err.stack}`
      }, (err) => {
        if (err) {
          console.error(err);
        }
      });
    };

    const ServiceStatusFromPlan = {
      NOOP: 'ACTIVE',
      CREATE: 'PROVISIONING',
      RECREATE: 'PROVISIONING',
      START: 'PROVISIONING'
    };

    // 15. handle fetched instantes
    // 16. update deployment group with calculated plan and ACTIVE status
    const handleServiceInstanceMap = (err, result) => {
      if (err) {
        return handleFailedProvision(err);
      }

      const services = ForceArray(result.successes);

      this._server.log(['debug'], `-> got a map of Service's-Instance's from DeploymentGroup ${ctx.currentDeploymentGroup.id} ${Util.inspect(services)}`);

      const plan = Flatten(services.map(({ name, instances }) => {
        const provision = ctx.provisionRes[name];
        const machines = instances.map(({ machineId }) => {
          return machineId;
        });

        const { replicas } = Find(ctx.currentScale, ['serviceName', name]);
        const scale = Number.isFinite(replicas) ? replicas : 1;
        const action = Get(provision, 'plan.action', 'NOOP').toUpperCase();

        if (!provision) {
          return {
            id: Uuid(),
            type: 'REMOVE',
            service: name,
            toProcess: machines.length,
            machines: machines
          };
        }

        const ActionMap = {
          'NOOP': () => {
            return {
              id: Uuid(),
              type: 'NOOP',
              service: name,
              machines
            };
          },
          'CREATE': () => {
            return {
              id: Uuid(),
              type: 'CREATE',
              service: name,
              toProcess: scale,
              machines: machines
            };
          },
          'RECREATE': () => {
            return {
              id: Uuid(),
              type: 'CREATE',
              service: name,
              toProcess: machines.length,
              machines: machines
            };
          },
          'START': () => {
            return {
              id: Uuid(),
              type: 'START',
              service: name,
              machines
            };
          }
        };

        return ActionMap[action]();
      }));

      VAsync.parallel({
        funcs: [
          (cb) => {
            this._server.log(['debug'], `-> updating Version ${ctx.newVersion.id} from DeploymentGroup ${ctx.currentDeploymentGroup.id} with new Plan ${Util.inspect(plan)}`);
            return this.updateVersion({
              id: ctx.newVersion.id,
              hasPlan: true,
              plan
            }, cb);
          },
          (cb) => {
            this._server.log(['debug'], `-> updating DeploymentGroup ${ctx.currentDeploymentGroup.id} with new Service's ${Util.inspect(ctx.newServices)} and ACTIVE status`);

            const services = UniqBy(
              ForceArray(ctx.newServices)
                .concat(ForceArray(ctx.previousServices)),
              'id'
            );

            this.updateDeploymentGroup({
              id: ctx.currentDeploymentGroup.id,
              status: 'ACTIVE',
              services: services
            }, cb);
          }
        ]
      }, handleFailedProvision);
    };

    // 14. fetch instanceIds for each Service
    const handleRemovedServices = (err) => {
      if (err) {
        return handleFailedProvision(err);
      }

      this._server.log(['debug'], `-> marked removed Service's with DELETING from DeploymentGroup ${ctx.currentDeploymentGroup.id}`);
      this._server.log(['debug'], `-> fetching a map of Service's-Instance's from DeploymentGroup ${ctx.currentDeploymentGroup.id}`);

      VAsync.forEachParallel({
        inputs: ctx.previousServices,
        func: (service, next) => {
          service.instances({}, (err, instances) => {
            if (err) {
              return next(err);
            }

            next(err, Object.assign({}, service, {
              instances
            }));
          });
        }
      }, handleServiceInstanceMap);
    };

    // 13. handle all the existing services response
    const handlePreviousServices = (err, previousServices = []) => {
      if (err) {
        return handleFailedProvision(err);
      }

      this._server.log(['debug'], `-> identified previous Service's from DeploymentGroup ${ctx.currentDeploymentGroup.id} ${Util.inspect(ctx.previousServices)}`);

      ctx.previousServices = previousServices;

      // 12. for existing service, check if it still exists on this provision. if it doesn't update to mark DELETING
      ctx.removedServices = previousServices.filter(({ name }) => {
        return !Find(ctx.newServices, ['name', name]);
      });

      this._server.log(['debug'], `-> identified removed Service's from DeploymentGroup ${ctx.currentDeploymentGroup.id} ${Util.inspect(ctx.removedServices)}`);

      VAsync.forEachParallel({
        inputs: ctx.removedServices,
        func: ({ id, name }, next) => {
          this._server.log(['debug'], `-> marking Service ${name} as DELETING from DeploymentGroup ${ctx.currentDeploymentGroup.id}`);
          this.updateService({
            id,
            status: 'DELETING'
          }, next);
        }
      }, handleRemovedServices);
    };

    // 11. fetch all the existing services
    const handleNewServices = (err, result) => {
      if (err) {
        return handleFailedProvision(err);
      }

      ctx.newServices = ForceArray(result.successes);

      this._server.log(['debug'], `-> got "${ctx.newServices.length}" Services provisioned from DeploymentGroup ${ctx.currentDeploymentGroup.id}`);

      ctx.currentDeploymentGroup.services({}, handlePreviousServices);
    };

    const createProvisionService = ({ payload }, cb) => {
      this._server.log(['debug'], `-> creating Service "${payload.name}" from DeploymentGroup ${ctx.currentDeploymentGroup.id}`);
      this.createService(payload, cb);
    };

    const updateProvisionService = ({ payload, serviceId }, cb) => {
      this._server.log(['debug'], `-> updating Service "${payload.name}" from DeploymentGroup ${ctx.currentDeploymentGroup.id}`);
      this.updateService(Object.assign({}, payload, {
        id: serviceId
      }), cb);
    };

    // 10. on each service, either create or update it with new status and hash
    const handleProvisionService = (serviceName, next) => {
      this._server.log(['debug'], `-> handling Service "${serviceName}" from DeploymentGroup ${ctx.currentDeploymentGroup.id}`);

      this.getServices({
        name: serviceName,
        deploymentGroupId: ctx.currentDeploymentGroup.id
      }, (err, services = []) => {
        if (err && !internals.isNotFound(err)) {
          return next(err);
        }

        this._server.log(['debug'], `-> got ${services.length} services with name ${serviceName} from DeploymentGroup ${ctx.currentDeploymentGroup.id}`);

        const provision = ctx.provisionRes[serviceName];
        const action = Get(provision, 'plan.action', 'noop').toUpperCase();
        const service = services.shift();

        const { config } = Find(ctx.config, ['name', serviceName], {
          config: {}
        });

        const payload = {
          hash: provision.hash,
          deploymentGroupId: ctx.currentDeploymentGroup.id,
          name: serviceName,
          slug: ParamCase(serviceName),
          status: ServiceStatusFromPlan[action],
          config
        };

        return !service ?
          createProvisionService({ payload }, next) :
          updateProvisionService({ payload, serviceId: service.id }, next);
      });
    };

    // 8. handle `up` response
    // 9. asynchronously iterate over services from provision response
    const handleProvisionResponse = (err, provisionRes) => {
      if (err) {
        return handleFailedProvision(err);
      }

      if (ctx.isHandled) {
        return;
      }

      this._server.log(['debug'], `-> got response from provision ${Util.inspect(provisionRes)}`);

      ctx.isHandled = true;
      ctx.provisionRes = provisionRes;

      VAsync.forEachParallel({
        inputs: Object.keys(ctx.provisionRes),
        func: handleProvisionService
      }, handleNewServices);
    };

    // 7. handle new version
    // 8. call docker-compose to up dg
    const handleNewVersion = (err, newVersion) => {
      if (err) {
        return cb(err);
      }

      // note: deployment group is updated when version is created

      ctx.newVersion = newVersion;

      // cb with new version
      // CALLBACK
      cb(null, ctx.newVersion);

      setImmediate(() => {
        this._server.log(['debug'], `-> requesting docker-compose provision for DeploymentGroup ${ctx.currentDeploymentGroup.name}`);

        this._dockerCompose.provision({
          projectName: ctx.currentDeploymentGroup.name,
          environment: clientManifest.environment,
          files: internals.fromKeyValueToDict(clientManifest.files),
          manifest: ctx.newManifest.raw
        }, handleProvisionResponse);
      });
    };

    // 6. handle curent scale based on machines in triton
    // 7. create new version
    const handleCurrentScale = (err, currentScale) => {
      if (err) {
        return cb(err);
      }

      this._server.log(['debug'], `-> got current scale ${Util.inspect(currentScale)}`);

      ctx.currentScale = currentScale;

      this.createVersion({
        manifest: ctx.newManifest,
        deploymentGroupId: ctx.currentDeploymentGroup.id,
        scale: currentScale,
        plan: [],
        hasPlan: false
      }, handleNewVersion);
    };

    // 5. handle current version
    // 6. get curent scale based on machines in triton
    const handleCurrentVersion = (err, currentVersion) => {
      if (err) {
        return cb(err);
      }

      if (!currentVersion) {
        this._server.log(['debug'], `-> detected first provision for DeploymentGroup ${ctx.currentDeploymentGroup.id}`);
      } else {
        this._server.log(['debug'], `-> creating new Version based on old Version ${currentVersion.id}`);
      }

      ctx.currentVersion = currentVersion;

      this._getCurrentScale(ctx.currentDeploymentGroup.id, handleCurrentScale);
    };

    // 4. handle new version
    // 5. fetch current version
    const handleNewManifest = (err, newManifest) => {
      if (err) {
        return cb(err);
      }

      this._server.log(['debug'], `-> fetching current version for ${ctx.currentDeploymentGroup.id}`);

      ctx.newManifest = newManifest;
      ctx.currentDeploymentGroup.version(null, handleCurrentVersion);
    };

    // 3. handle docker-compose config for the given manifest
    // 4. create a new manifest
    const handleConfig = (err, config) => {
      if (err) {
        return cb(err);
      }

      this._server.log(['debug'], `-> got docker-compose config ${Util.inspect(config)}`);

      ctx.config = config;

      this.createManifest(Object.assign(clientManifest, {
        deploymentGroupId: ctx.currentDeploymentGroup.id
      }), handleNewManifest);
    };

    // 1. check if deployment group exists
    // 2. update Deployment Group to set PROVISIONING status
    // 3. get docker-compose config for the given manifest
    const handleDeploymentGroup = (err, currentDeploymentGroup) => {
      if (err) {
        return cb(err);
      }

      if (!currentDeploymentGroup) {
        return cb(new Error('Deployment group not found for manifest'));
      }

      if (currentDeploymentGroup.status !== 'ACTIVE') {
        console.error(`-> Can't provision when the status is "${currentDeploymentGroup.status}"`);
        // return last version
        return currentDeploymentGroup.version({}, cb);
      }

      this._server.log(['debug'], `-> DeploymentGroup found with id ${currentDeploymentGroup.id}`);

      const configPayload = Object.assign({}, clientManifest, {
        deploymentGroupName: currentDeploymentGroup.name
      });

      this._server.log(['debug'], `-> requesting docker-compose config for manifest ${Util.inspect(configPayload)}`);

      ctx.currentDeploymentGroup = currentDeploymentGroup;

      this.updateDeploymentGroup({
        id: ctx.currentDeploymentGroup.id,
        status: 'PROVISIONING'
      }, (err) => {
        if (err) {
          return cb(err);
        }

        this.getConfig(configPayload, handleConfig);
      });
    };

    // 1. fetch current deployment group
    this.getDeploymentGroup({
      id: clientManifest.deploymentGroupId
    }, handleDeploymentGroup);
  }

  createManifest (clientManifest, cb) {
    this._server.log(['debug'], `-> creating new Manifest ${Util.inspect(clientManifest)}`);

    const newManifest = Transform.toManifest(clientManifest);
    this._db.manifests.insert(newManifest, (err, manifestId) => {
      if (err) {
        return cb(err);
      }

      this._server.log(['debug'], `-> new Manifest created with id ${manifestId}`);

      clientManifest.id = manifestId;
      cb(null, Transform.fromManifest(clientManifest));
    });
  }

  getManifest ({ id }, cb) {
    this._db.manifests.single({ id }, (err, manifest) => {
      if (err) {
        return cb(err);
      }

      cb(null, Transform.fromManifest(manifest || {}));
    });
  }

  getManifests ({ type, deploymentGroupId }, cb) {
    const query = type ? { type } : { deployment_group_id: deploymentGroupId };
    this._db.manifests.query(query, (err, manifests) => {
      if (err) {
        return cb(err);
      }

      manifests = manifests || [];
      cb(null, manifests.map(Transform.fromManifest));
    });
  }

  createService (clientService, cb) {
    const newService = Object.assign(Transform.toService(clientService), {
      active: true
    });

    this._db.services.insert(newService, (err, key) => {
      if (err) {
        return cb(err);
      }

      clientService.id = key;
      cb(null, clientService);
    });
  }

  updateService (clientService, cb) {
    const payload = Transform.toService(clientService);
    this._server.log(['debug'], `-> got update Service request ${Util.inspect(payload)}`);

    this._db.services.update([payload], (err) => {
      if (err) {
        return cb(err);
      }

      this.getService({ id: clientService.id }, cb);
    });
  }

  getService ({ id, hash }, cb) {
    const query = id ? { id } : { version_hash: hash };
    this._server.log(['debug'], `-> fetching Service ${Util.inspect(query)}`);
    this._db.services.query(query, (err, services) => {
      if (err) {
        return cb(err);
      }

      if (!services || !services.length) {
        this._server.log(['debug'], `-> Service ${Util.inspect(query)} not found`);
        return cb(Boom.notFound());
      }

      const service = services.shift();

      this._server.log(['debug'], `-> Service ${Util.inspect(query)} found ${Util.inspect(service)}`);

      const branches = ForceArray(service.branches).map((branch) => {
        return Object.assign({}, branch, {
          instances: this._instancesFilter(branch.instances)
        });
      }).filter(({ name }) => { return name; });

      return cb(null, Transform.fromService({
        service,
        branches,
        instances: this._instancesFilter(service.instance_ids)
      }));
    });
  }

  _getDeploymentGroupServices (deploymentGroupSlug, cb) {
    this.getDeploymentGroup({ slug: deploymentGroupSlug }, (err, deploymentGroup) => {
      if (err) {
        return cb(err);
      }

      if (!deploymentGroup) {
        return cb(Boom.notFound());
      }

      return this.getServices({ deploymentGroupId: deploymentGroup.id }, cb);
    });
  }

  getServices (options, cb) {
    if (options.deploymentGroupSlug) {
      return this._getDeploymentGroupServices(options.deploymentGroupSlug, cb);
    }

    const query = {};
    if (options.ids && options.ids.length) {
      query.id = this._db.or(options.ids);
    }

    if (options.name) {
      query.name = options.name;
    }

    if (options.slug) {
      query.slug = options.slug;
    }

    if (options.parentId) {
      query.parent_id = options.parentId;
    }

    if (options.deploymentGroupId) {
      query.deployment_group_id = options.deploymentGroupId;
    }

    this._db.services.query(query, (err, services) => {
      if (err) {
        return cb(err);
      }

      if (((options.ids && options.ids.length) || query.name || query.slug) && (!services || !services.length)) {
        return cb(Boom.notFound());
      }

      if (!services || !services.length) {
        return cb();
      }

      return cb(null, services.map((service) => {
        const branches = ForceArray(service.branches).map((branch) => {
          return Object.assign({}, branch, {
            instances: this._instancesFilter(branch.instances)
          });
        }).filter(({ name }) => { return name; });

        return Transform.fromService({
          service,
          branches,
          instances: this._instancesFilter(service.instance_ids)
        });
      }));
    });
  }

  _instancesFilter (instanceIds = []) {
    return (query, cb) => {
      query = query || {};
      query.ids = instanceIds;

      if (typeof cb === 'function') {
        return instanceIds && instanceIds.length ?
          this.getInstances(query, cb) :
          cb(null, []);
      }

      return new Promise((resolve, reject) => {
        return instanceIds && instanceIds.length ?
          this.getInstances(query, internals.resolveCb(resolve, reject)) :
          resolve([]);
      });
    };
  }

  stopServices ({ ids }, cb) {
    const revertStatus = (err1, cb) => {
      if (err1) {
        console.error(err1);
      }

      VAsync.forEachParallel({
        inputs: ids,
        func: (serviceId, next) => {
          this.updateService({
            id: serviceId,
            status: 'ACTIVE'
          }, next);
        }
      }, (err2) => {
        if (err2) {
          console.error(err2);
        }

        if (cb) {
          cb(err1 || err2);
        }
      });
    };

    const handleUpdatedServices = ({
      currentServices
    }) => {
      return (err, result) => {
        if (err) {
          return revertStatus(err, cb);
        }

        cb(null, result.successes);

        setImmediate(() => {
          const instanceIds = currentServices.reduce((instanceIds, service) => {
            return instanceIds.concat(service.instance_ids);
          }, []);

          VAsync.forEachParallel({
            inputs: instanceIds,
            func: (instanceId, next) => {
              this._db.instances.get(instanceId, (err, instance) => {
                if (err) {
                  return next(err);
                }

                if (!this._triton) {
                  return next();
                }

                this._triton.stopMachine(instance.machine_id, next);
              });
            }
          }, (err) => {
            if (err) {
              console.error(err);
            }
          });
        });
      };
    };

    const handleCurrentServices = (err, currentServices) => {
      if (err) {
        return cb(err);
      }

      if (!currentServices || !currentServices.length) {
        return cb();
      }

      VAsync.forEachParallel({
        inputs: ids,
        func: (serviceId, next) => {
          this.updateService({
            id: serviceId,
            status: 'STOPPING'
          }, next);
        }
      }, handleUpdatedServices({
        currentServices
      }));
    };

    this._db.services.get(ids, handleCurrentServices);
  }

  startServices ({ ids }, cb) {
    const revertStatus = (err1, cb) => {
      if (err1) {
        console.error(err1);
      }

      VAsync.forEachParallel({
        inputs: ids,
        func: (serviceId, next) => {
          this.updateService({
            id: serviceId,
            status: 'ACTIVE'
          }, next);
        }
      }, (err2) => {
        if (err2) {
          console.error(err2);
        }

        if (cb) {
          cb(err1 || err2);
        }
      });
    };

    const handleUpdatedServices = ({
      currentServices
    }) => {
      return (err, result) => {
        if (err) {
          return revertStatus(err, cb);
        }

        cb(null, result.successes);

        setImmediate(() => {
          const instanceIds = currentServices.reduce((instanceIds, service) => {
            return instanceIds.concat(service.instance_ids);
          }, []);

          VAsync.forEachParallel({
            inputs: instanceIds,
            func: (instanceId, next) => {
              this._db.instances.get(instanceId, (err, instance) => {
                if (err) {
                  return next(err);
                }

                if (!this._triton) {
                  return next();
                }

                this._triton.startMachine(instance.machine_id, next);
              });
            }
          }, (err) => {
            if (err) {
              console.error(err);
            }
          });
        });
      };
    };

    const handleCurrentServices = (err, currentServices) => {
      if (err) {
        return cb(err);
      }

      if (!currentServices || !currentServices.length) {
        return cb();
      }

      VAsync.forEachParallel({
        inputs: ids,
        func: (serviceId, next) => {
          this.updateService({
            id: serviceId,
            status: 'ACTIVE'
          }, next);
        }
      }, handleUpdatedServices({
        currentServices
      }));
    };

    this._db.services.get(ids, handleCurrentServices);
  }

  restartServices ({ ids }, cb) {
    // 1. update all services statuses to RESTARTING
    // 2. get all instances
    // 3. restart all instances
    // 4. revert service status

    const revertStatus = (err1, cb) => {
      if (err1) {
        console.error(err1);
      }

      VAsync.forEachParallel({
        inputs: ids,
        func: (serviceId, next) => {
          this.updateService({
            id: serviceId,
            status: 'ACTIVE'
          }, next);
        }
      }, (err2) => {
        if (err2) {
          console.error(err2);
        }

        if (cb) {
          cb(err1 || err2);
        }
      });
    };

    const handleUpdatedServices = ({
      currentServices
    }) => {
      return (err, result) => {
        if (err) {
          return revertStatus(err, cb);
        }

        cb(null, result.successes);

        setImmediate(() => {
          const instanceIds = currentServices.reduce((instanceIds, service) => {
            return instanceIds.concat(service.instance_ids);
          }, []);

          VAsync.forEachParallel({
            inputs: instanceIds,
            func: (instanceId, next) => {
              this._db.instances.get(instanceId, (err, instance) => {
                if (err) {
                  return next(err);
                }

                if (!this._triton) {
                  return next();
                }

                this._triton.rebootMachine(instance.machine_id, next);
              });
            }
          }, revertStatus);
        });
      };
    };

    const handleCurrentServices = (err, currentServices) => {
      if (err) {
        return cb(err);
      }

      if (!currentServices || !currentServices.length) {
        return cb();
      }

      VAsync.forEachParallel({
        inputs: ids,
        func: (serviceId, next) => {
          this.updateService({
            id: serviceId,
            status: 'RESTARTING'
          }, next);
        }
      }, handleUpdatedServices({
        currentServices
      }));
    };

    this._db.services.get(ids, handleCurrentServices);
  }

  deleteServices ({ ids }, cb) {
    const revertStatus = (err1, cb) => {
      if (err1) {
        console.error(err1);
      }

      VAsync.forEachParallel({
        inputs: ids,
        func: (serviceId, next) => {
          this.updateService({
            id: serviceId,
            status: 'ACTIVE'
          }, next);
        }
      }, (err2) => {
        if (err2) {
          console.error(err2);
        }

        if (cb) {
          cb(err1 || err2);
        }
      });
    };

    const handleUpdatedServices = ({
      currentServices
    }) => {
      return (err, result) => {
        if (err) {
          return revertStatus(err, cb);
        }

        cb(null, result.successes);

        setImmediate(() => {
          const instanceIds = currentServices.reduce((instanceIds, service) => {
            return instanceIds.concat(service.instance_ids);
          }, []);

          VAsync.forEachParallel({
            inputs: instanceIds,
            func: (instanceId, next) => {
              this._db.instances.get(instanceId, (err, instance) => {
                if (err) {
                  return next(err);
                }

                if (!this._triton) {
                  return next();
                }

                this._triton.deleteMachine(instance.machine_id, next);
              });
            }
          }, (err) => {
            if (err) {
              console.error(err);
            }
          });
        });
      };
    };

    const handleCurrentServices = (err, currentServices) => {
      if (err) {
        return cb(err);
      }

      if (!currentServices || !currentServices.length) {
        return cb();
      }

      VAsync.forEachParallel({
        inputs: ids,
        func: (serviceId, next) => {
          this.updateService({
            id: serviceId,
            status: 'DELETING'
          }, next);
        }
      }, handleUpdatedServices({
        currentServices
      }));
    };

    this._db.services.get(ids, handleCurrentServices);
  }


  // instances

  createInstance (clientInstance, cb) {
    this._db.instances.insert(Transform.toInstance(clientInstance), (err, key) => {
      if (err) {
        return cb(err);
      }

      clientInstance.id = key;
      cb(null, clientInstance);
    });
  }

  getMetricsForInstance (instance) {
    return ({ names, start, end }) => {
      if (instance.status.toUpperCase() !== 'RUNNING') {
        return Promise.resolve([]);
      }

      return new Promise((resolve, reject) => {
        const options = {
          deploymentGroupId: instance.deployment_group_id,
          instances: [instance.id],
          names,
          start,
          end
        };

        this.getMetrics(options, (err, metrics) => {
          return err ? reject(err) : resolve(metrics);
        });
      });
    };
  }

  getInstance ({ id }, cb) {
    this._db.instances.single({ id }, (err, instance) => {
      if (err) {
        return cb(err);
      }

      if (!instance) {
        return cb(Boom.notFound());
      }

      cb(null, Transform.fromInstance({ instance, metrics: this.getMetricsForInstance(instance) }));
    });
  }

  getInstances ({ ids, name, machineId, status }, cb) {
    const query = {};

    if (ids) {
      query.id = this._db.or(ids);
    }

    if (name) {
      query.name = name;
    }

    if (machineId) {
      query.machine_id = machineId;
    }

    if (status) {
      query.status = status;
    }

    this._db.instances.query(query, (err, instances) => {
      if (err) {
        return cb(err);
      }

      if (((ids && ids.length) || name || machineId) && (!instances || !instances.length)) {
        return cb(Boom.notFound());
      }

      if (!instances || !instances.length) {
        return cb(null, []);
      }

      cb(null, instances.map((instance) => {
        return Transform.fromInstance({ instance, metrics: this.getMetricsForInstance(instance) });
      }));
    });
  }

  updateInstance (clientInstance, cb) {
    const instance = Transform.toInstance(clientInstance);

    this._db.instances.update([instance], (err) => {
      if (err) {
        return cb(err);
      }

      this.getInstance({ id: instance.id }, cb);
    });
  }

  stopInstances ({ ids }, cb) {
    this._db.instances.get(ids, (err, instances) => {
      if (err) {
        return cb(err);
      }

      if (!instances || !instances.length) {
        return cb();
      }

      VAsync.forEachParallel({
        func: (instance, next) => {
          if (!this._triton) {
            return next();
          }

          this._triton.stopMachine(instance.machine_id, next);
        },
        inputs: instances
      }, (err) => {
        if (err) {
          return cb(err);
        }

        this.getInstances({ ids }, cb);
      });
    });
  }

  startInstances ({ ids }, cb) {
    this._db.instances.get(ids, (err, instances) => {
      if (err) {
        return cb(err);
      }

      if (!instances || !instances.length) {
        return cb();
      }

      VAsync.forEachParallel({
        func: (instance, next) => {
          if (!this._triton) {
            return next();
          }

          this._triton.startMachine(instance.machine_id, (err) => {
            if (err) {
              return next(err);
            }

            const container = this._docker.getContainer(instance.machine_id.split(/-/)[0]);

            // Update the IPAddress for the instance
            container.inspect((err, details) => {
              if (err) {
                return next(err);
              }

              this._db.instances.update(instance.id, {
                ips: [details.NetworkSettings.IPAddress]
              }, next);
            });
          });
        },
        inputs: instances
      }, (err) => {
        if (err) {
          return cb(err);
        }

        this.getInstances({ ids }, cb);
      });
    });
  }

  restartInstances ({ ids }, cb) {
    this._db.instances.get(ids, (err, instances) => {
      if (err) {
        return cb(err);
      }

      if (!instances || !instances.length) {
        return cb();
      }

      VAsync.forEachParallel({
        func: (instance, next) => {
          if (!this._triton) {
            return next();
          }

          this._triton.rebootMachine(instance.machine_id, next);
        },
        inputs: instances
      }, (err) => {
        if (err) {
          return cb(err);
        }

        this.getInstances({ ids }, cb);
      });
    });
  }


  // packages

  createPackage (clientPackage, cb) {
    this._db.packages.insert(Transform.toPackage(clientPackage), (err, key) => {
      if (err) {
        return cb(err);
      }

      clientPackage.id = key;
      cb(null, clientPackage);
    });
  }

  getPackage ({ id }, cb) {
    this._db.packages.single({ id }, (err, dbPackage) => {
      if (err) {
        return cb(err);
      }

      if (!dbPackage) {
        return cb(Boom.notFound());
      }

      cb(null, Transform.fromPackage(dbPackage));
    });
  }

  getPackages ({ name, type }, cb) {
    const query = name ? { name } : { type };
    this._db.packages.query(query, (err, dbPackages) => {
      if (err) {
        return cb(err);
      }

      cb(null, dbPackages ? dbPackages.map(Transform.fromPackage) : []);
    });
  }

  getConfig ({deploymentGroupName = '', type = '', format = '', environment = '', files = [], raw = '' }, cb) {
    if (type.toUpperCase() !== 'COMPOSE') {
      return cb(new Error('"COMPOSE" is the only `type` supported'));
    }

    if (format.toUpperCase() !== 'YAML') {
      return cb(new Error('"YAML" is the only `format` supported'));
    }

    let isFinished = false;

    this._dockerCompose.config({
      projectName: deploymentGroupName,
      environment,
      files: internals.fromKeyValueToDict(files),
      manifest: raw
    }, (err, config = {}) => {
      if (err) {
        return cb(err);
      }

      if (isFinished) {
        return;
      }

      isFinished = true;

      const { services } = config;

      if (!services || !Object.keys(services).length) {
        return cb(null, []);
      }

      cb(null, Object.keys(services).reduce((acc, serviceName) => {
        const environment = Get(services, `${serviceName}.environment`, {});
        const labels = Get(services, `${serviceName}.labels`, {});
        const ports = Get(services, `${serviceName}.ports`, []);
        const image = Get(services, `${serviceName}.image`, '');

        const toKeyValue = (v) => {
          return Object.keys(v).map((key) => {
            return {
              id: Uuid(),
              name: key,
              value: v[key]
            };
          });
        };

        return acc.concat([{
          id: Uuid(),
          hash: Uuid(),
          name: serviceName,
          slug: ParamCase(serviceName),
          instances: [],
          config: {
            id: Uuid(),
            environment: toKeyValue(environment),
            image: image,
            labels: toKeyValue(labels),
            ports: ports
          }
        }]);
      }, []));
    });
  }

  getImportableDeploymentGroups (args, cb) {
    if (!this._machines) {
      return cb(null, []);
    }

    const machines = this._machines.getContainers();

    if (!Array.isArray(machines)) {
      return cb(null, []);
    }

    this.getDeploymentGroups({}, (err, dgs) => {
      if (err) {
        return cb(err);
      }

      const names = dgs.map(({ name }) => {
        return name;
      });

      return cb(
        null,
        UniqBy(
          machines
            .filter(({ tags = {} }) => {
              return names.indexOf(tags[DEPLOYMENT_GROUP]) < 0;
            })
            .filter(({ state }) => {
              return NON_IMPORTABLE_STATES.indexOf(state.toUpperCase()) < 0;
            })
            .filter(({ tags = {} }) => {
              return [DEPLOYMENT_GROUP, SERVICE, HASH].every((name) => {
                return tags[name];
              });
            })
            .map(({ tags = {} }) => {
              return ({
                id: Uuid(),
                name: tags[DEPLOYMENT_GROUP],
                slug: ParamCase(tags[DEPLOYMENT_GROUP])
              });
            }),
          'slug'
        )
      );
    });
  }

  importDeploymentGroup ({ deploymentGroupSlug }, cb) {
    this._server.log(['debug'], `-> import requested for ${deploymentGroupSlug}`);

    if (!this._machines) {
      this._server.log(['debug'], '-> watcher not yet defined');
      return cb(null, null);
    }

    const machines = this._machines.getContainers();

    if (!Array.isArray(machines)) {
      this._server.log(['debug'], '-> no machines found');
      return cb(null, null);
    }

    const containers = machines
      .filter(
        ({ tags = {} }) => {
          return tags[DEPLOYMENT_GROUP] && ParamCase(tags[DEPLOYMENT_GROUP]) === deploymentGroupSlug;
        }
      )
      .filter(
        ({ state }) => {
          return NON_IMPORTABLE_STATES.indexOf(state.toUpperCase()) < 0;
        }
      );

    if (!containers.length) {
      this._server.log(['debug'], `-> no containers found for ${deploymentGroupSlug}`);
      return cb(null, null);
    }

    const { tags = [] } = containers[0];

    const services = containers.reduce((acc, { tags = [], id = '', state = '', name = '' }) => {
      const hash = tags[HASH];
      const slug = ParamCase(tags[SERVICE]);
      const attr = `${hash}-${slug}`;

      const instance = {
        name: name,
        machineId: id,
        status: state.toUpperCase()
      };

      if (acc[attr]) {
        acc[attr].instances.push(instance);
        return acc;
      }

      return Object.assign(acc, {
        [attr]: {
          hash,
          name: tags[SERVICE],
          status: 'ACTIVE',
          slug,
          instances: [instance]
        }
      });
    }, {});

    const handleNewInstances = ({ id }, next) => {
      return (err, result) => {
        if (err) {
          return next(err);
        }

        this._server.log(['debug'], `-> created Instances ${Util.inspect(result.successes)}`);

        this.updateService({
          id,
          instances: result.successes
        }, next);
      };
    };

    const handleNewService = ({ instances, deploymentGroupId }, next) => {
      return (err, service) => {
        if (err) {
          return next(err);
        }

        VAsync.forEachParallel({
          inputs: instances,
          func: (instance, next) => {
            return this.createInstance(Object.assign(instance, {
              deploymentGroupId,
              serviceId: service.id
            }), next);
          }
        }, handleNewInstances(service, next));
      };
    };

    const createService = (deploymentGroupId) => {
      return (serviceIndex, next) => {
        const service = services[serviceIndex];

        this._server.log(['debug'], `-> creating Service ${Util.inspect(service)}`);

        this.createService(Object.assign(service, {
          deploymentGroupId
        }), handleNewService({
          instances: service.instances,
          deploymentGroupId
        }, next));
      };
    };

    const handleNewServices = (deploymentGroupId) => {
      return (err, result) => {
        if (err) {
          return cb(err);
        }

        this.updateDeploymentGroup({
          id: deploymentGroupId,
          services: result.successes
        }, cb);
      };
    };

    const handleNewDeploymentGroup = (err, dg) => {
      if (err) {
        return cb(err);
      }

      VAsync.forEachParallel({
        inputs: Object.keys(services),
        func: createService(dg.id)
      }, handleNewServices(dg.id));
    };

    const deploymentGroup = {
      name: tags[DEPLOYMENT_GROUP],
      slug: ParamCase(tags[DEPLOYMENT_GROUP]),
      status: 'ACTIVE',
      imported: true
    };

    this._server.log(['debug'], `-> creating DeploymentGroup ${Util.inspect(deploymentGroup)}`);

    this.createDeploymentGroup(deploymentGroup, handleNewDeploymentGroup);
  }

  // copied from container-pilot-watcher. todo: refactor
  _getNetworks (networkIds = [], cb) {
    VAsync.forEachParallel({
      inputs: networkIds,
      func: (id, next) => {
        this._triton.getNetwork(id, next);
      }
    }, (err, results) => {
      cb(err, ForceArray((results || {}).successes));
    });
  }

  // copied from container-pilot-watcher. todo: refactor
  _getPublicIps (machine, cb) {
    this._getNetworks(machine.networks, (err, networks) => {
      if (err) {
        return cb(err);
      }

      const privateNetworkSubnets = networks
        .filter((network) => {
          return !network['public'];
        })
        .map((network) => {
          return network.subnet;
        })
        .filter(Boolean);

      const cidr = new CIDRMatcher(privateNetworkSubnets);

      const nonPrivateIps = machine.ips.filter((ip) => {
        return !cidr.contains(ip);
      });

      cb(null, nonPrivateIps);
    });
  }


  getMetrics ({ deploymentGroupId, names, instances, start, end }, cb) {
    Hoek.assert(deploymentGroupId !== undefined, 'deploymentGroupId is required');
    Hoek.assert(names && names.length, 'names are required');
    Hoek.assert(instances && instances.length, 'instances are required');

    const metricNames = [
      'mem_agg_usage',
      'cpu_sys_usage',
      'net_agg_bytes_in'
    ];

    const metricNameEnum = [
      'AVG_MEM_BYTES',
      'AVG_LOAD_PERCENT',
      'AGG_NETWORK_BYTES'
    ];

    const ctx = {};

    const handleMetrics = (err, results) => {
      if (err) {
        return cb(err);
      }

      const metrics = results.successes.filter(Boolean).shift();

      if (!metrics) {
        return cb(null, []);
      }

      const formattedMetrics = metrics.map((metric) => {
        const i = metricNames.indexOf(metric.name);

        if (i !== -1) {
          metric.name = metricNameEnum[i];
        }

        metric.metrics = metric.metrics.map((entry) => {
          return Object.assign(entry, {
            time: entry.time.toISOString()
          });
        });

        return Object.assign(metric, {
          start: metric.metrics[0].time,
          end: metric.metrics[metric.metrics.length - 1].time
        });
      });

      cb(null, formattedMetrics);
    };

    const fetchMetrics = (ip, next) => {
      const formattedNames = names.map((name) => {
        const i = metricNameEnum.indexOf(name);
        return (i === -1) ? name : metricNames[i];
      });

      const prometheus = new Prometheus({ url: `http://${ip}:9090` });

      prometheus.getMetrics({
        names: formattedNames,
        instances: ctx.machines.map(({ name }) => { return name; }),
        start,
        end
      }, (err, metrics) => {
        if (err) {
          console.error(err);
        }

        next(null, metrics);
      });
    };

    const handlePrometheusMachine = (err, machine) => {
      if (err) {
        return cb(err);
      }

      this._getPublicIps(machine, (err, ips) => {
        if (err) {
          return cb(err);
        }

        VAsync.forEachParallel({
          inputs: ips,
          func: fetchMetrics
        }, handleMetrics);
      });
    };

    const handlePrometheusInstances = (instances) => {
      if (!instances.length) {
        return cb(null, []);
      }

      const { machineId } = instances.shift();
      this._triton.getMachine(machineId, handlePrometheusMachine);
    };

    const handlePrometheusServices = (err, services) => {
      if (err && internals.isNotFound(err)) {
        return cb(null, []);
      }

      if (err) {
        return cb(err);
      }

      if (!services.length) {
        return cb(null, []);
      }

      services.shift()
        .instances()
        .then(handlePrometheusInstances)
        .catch(cb);
    };

    const handleMachines = (err, machines) => {
      if (err) {
        return cb(err);
      }

      ctx.machines = machines.successes;

      this.getServices({
        deploymentGroupId,
        name: 'prometheus'
      }, handlePrometheusServices);
    };

    this.getInstances({
      ids: instances
    }, (err, instances) => {
      if (err) {
        return cb(err);
      }

      ctx.instances = instances;

      VAsync.forEachParallel({
        inputs: instances,
        func: ({ machineId }, next) => {
          this._triton.getMachine(machineId, next);
        }
      }, handleMachines);
    });
  }
}

module.exports = Data;
module.exports.UNKNOWN_INSTANCE_ID = UNKNOWN_INSTANCE_ID;
module.exports.NEW_INSTANCE_ID = NEW_INSTANCE_ID;
