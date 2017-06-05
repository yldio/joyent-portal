'use strict';

const Fs = require('fs');
const Path = require('path');
const Code = require('code');
const Lab = require('lab');
const PortalData = require('../');

const lab = exports.lab = Lab.script();
const it = lab.it;
const describe = lab.describe;
const expect = Code.expect;

const internals = {
  options: { name: 'test', db: { test: true } },
  composeFile: Fs.readFileSync(Path.join(__dirname, 'docker-compose.yml')).toString()
};

describe('connect()', () => {
  it('connects to the database', (done) => {
    const data = new PortalData(internals.options);
    data.connect(done);
  });
});

describe('portals', () => {
  describe('createPortal()', () => {
    it('creates a new portal', (done) => {
      const data = new PortalData(internals.options);
      data.connect((err) => {
        expect(err).to.not.exist();

        const portal = {
          username: 'tom'
        };

        data.createPortal(portal, (err, result) => {
          expect(err).to.not.exist();
          expect(result.id).to.exist();
          expect(result.username).to.equal(portal.username);
          done();
        });
      });
    });
  });

  describe('getPortal()', () => {
    it('retrieves a single portal record', (done) => {
      const data = new PortalData(internals.options);
      data.connect((err) => {
        expect(err).to.not.exist();
        const datacenter = {
          region: 'us-sw-1'
        };

        data.createDatacenter(datacenter, (err, createdDatacenter) => {
          expect(err).to.not.exist();
          const portal = {
            username: 'tom',
            datacenter: {
              id: createdDatacenter.id
            }
          };

          data.createPortal(portal, (err, createdPortal) => {
            expect(err).to.not.exist();
            expect(createdPortal.id).to.exist();
            data.getPortal((err, retrievedPortal) => {
              expect(err).to.not.exist();
              expect(retrievedPortal.id).to.exist();
              expect(retrievedPortal.username).to.equal(portal.username);
              done();
            });
          });
        });
      });
    });
  });
});

describe('deployment groups', () => {
  describe('createDeploymentGroup()', () => {
    it('creates a deployment group record in the deployment_groups table', (done) => {
      const data = new PortalData(internals.options);
      const name = 'User Services';

      data.connect((err) => {
        expect(err).to.not.exist();
        data.createDeploymentGroup({ name }, (err, deploymentGroup) => {
          expect(err).to.not.exist();
          expect(deploymentGroup.id).to.exist();
          done();
        });
      });
    });
  });

  describe('getDeploymentGroup()', () => {
    it('gets a deployment group record from the deployment_groups table', (done) => {
      const data = new PortalData(internals.options);
      const name = 'User Services';

      data.connect((err) => {
        expect(err).to.not.exist();
        data.createDeploymentGroup({ name }, (err, createdDeploymentGroup) => {
          expect(err).to.not.exist();
          expect(createdDeploymentGroup.id).to.exist();
          data.getDeploymentGroup({ id: createdDeploymentGroup.id }, (err, deploymentGroup) => {
            expect(err).to.not.exist();
            expect(deploymentGroup).to.equal(createdDeploymentGroup);
            done();
          });
        });
      });
    });
  });

  describe('getDeploymentGroups()', () => {
    it('gets a list of deployment group records from the deployment_groups table', (done) => {
      const data = new PortalData(internals.options);
      const name = 'User Services';

      data.connect((err) => {
        expect(err).to.not.exist();
        data.createDeploymentGroup({ name }, (err, createdDeploymentGroup1) => {
          expect(err).to.not.exist();
          expect(createdDeploymentGroup1.id).to.exist();
          data.createDeploymentGroup({ name }, (err, createdDeploymentGroup2) => {
            expect(err).to.not.exist();
            expect(createdDeploymentGroup1.id).to.exist();

            data.getDeploymentGroups({ ids: [createdDeploymentGroup1.id, createdDeploymentGroup2.id] }, (err, deploymentGroups) => {
              expect(err).to.not.exist();
              expect(deploymentGroups.length).to.equal(2);
              data.getDeploymentGroups({ name }, (err, deploymentGroups) => {
                expect(err).to.not.exist();
                expect(deploymentGroups.length).to.equal(2);
                done();
              });
            });
          });
        });
      });
    });
  });
});

