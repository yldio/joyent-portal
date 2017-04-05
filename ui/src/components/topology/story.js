import React from 'react';
import { storiesOf } from '@kadira/storybook';
import withReadme from 'storybook-readme/with-readme';

import README from './readme.md';

import StoryHelper from './story-helper';
import GraphNode  from './graph-node';

storiesOf('Topology', module)
.add('5 services', withReadme(README, () => (
  <StoryHelper />
)))
.add('Consul', withReadme(README, () => (
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
)));
