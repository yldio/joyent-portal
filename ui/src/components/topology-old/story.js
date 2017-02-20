const React = require('react');

const {
  storiesOf
} = require('@kadira/storybook');

const Base = require('../base');
const Topology = require('./');
const TopologyView = require('./view');
const services = {
  nodes: [
    {
      id: 'Nginx',
      attrs: {
        dcs: 1,
        instances: 2,
        healthy: true
      },
      metrics: [
        {
          name: 'CPU',
          stat: '50%'
        },
        {
          name: 'Memory',
          stat: '20%'
        },
        {
          name: 'Network',
          stat: '5.9KB/sec'
        }
      ]
    },
    {
      id: 'WordPress',
      attrs: {
        dcs: 1,
        instances: 2,
        healthy: true
      },
      metrics: [
        {
          name: 'CPU',
          stat: '50%'
        },
        {
          name: 'Memory',
          stat: '20%'
        },
        {
          name: 'Network',
          stat: '5.9KB/sec'
        }
      ]
    },
    {
      id: 'Memcached',
      attrs: {
        dcs: 1,
        instances: 2,
        healthy: true
      },
      metrics: [
        {
          name: 'CPU',
          stat: '50%'
        },
        {
          name: 'Memory',
          stat: '20%'
        },
        {
          name: 'Network',
          stat: '5.9KB/sec'
        }
      ]
    },
    {
      id: 'Percona',
      attrs: {
        dcs: 1,
        instances: 2,
        healthy: true
      },
      metrics: [
        {
          name: 'CPU',
          stat: '50%'
        },
        {
          name: 'Memory',
          stat: '20%'
        },
        {
          name: 'Network',
          stat: '5.9KB/sec'
        }
      ]
    },
    {
      id: 'NFS',
      attrs: {
        dcs: 1,
        instances: 2,
        healthy: true
      },
      metrics: [
        {
          name: 'CPU',
          stat: '50%'
        },
        {
          name: 'Memory',
          stat: '20%'
        },
        {
          name: 'Network',
          stat: '5.9KB/sec'
        }
      ]
    }
  ],
  links: [
    {
      source: 'Nginx',
      target: 'WordPress'
    },
    {
      source: 'WordPress',
      target: 'Memcached'
    },
    {
      source: 'WordPress',
      target: 'NFS'
    },
    {
      source: 'WordPress',
      target: 'Percona'
    }
  ]
};

storiesOf('Topology', module)
  .add('5 services', () => (
    <Base>
      <TopologyView>
        <Topology
          graph={services}
          height={500}
          width={500}
        />
      </TopologyView>
    </Base>
  ));