describe('datacenters', () => {
  describe('createDatacenter()', () => {
    it('creates a new datacenter record', (done) => {
      const data = new PortalData(internals.options);
      data.connect((err) => {
        expect(err).to.not.exist();
        const datacenter = {
          region: 'us-sw-1'
        };

        data.createDatacenter(datacenter, (err, result) => {
          expect(err).to.not.exist();
          expect(result.id).to.exist();
          expect(result.region).to.equal(datacenter.region);
          done();
        });
      });
    });
  });

  describe('getDatacenter()', () => {
    it('retrieves a datacenter record from an id', (done) => {
      const data = new PortalData(internals.options);
      data.connect((err) => {
        expect(err).to.not.exist();
        const datacenter = {
          region: 'us-sw-1'
        };

        data.createDatacenter(datacenter, (err, createdDatacenter) => {
          expect(err).to.not.exist();
          expect(createdDatacenter.id).to.exist();
          data.getDatacenter({ id: createdDatacenter.id }, (err, retrievedDatacenter) => {
            expect(err).to.not.exist();
            expect(retrievedDatacenter.region).to.equal(datacenter.region);
            done();
          });
        });
      });
    });

    it('retrieves a datacenter record from a region', (done) => {
      const data = new PortalData(internals.options);
      data.connect((err) => {
        expect(err).to.not.exist();
        const datacenter = {
          region: 'us-sw-1'
        };

        data.createDatacenter(datacenter, (err, createdDatacenter) => {
          expect(err).to.not.exist();
          expect(createdDatacenter.id).to.exist();
          data.getDatacenter({ region: createdDatacenter.region }, (err, retrievedDatacenter) => {
            expect(err).to.not.exist();
            expect(retrievedDatacenter.region).to.equal(datacenter.region);
            done();
          });
        });
      });
    });
  });

  describe('getDatacenters()', () => {
    it('retrieves all datacenter records', (done) => {
      const data = new PortalData(internals.options);
      data.connect((err) => {
        expect(err).to.not.exist();
        const datacenter1 = {
          region: 'us-sw-1'
        };

        const datacenter2 = {
          region: 'us-west-1'
        };

        data.createDatacenter(datacenter1, (err, createdDatacenter1) => {
          expect(err).to.not.exist();
          data.createDatacenter(datacenter2, (err, createdDatacenter2) => {
            expect(err).to.not.exist();
            data.getDatacenters((err, datacenters) => {
              expect(err).to.not.exist();
              expect(datacenters.length).to.equal(2);
              done();
            });
          });
        });
      });
    });
  });
});


