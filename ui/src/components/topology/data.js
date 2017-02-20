/*eslint-disable */

module.exports = {
  nodes: [
    {
      id: 'Nginx',
      attrs: {
        dcs: 1,
        instances: 2,
        healthy: true,
      },
      metrics: [
        {
          name: 'CPU',
          stat: '50%',
        },
        {
          name: 'Memory',
          stat: '20%',
        },
        {
          name: 'Network',
          stat: '5.9KB/sec',
        },
      ]
    },
    {
      id: 'WordPress',
      attrs: {
        dcs: 1,
        instances: 2,
        healthy: true,
      },
      metrics: [
        {
          name: 'CPU',
          stat: '50%',
        },
        {
          name: 'Memory',
          stat: '20%',
        },
        {
          name: 'Network',
          stat: '5.9KB/sec',
        },
      ]
    },
    {
      id: 'Memcached',
      attrs: {
        dcs: 1,
        instances: 2,
        healthy: true,
      },
      metrics: [
        {
          name: 'CPU',
          stat: '50%',
        },
        {
          name: 'Memory',
          stat: '20%',
        },
        {
          name: 'Network',
          stat: '5.9KB/sec',
        },
      ]
    },
    {
      id: 'Percona',
      attrs: {
        dcs: 1,
        instances: 2,
        healthy: true,
      },
      metrics: [
        {
          name: 'CPU',
          stat: '50%',
        },
        {
          name: 'Memory',
          stat: '20%',
        },
        {
          name: 'Network',
          stat: '5.9KB/sec',
        },
      ]
    },
    {
      id: 'NFS',
      attrs: {
        dcs: 1,
        instances: 2,
        healthy: true,
      },
      metrics: [
        {
          name: 'CPU',
          stat: '50%',
        },
        {
          name: 'Memory',
          stat: '20%',
        },
        {
          name: 'Network',
          stat: '5.9KB/sec',
        },
      ]
    }
  ],
  links: [
    {
      source: 'Nginx',
      target: 'WordPress',
    },
    {
      source: 'WordPress',
      target: 'Memcached',
    },
    {
      source: 'WordPress',
      target: 'NFS',
    },
    {
      source: 'WordPress',
      target: 'Percona',
    }
  ]
};
