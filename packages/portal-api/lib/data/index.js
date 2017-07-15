
'use strict';

// core modules
const EventEmitter = require('events');
const Util = require('util');

// 3rd party modules
// const CPClient = require('cp-client');
const DockerClient = require('docker-compose-client');
const Dockerode = require('dockerode');
const Hoek = require('hoek');
const Triton = require('triton');
const ParamCase = require('param-case');
const Penseur = require('penseur');
const UniqBy = require('lodash.uniqby');
const Find = require('lodash.find');
const Get = require('lodash.get');
const Flatten = require('lodash.flatten');
const ForceArray = require('force-array');
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

const internals = {
  defaults: {
    name: 'portal',
    db: {
      test: false
    },
    dockerComposeHost: 'tcp://0.0.0.0:4242'
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
  }
};


class Data extends EventEmitter {
  constructor (options) {
    super();

    const settings = Hoek.applyToDefaults(internals.defaults, options || {});

    // Penseur will assert that the options are correct
    this._db = new Penseur.Db(settings.name, settings.db);
    this._dockerCompose = new DockerClient(settings.dockerComposeHost);
    this._docker = new Dockerode(settings.docker);
    this._machines = null;
    this._triton = null;

    Triton.createClient({
      profile: settings.triton
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

  fromKeyValueToDict(kv) {
    return kv.reduce((acc, { name, value }) => {
      return Object.assign(acc, {
        [name]: value
      });
    }, {});
  }


  // triton

  _listMachines (deploymentGroupName, cb) {
    this._triton.listMachines({
      limit: 9999,
      tag: {
        [DEPLOYMENT_GROUP]: deploymentGroupName
      }
    }, cb);
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
    const deploymentGroup = Transform.toDeploymentGroup(clientDeploymentGroup);
    this._db.deployment_groups.query({
      slug: deploymentGroup.slug
    }, (err, deploymentGroups) => {
      if (err) {
        return cb(err);
      }

      if (deploymentGroups && deploymentGroups.length) {
        return cb(new Error(`DeploymentGroup "${deploymentGroup.slug}" already exists (${deploymentGroups[0].id})`));
      }

      this._db.deployment_groups.insert(deploymentGroup, (err, key) => {
        if (err) {
          return cb(err);
        }

        deploymentGroup.id = key;
        cb(null, Transform.fromDeploymentGroup(deploymentGroup));
      });
    });
  }

  updateDeploymentGroup (clientDeploymentGroup, cb) {
    this._db.deployment_groups.update([Transform.toDeploymentGroup(clientDeploymentGroup)], (err) => {
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
        return this.getServices(args, cb);
      }

      return new Promise((resolve, reject) => {
        this.getServices(args, internals.resolveCb(resolve, reject));
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
        return this.getHistory(args, cb);
      }

      return new Promise((resolve, reject) => {
        return this.getHistory(args, internals.resolveCb(resolve, reject));
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
        return cb();
      }

      cb(null, Transform.fromDeploymentGroup(this._getDeploymentGroupFns(deploymentGroups[0])));
    });
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

    console.log(`-> creating new Version for DeploymentGroup ${clientVersion.deploymentGroupId}: ${Util.inspect(clientVersion)}`);

    const version = Transform.toVersion(clientVersion);
    this._db.versions.insert(version, (err, key) => {
      if (err) {
        return cb(err);
      }

      console.log(`-> new Version for DeploymentGroup ${clientVersion.deploymentGroupId} created: ${key}`);
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

        console.log(`-> updating DeploymentGroup ${clientVersion.deploymentGroupId} to add Version ${key}`);

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

  _calcCurrentScale ({ config, currentVersion }, cb) {
    return config.map(({ name }) => {
      const currentScale = Find(ForceArray(currentVersion.scale), [
        'serviceName',
        name
      ]);

      return {
        id: Uuid(),
        serviceName: name,
        replicas: Number.isFinite(currentScale) ? currentScale : 1
      };
    });
  }

  _getCurrentScale ({ deploymentGroupName, config, currentVersion }, cb) {
    const fallback = (err) => {
      if (err) {
        console.error(err);
      }

      this._calcCurrentScale({ config, currentVersion }, cb);
    };

    if (!this._triton) {
      return fallback();
    }

    const handleMachinesList = (err, machines) => {
      if (err) {
        return fallback(err);
      }

      const liveServices = ForceArray(machines).reduce((acc, { tags }) => {
        return Object.assign(acc, {
          [tags[SERVICE]]: 1
        });
      }, {});

      const allAndConfigServices = config.reduce((acc, { name }) => {
        return Object.assign(acc, {
          [name]: 1
        });
      }, liveServices);

      const scale = Object.keys(allAndConfigServices).map((name) => {
        const existingMachines = ForceArray(machines).filter((machine) => {
          return machine.tags[SERVICE] === name;
        });

        return {
          id: Uuid(),
          serviceName: name,
          replicas: existingMachines.length ? existingMachines.length : 1
        };
      });

      cb(null, scale);
    };

    this._listMachines(deploymentGroupName, handleMachinesList);
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

    console.log('-> scale request received');

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

      console.log(`-> got response from docker-compose to scale ${ctx.service.name} to ${replicas} replicas`);
    };

    const triggerScale = (err, newVersion) => {
      if (err) {
        return handleFailedScale(err, cb);
      }

      console.log('-> new Version created');

      cb(null, newVersion);

      setImmediate(() => {
        console.log(`-> requesting docker-compose to scale ${ctx.service.name} to ${replicas} replicas`);

        this._dockerCompose.scale({
          projectName: ctx.deploymentGroup.name,
          environment: ctx.manifest.environment,
          files: this.fromKeyValueToDict(ctx.manifest.files),
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

      console.log(`-> creating new Version for DOWN scale ${Util.inspect(payload)}`);

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

      console.log(`-> creating new Version for UP scale ${Util.inspect(payload)}`);

      // note: createVersion updates deploymentGroup
      this.createVersion(payload, triggerScale);
    };

    const handleCurrentScale = (err, currentScale) => {
      if (err) {
        return handleFailedScale(err, cb);
      }

      console.log(`-> got current scale ${Util.inspect(currentScale)}`);

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

      console.log('-> fetching current scale');

      this._getCurrentScale({
        deploymentGroupName: ctx.deploymentGroup.name,
        currentVersion: ctx.version,
        config: [{
          name: ctx.service.name
        }]
      }, handleCurrentScale);
    };

    const handleVersion = (err, version) => {
      if (err) {
        return handleFailedScale(err, cb);
      }

      if (!version) {
        return cb(new Error(`Version not found for service with service id: ${serviceId}`));
      }

      ctx.version = version;

      console.log(`-> fetching Manifest ${version.manifest_id}`);

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

      console.log(`-> fetching Version ${ctx.deploymentGroup.version_id}`);

      this._db.versions.single({
        id: deploymentGroup.version_id
      }, handleVersion);
    };

    const handleInstances = (err, instances = []) => {
      if (err) {
        return handleFailedScale(err, cb);
      }

      console.log(`-> got ${instances.length} Instances from ${ctx.service.name}`);

      ctx.instances = instances;

      console.log(`-> fetching DeploymentGroup ${ctx.service.deployment_group_id}`);

      this._db.deployment_groups.single({
        id: ctx.service.deployment_group_id
      }, handleDeploymentGroup);
    };

    const handleUpdatedService = (err) => {
      if (err) {
        return handleFailedScale(err, cb);
      }

      console.log(`-> fetching Instances from ${ctx.service.name}`);

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

      console.log(`-> fetching DeploymentGroup ${service.deployment_group_id}`);

      this.updateService({
        id: serviceId,
        status: 'SCALING'
      }, handleUpdatedService);
    };

    console.log(`-> fetching Service ${serviceId}`);

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

    console.log('-> provision request received');

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

      console.log(`-> got a map of Service's-Instance's from DeploymentGroup ${ctx.currentDeploymentGroup.id} ${Util.inspect(services)}`);

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
            console.log(`-> updating Version ${ctx.newVersion.id} from DeploymentGroup ${ctx.currentDeploymentGroup.id} with new Plan ${Util.inspect(plan)}`);
            return this.updateVersion({
              id: ctx.newVersion.id,
              hasPlan: true,
              plan
            }, cb);
          },
          (cb) => {
            console.log(`-> updating DeploymentGroup ${ctx.currentDeploymentGroup.id} with new Service's ${Util.inspect(ctx.newServices)} and ACTIVE status`);

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

      console.log(`-> marked removed Service's with DELETING from DeploymentGroup ${ctx.currentDeploymentGroup.id}`);
      console.log(`-> fetching a map of Service's-Instance's from DeploymentGroup ${ctx.currentDeploymentGroup.id}`);

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

      console.log(`-> identified previous Service's from DeploymentGroup ${ctx.currentDeploymentGroup.id} ${Util.inspect(ctx.previousServices)}`);

      ctx.previousServices = previousServices;

      // 12. for existing service, check if it still exists on this provision. if it doesn't update to mark DELETING
      ctx.removedServices = previousServices.filter(({ name }) => {
        return !Find(ctx.newServices, ['name', name]);
      });

      console.log(`-> identified removed Service's from DeploymentGroup ${ctx.currentDeploymentGroup.id} ${Util.inspect(ctx.removedServices)}`);

      VAsync.forEachParallel({
        inputs: ctx.removedServices,
        func: ({ id, name }, next) => {
          console.log(`-> marking Service ${name} as DELETING from DeploymentGroup ${ctx.currentDeploymentGroup.id}`);
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

      console.log(`-> got "${ctx.newServices.length}" Services provisioned from DeploymentGroup ${ctx.currentDeploymentGroup.id}`);

      ctx.currentDeploymentGroup.services({}, handlePreviousServices);
    };

    const createProvisionService = ({ payload }, cb) => {
      console.log(`-> creating Service "${payload.name}" from DeploymentGroup ${ctx.currentDeploymentGroup.id}`);
      this.createService(payload, cb);
    };

    const updateProvisionService = ({ payload, serviceId }, cb) => {
      console.log(`-> updating Service "${payload.name}" from DeploymentGroup ${ctx.currentDeploymentGroup.id}`);
      this.updateService(Object.assign({}, payload, {
        id: serviceId
      }), cb);
    };

    // 10. on each service, either create or update it with new status and hash
    const handleProvisionService = (serviceName, next) => {
      console.log(`-> handling Service "${serviceName}" from DeploymentGroup ${ctx.currentDeploymentGroup.id}`);

      this.getServices({
        name: serviceName,
        deploymentGroupId: ctx.currentDeploymentGroup.id
      }, (err, services = []) => {
        if (err) {
          return next(err);
        }

        console.log(`-> got ${services.length} services with name ${serviceName} from DeploymentGroup ${ctx.currentDeploymentGroup.id}`);

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

      console.log(`-> got response from provision ${Util.inspect(provisionRes)}`);

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
        console.log(`-> requesting docker-compose provision for DeploymentGroup ${ctx.currentDeploymentGroup.name}`);

        this._dockerCompose.provision({
          projectName: ctx.currentDeploymentGroup.name,
          environment: clientManifest.environment,
          files: this.fromKeyValueToDict(clientManifest.files),
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

      console.log(`-> got current scale ${Util.inspect(currentScale)}`);

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
        console.log(`-> detected first provision for DeploymentGroup ${ctx.currentDeploymentGroup.id}`);
      } else {
        console.log(`-> creating new Version based on old Version ${currentVersion.id}`);
      }

      ctx.currentVersion = currentVersion;

      this._getCurrentScale({
        deploymentGroupName: ctx.currentDeploymentGroup.name,
        config: ctx.config,
        currentVersion
      }, handleCurrentScale);
    };

    // 4. handle new version
    // 5. fetch current version
    const handleNewManifest = (err, newManifest) => {
      if (err) {
        return cb(err);
      }

      console.log(`-> fetching current version for ${ctx.currentDeploymentGroup.id}`);

      ctx.newManifest = newManifest;
      ctx.currentDeploymentGroup.version(null, handleCurrentVersion);
    };

    // 3. handle docker-compose config for the given manifest
    // 4. create a new manifest
    const handleConfig = (err, config) => {
      if (err) {
        return cb(err);
      }

      console.log(`-> got docker-compose config ${Util.inspect(config)}`);

      ctx.config = config;

      this.createManifest(clientManifest, handleNewManifest);
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

      console.log(`-> DeploymentGroup found with id ${currentDeploymentGroup.id}`);

      const configPayload = Object.assign({}, clientManifest, {
        deploymentGroupName: currentDeploymentGroup.name
      });

      console.log(`-> requesting docker-compose config for manifest ${Util.inspect(configPayload)}`);

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
    console.log(`-> creating new Manifest ${Util.inspect(clientManifest)}`);

    const newManifest = Transform.toManifest(clientManifest);
    this._db.manifests.insert(newManifest, (err, manifestId) => {
      if (err) {
        return cb(err);
      }

      console.log(`-> new Manifest created with id ${manifestId}`);

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
    console.log(`-> got update Service request ${Util.inspect(payload)}`);

    this._db.services.update([payload], (err) => {
      if (err) {
        return cb(err);
      }

      this.getService({ id: clientService.id }, cb);
    });
  }

  getService ({ id, hash }, cb) {
    const query = id ? { id } : { version_hash: hash };
    console.log(`-> fetching Service ${Util.inspect(query)}`);
    this._db.services.query(query, (err, services) => {
      if (err) {
        return cb(err);
      }

      if (!services || !services.length) {
        console.log(`-> Service ${Util.inspect(query)} not found`);
        return cb();
      }

      const service = services.shift();

      console.log(`-> Service ${Util.inspect(query)} found ${Util.inspect(service)}`);

      return cb(null, Transform.fromService({
        service,
        branches: service.branches.map((service) => {
          return Object.assign({}, service, {
            instances: this._instancesFilter(service.instances)
          });
        }),
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
        return cb(null, {});
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

      if (!services || !services.length) {
        return cb();
      }

      return cb(null, services.map((service) => {
        return Transform.fromService({ service, instances: this._instancesFilter(service.instance_ids) });
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

  getInstance ({ id }, cb) {
    this._db.instances.single({ id }, (err, instance) => {
      if (err) {
        return cb(err);
      }

      cb(null, instance ? Transform.fromInstance(instance) : {});
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

      if (!instances || !instances.length) {
        return cb(null, []);
      }

      cb(null, instances.map(Transform.fromInstance));
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
      }, (err, results) => {
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
      }, (err, results) => {
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

      cb(null, dbPackage ? Transform.fromPackage(dbPackage) : {});
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
      files: this.fromKeyValueToDict(files),
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
    console.log(`-> import requested for ${deploymentGroupSlug}`);

    if (!this._machines) {
      console.log('-> watcher not yet defined');
      return cb(null, null);
    }

    const machines = this._machines.getContainers();

    if (!Array.isArray(machines)) {
      console.log('-> no machines found');
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
      console.log(`-> no containers found for ${deploymentGroupSlug}`);
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
          slug,
          instances: [instance]
        }
      });
    }, {});

    const createService = (deploymentGroupId) => {
      return (serviceId, next) => {
        const service = services[serviceId];

        console.log(`-> creating Service ${Util.inspect(service)}`);

        VAsync.forEachParallel({
          inputs: service.instances,
          func: (instance, next) => {
            return this.createInstance(instance, next);
          }
        }, (err, results) => {
          if (err) {
            return cb(err);
          }

          console.log(`-> created Instances ${Util.inspect(results.successes)}`);

          this.createService(Object.assign(service, {
            instances: results.successes,
            deploymentGroupId
          }), next);
        });
      };
    };

    const deploymentGroup = {
      name: tags[DEPLOYMENT_GROUP],
      slug: ParamCase(tags[DEPLOYMENT_GROUP]),
      imported: true
    };

    console.log(`-> creating DeploymentGroup ${Util.inspect(deploymentGroup)}`);

    this.createDeploymentGroup(deploymentGroup, (err, dg) => {
      if (err) {
        return cb(err);
      }

      VAsync.forEachParallel({
        inputs: Object.keys(services),
        func: createService(dg.id)
      }, (err) => {
        return cb(err, dg);
      });
    });
  }
}

module.exports = Data;
module.exports.UNKNOWN_INSTANCE_ID = UNKNOWN_INSTANCE_ID;
module.exports.NEW_INSTANCE_ID = NEW_INSTANCE_ID;