describe('versions', () => {
  describe('createVersion()', () => {
    it('creates a new version record in the versions table', (done) => {
      const data = new PortalData(internals.options);
      data.connect((err) => {
        expect(err).to.not.exist();
        data.createDeploymentGroup({ name: 'something' }, (err, deploymentGroup) => {
          expect(err).to.not.exist();
          const clientManifest = {
            deploymentGroupId: deploymentGroup.id,
            type: 'compose',
            format: 'yml',
            raw: internals.composeFile
          };

          data.provisionManifest(clientManifest, (err, manifest) => {
            expect(err).to.not.exist();

            const clientVersion = {
              deploymentGroupId: deploymentGroup.id,
              manifestId: manifest.id,
              scales: [{
                serviceName: 'consul',
                replicas: 3
              }],
              plan: {
                running: true,
                actions: [{
                  type: 'start',
                  service: 'consul',
                  machines: ['vmid', 'vmid']
                }]
              }
            };

            data.createVersion(clientVersion, (err, result) => {
              expect(err).to.not.exist();
              expect(result.id).to.exist();
              expect(result.scales).to.equal(clientVersion.scales);
              done();
            });
          });
        });
      });
    });
  });

  describe('getVersion()', () => {
    it('retrieves a version record with an id or manifestId', (done) => {
      const data = new PortalData(internals.options);
      data.connect((err) => {
        expect(err).to.not.exist();
        data.createDeploymentGroup({ name: 'something' }, (err, deploymentGroup) => {
          expect(err).to.not.exist();
          const clientManifest = {
            deploymentGroupId: deploymentGroup.id,
            type: 'compose',
            format: 'yml',
            raw: internals.composeFile
          };

          data.provisionManifest(clientManifest, (err, manifest) => {
            expect(err).to.not.exist();

            const clientVersion = {
              manifestId: manifest.id,
              deploymentGroupId: deploymentGroup.id,
              scales: [{
                serviceName: 'consul',
                replicas: 3
              }],
              plan: {
                running: true,
                actions: [{
                  type: 'start',
                  service: 'consul',
                  machines: ['vmid', 'vmid']
                }]
              }
            };

            data.createVersion(clientVersion, (err, result) => {
              expect(err).to.not.exist();
              expect(result.id).to.exist();
              expect(result.scales).to.equal(clientVersion.scales);
              data.getVersion({ id: result.id }, (err, retrievedVersion1) => {
                expect(err).to.not.exist();
                expect(retrievedVersion1.id).to.equal(result.id);
                data.getVersion({ manifestId: result.manifestId }, (err, retrievedVersion2) => {
                  expect(err).to.not.exist();
                  expect(retrievedVersion1.id).to.equal(retrievedVersion2.id);
                  done();
                });
              });
            });
          });
        });
      });
    });
  });

  describe('getVersions()', () => {
    it('retrieve versions records with a manifestId', (done) => {
      const data = new PortalData(internals.options);
      data.connect((err) => {
        expect(err).to.not.exist();
        data.createDeploymentGroup({ name: 'something' }, (err, deploymentGroup) => {
          expect(err).to.not.exist();
          const clientManifest = {
            deploymentGroupId: deploymentGroup.id,
            type: 'compose',
            format: 'yml',
            raw: internals.composeFile
          };

          data.provisionManifest(clientManifest, (err, manifest) => {
            expect(err).to.not.exist();

            const clientVersion = {
              manifestId: manifest.id,
              deploymentGroupId: deploymentGroup.id,
              scales: [{
                serviceName: 'consul',
                replicas: 3
              }],
              plan: {
                running: true,
                actions: [{
                  type: 'start',
                  service: 'consul',
                  machines: ['vmid', 'vmid']
                }]
              }
            };

            data.createVersion(clientVersion, (err, result) => {
              expect(err).to.not.exist();
              expect(result.id).to.exist();
              expect(result.scales).to.equal(clientVersion.scales);
              data.getVersions({ manifestId: clientVersion.manifestId }, (err, versions) => {
                expect(err).to.not.exist();
                expect(versions.length).to.equal(1);
                done();
              });
            });
          });
        });
      });
    });

    it('retrieve versions records with a deployment group id', (done) => {
      const data = new PortalData(internals.options);
      data.connect((err) => {
        expect(err).to.not.exist();
        data.createDeploymentGroup({ name: 'something' }, (err, deploymentGroup) => {
          expect(err).to.not.exist();
          const clientManifest = {
            deploymentGroupId: deploymentGroup.id,
            type: 'compose',
            format: 'yml',
            raw: internals.composeFile
          };

          data.provisionManifest(clientManifest, (err, manifest) => {
            expect(err).to.not.exist();

            const clientVersion = {
              manifestId: manifest.id,
              deploymentGroupId: deploymentGroup.id,
              scales: [{
                serviceName: 'consul',
                replicas: 3
              }],
              plan: {
                running: true,
                actions: [{
                  type: 'start',
                  service: 'consul',
                  machines: ['vmid', 'vmid']
                }]
              }
            };

            data.createVersion(clientVersion, (err, version) => {
              expect(err).to.not.exist();

              data.getVersions({ deploymentGroupId: deploymentGroup.id }, (err, versions) => {
                expect(err).to.not.exist();
                expect(versions.length).to.equal(1);
                expect(versions[0].id).to.equal(version.id);
                done();
              });
            });
          });
        });
      });
    });
  });
});


