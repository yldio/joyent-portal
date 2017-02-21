const React = require('react');
const StoryHelper = require('./story-helper');
const GraphNode = require('./graph-node');

const {
  storiesOf
} = require('@kadira/storybook');

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
        }],
        x: 0,
        y: 0
      }}
      size={{
        width: 180,
        height: 156
      }}
      connected={false}
    />
  </svg>
));
