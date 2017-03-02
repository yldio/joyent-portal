import GraphNode  from './graph-node';
import StoryHelper from './story-helper';
import { storiesOf } from '@kadira/storybook';
import React from 'react';

storiesOf('Topology', module)
.add('5 services', () => (
  <StoryHelper />
))
.add('Consul', () => (
  <svg width={180} height={159}>
    <GraphNode
      data={{
        id: 'Consul',
        attrs: {
          dcs: 1,
          healthy: true,
          instances: 1
        },
        metrics: [{
          name: 'CPU',
          stat: '50%'
        }, {
          name: 'Network',
          stat: '5.9KB/sec'
        }, {
          name: 'Network',
          stat: '5.9KB/sec'
        }]
      }}
      connected={false}
    />
  </svg>
));