describe('manifests', () => {
  describe('provisionManifest()', () => {
    it('creates a new manifest record in the manifests table', (done) => {
      const data = new PortalData(internals.options);
      data.connect((err) => {
        expect(err).to.not.exist();
        data.createDeploymentGroup({ name: 'something' }, (err, deploymentGroup) => {
          expect(err).to.not.exist();
          const clientManifest = {
            deploymentGroupId: deploymentGroup.id,
            type: 'compose',
            format: 'yml',
            raw: internals.composeFile
          };
          data.provisionManifest(clientManifest, (err, result) => {
            expect(err).to.not.exist();
            expect(result.id).to.exist();
            expect(result.created).to.exist();
            done();
          });
        });
      });
    });
  });

  describe('getManifests()', () => {
    it('retrieves manifests using from a manifest type', (done) => {
      const data = new PortalData(internals.options);
      data.on('error', (err) => {
        expect(err).to.not.exist();
      });

      data.connect((err) => {
        expect(err).to.not.exist();
        data.createDeploymentGroup({ name: 'something' }, (err, deploymentGroup) => {
          expect(err).to.not.exist();
          const clientManifest = {
            deploymentGroupId: deploymentGroup.id,
            type: 'compose',
            format: 'yml',
            raw: internals.composeFile
          };
          data.provisionManifest(clientManifest, (err, result) => {
            expect(err).to.not.exist();
            data.getManifests({ type: clientManifest.type }, (err, manifests) => {
              expect(err).to.not.exist();
              expect(manifests.length).to.equal(1);
              done();
            });
          });
        });
      });
    });

    it('retrieves manifests using from a deployment group id', (done) => {
      const data = new PortalData(internals.options);
      data.connect((err) => {
        expect(err).to.not.exist();
        data.createDeploymentGroup({ name: 'something' }, (err, deploymentGroup) => {
          expect(err).to.not.exist();
          const clientManifest = {
            deploymentGroupId: deploymentGroup.id,
            type: 'compose',
            format: 'yml',
            raw: internals.composeFile
          };

          data.provisionManifest(clientManifest, (err, result) => {
            expect(err).to.not.exist();
            data.getManifests({ type: clientManifest.type }, (err, manifests) => {
              expect(err).to.not.exist();
              expect(manifests.length).to.equal(1);
              done();
            });
          });
        });
      });
    });
  });
});


describe('instances', () => {
  describe('createInstance()', () => {
    it('creates a new instance record in the instances table', (done) => {
      const data = new PortalData(internals.options);
      data.connect((err) => {
        expect(err).to.not.exist();

        const clientInstance = {
          name: 'my test',
          machineId: 'something',
          status: 'CREATED'
        };

        data.createInstance(clientInstance, (err, result) => {
          expect(err).to.not.exist();
          expect(result.id).to.exist();
          expect(result.name).to.equal(clientInstance.name);
          done();
        });
      });
    });
  });

  describe('getInstance()', () => {
    it('retrieves an instance record from the instances table', (done) => {
      const data = new PortalData(internals.options);
      data.connect((err) => {
        expect(err).to.not.exist();

        const clientInstance = {
          name: 'my test',
          machineId: 'something',
          status: 'CREATED'
        };

        data.createInstance(clientInstance, (err, result) => {
          expect(err).to.not.exist();
          expect(result.id).to.exist();
          data.getInstance({ id: result.id }, (err, instance) => {
            expect(err).to.not.exist();
            expect(instance).to.equal(result);
            done();
          });
        });
      });
    });
  });
});


