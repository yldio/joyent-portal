import {
  getInstanceStatuses,
  getInstancesActive,
  getInstancesHealthy,
  getService,
  processServices,
  processServicesForTopology
} from '@state/selectors';

describe('Redux selectors and Apollo helpers', () => {
  describe('getInstanceStatuses', () => {
    it('gathers instance statuses correctly', () => {
      const service = {
        instances: [
          { status: 'RUNNING' },
          { status: 'RUNNING' },
          { status: 'READY' },
          { status: 'RUNNING' },
          { status: 'INCOMPLETE' },
          { status: 'READY' },
          { status: 'OFFLINE' },
          { status: 'STOPPED' },
          { status: 'STOPPED' },
          { status: 'RUNNING' }
        ]
      };
      const expectedResult = [
        { status: 'RUNNING', count: 4 },
        { status: 'READY', count: 2 },
        { status: 'INCOMPLETE', count: 1 },
        { status: 'OFFLINE', count: 1 },
        { status: 'STOPPED', count: 2 }
      ];
      const result = getInstanceStatuses(service);
      expect(result).toEqual(expectedResult);
    });

    it('does not throw a hissy fit if there are no instances', () => {
      const service = {
        instances: []
      };
      const expectedResult = [];
      const result = getInstanceStatuses(service);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getInstancesActive', () => {
    it("returns true if all instances' status is active", () => {
      const statuses = [
        { status: 'RUNNING' },
        { status: 'READY' },
        { status: 'ACTIVE' },
        { status: 'RUNNING' }
      ];
      const expectedResult = true;
      const result = getInstancesActive(statuses);
      expect(result).toEqual(expectedResult);
    });

    it("returns false if no instances' status is active", () => {
      const statuses = [
        { status: 'STOPPING' },
        { status: 'FAILED' },
        { status: 'UNKNOWN' },
        { status: 'STOPPED' }
      ];
      const expectedResult = false;
      const result = getInstancesActive(statuses);
      expect(result).toEqual(expectedResult);
    });

    it("returns true if some instances' status is active", () => {
      const statuses = [
        { status: 'STOPPING' },
        { status: 'FAILED' },
        { status: 'ACTIVE' },
        { status: 'RUNNING' }
      ];
      const expectedResult = true;
      const result = getInstancesActive(statuses);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getInstancesHealthy', () => {
    it('returns the number of healthy instances correctly', () => {
      const instances = [
        { healthy: 'HEALTHY' },
        { healthy: 'UNHEALTHY' },
        { healthy: 'MAINTENANCE' },
        { healthy: 'UNKNOWN' },
        { healthy: 'UNAVAILABLE' },
        { healthy: 'HEALTHY' }
      ];
      const expectedResult = { total: 6, healthy: 2 };
      const result = getInstancesHealthy(instances);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getService', () => {
    it('returns the service decorated with details for display correctly', () => {
      const result = getService(nginxService, 0);
      expect(result).toEqual(nginxExpectedResult);
    });

    it('returns the consul service decorated with details for display correctly', () => {
      const result = getService(consulService, 1);
      expect(result).toEqual(consulExpectedResult);
    });
  });

  describe('processServices', () => {
    it('returns the services decorated with details for display correctly', () => {
      const services = [nginxService, consulService];
      const expectedResult = [nginxExpectedResult, consulExpectedResult];
      const result = processServices(services);
      expect(result).toEqual(expectedResult);
    });

    it('removes deleted services', () => {
      const services = [
        {
          status: 'DELETED'
        }
      ];
      const expectedResult = [];
      const result = processServices(services);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('processServicesForTopology', () => {
    it('returns the services decorated with details for display correctly', () => {
      const services = [
        {
          ...nginxService,
          id: 'nginx-service-0',
          connections: ['consul-service-0', 'consul-service-1']
        },
        {
          ...nginxService,
          id: 'nginx-service-1'
        },
        {
          ...consulService,
          id: 'consul-service-0',
          connections: ['consul-service-1']
        },
        {
          ...consulService,
          id: 'consul-service-1'
        }
      ];
      const expectedResult = [
        {
          ...nginxExpectedResult,
          id: 'nginx-service-0',
          connections: ['consul-service-0', 'consul-service-1'],
          connected: true,
          index: 0
        },
        {
          ...nginxExpectedResult,
          id: 'nginx-service-1',
          connected: false,
          index: 1
        },
        {
          ...consulExpectedResult,
          id: 'consul-service-0',
          connections: ['consul-service-1'],
          connected: true,
          index: 2
        },
        {
          ...consulExpectedResult,
          id: 'consul-service-1',
          connected: true,
          index: 3
        }
      ];
      const result = processServicesForTopology(services);
      expect(result).toEqual(expectedResult);
    });
  });
});

const nginxService = {
  instances: [
    { status: 'RUNNING', healthy: 'HEALTHY' },
    { status: 'RUNNING', healthy: 'HEALTHY' },
    { status: 'READY', healthy: 'HEALTHY' },
    { status: 'RUNNING', healthy: 'UNHEALTHY' },
    { status: 'INCOMPLETE', healthy: 'UNKNOWN' },
    { status: 'READY', healthy: 'HEALTHY' },
    { status: 'OFFLINE', healthy: 'UNAVAILABLE' },
    { status: 'STOPPED', healthy: 'UNAVAILABLE' },
    { status: 'STOPPED', healthy: 'UNAVAILABLE' },
    { status: 'RUNNING', healthy: 'HEALTHY' }
  ],
  status: 'ACTIVE',
  slug: 'nginx'
};

const nginxExpectedResult = {
  ...nginxService,
  instanceStatuses: [
    { status: 'RUNNING', count: 4 },
    { status: 'READY', count: 2 },
    { status: 'INCOMPLETE', count: 1 },
    { status: 'OFFLINE', count: 1 },
    { status: 'STOPPED', count: 2 }
  ],
  instancesActive: true,
  instancesHealthy: { total: 10, healthy: 5 },
  transitionalStatus: false,
  isConsul: false,
  index: 0
};

const consulService = {
  instances: [
    { status: 'RUNNING', healthy: 'HEALTHY' },
    { status: 'READY', healthy: 'HEALTHY' },
    { status: 'PROVISIONING', healthy: 'UNKNOWN' }
  ],
  status: 'PROVISIONING',
  slug: 'consul'
};

const consulExpectedResult = {
  ...consulService,
  instanceStatuses: [
    { status: 'RUNNING', count: 1 },
    { status: 'READY', count: 1 },
    { status: 'PROVISIONING', count: 1 }
  ],
  instancesActive: true,
  instancesHealthy: { total: 3, healthy: 2 },
  transitionalStatus: true,
  isConsul: true,
  index: 1
};