describe('packages', () => {
  describe('createPackage()', () => {
    it('creates a new package record in the packages table', (done) => {
      const data = new PortalData(internals.options);
      data.connect((err) => {
        expect(err).to.not.exist();

        const clientPackage = {
          name: 'small',
          type: 'mem-small',
          memory: 12123413,
          disk: 4224243,
          swap: 1224324,
          lwps: 12,
          vcpus: 1,
          version: '',
          group: ''
        };

        data.createPackage(clientPackage, (err, result) => {
          expect(err).to.not.exist();
          expect(result.id).to.exist();
          expect(result.name).to.equal(clientPackage.name);
          done();
        });
      });
    });
  });

  describe('getPackage()', () => {
    it('retrieves a package record from the packages table', (done) => {
      const data = new PortalData(internals.options);
      data.connect((err) => {
        expect(err).to.not.exist();

        const clientPackage = {
          name: 'small',
          type: 'mem-small',
          memory: 12123413,
          disk: 4224243,
          swap: 1224324,
          lwps: 12,
          vcpus: 1,
          version: '',
          group: ''
        };

        data.createPackage(clientPackage, (err, createdPackage) => {
          expect(err).to.not.exist();
          expect(createdPackage.id).to.exist();
          data.getPackage({ id: createdPackage.id }, (err, retrievedPackage) => {
            expect(err).to.not.exist();
            expect(retrievedPackage).to.equal(createdPackage);
            done();
          });
        });
      });
    });
  });

  describe('getPackages()', () => {
    it('retrieves packages using with the same type', (done) => {
      const data = new PortalData(internals.options);
      data.connect((err) => {
        expect(err).to.not.exist();

        const clientPackage1 = {
          name: 'small',
          type: 'mem-small',
          memory: 12123413,
          disk: 4224243,
          swap: 1224324,
          lwps: 12,
          vcpus: 1,
          version: '',
          group: ''
        };

        const clientPackage2 = {
          name: 'smaller',
          type: 'mem-small',
          memory: 1213,
          disk: 243,
          swap: 1324,
          lwps: 1,
          vcpus: 1,
          version: '',
          group: ''
        };

        data.createPackage(clientPackage1, (err, createdPackage1) => {
          expect(err).to.not.exist();
          data.createPackage(clientPackage2, (err, createdPackage2) => {
            expect(err).to.not.exist();

            data.getPackages({ type: clientPackage1.type }, (err, packages) => {
              expect(err).to.not.exist();
              expect(packages.length).to.equal(2);
              done();
            });
          });
        });
      });
    });
  });
});

// skipping by default since it takes so long
describe.skip('scale()', () => {
  it('creates new instances of a service', { timeout: 180000 }, (done) => {
    const data = new PortalData(internals.options);
    data.connect((err) => {
      expect(err).to.not.exist();
      data.createDeploymentGroup({ name: 'something' }, (err, deploymentGroup) => {
        expect(err).to.not.exist();
        const clientManifest = {
          deploymentGroupId: deploymentGroup.id,
          type: 'compose',
          format: 'yml',
          raw: internals.composeFile
        };
        data.provisionManifest(clientManifest, (err, manifest) => {
          expect(err).to.not.exist();
          setTimeout(() => {
            data.getDeploymentGroup({ id: deploymentGroup.id }, (err, deploymentGroup) => {
              expect(err).to.not.exist();
              data.scale({ id: deploymentGroup.services[0].id, replicas: 3 }, (err, version) => {
                expect(err).to.not.exist();
                expect(version).to.exist();
                expect(version.scales[0].replicas).to.equal(3);
                done();
              });
            });
          }, 80000);
        });
      });
    });
  });
});
