## Services topology component

### Usage

```js
import { TopologyGraph } from 'components/topology';

<TopologyGraph services={servicesData} />
```

### Properties

* `services` - list of service (nodes) objects with connections (links)

| propName | propType | defaultValue | isRequired |
|----------|----------|--------------|------------|
| services | array    | -            | +          |

* example

```js

[{
  "uuid": "081a792c-47e0-4439-924b-2efa9788ae9e",
  "id": "nginx",
  "name": "Nginx",
  "instances": 1,
  "metrics": [{
    "name": "CPU",
    "value": "50%"
  }, {
    "name": "Memory",
    "value": "20%"
  }, {
    "name": "Network",
    "value": "2.9Kb/sec"
  }],
  "connections": [
    // uuid of service to link to
    "be227788-74f1-4e5b-a85f-b5c71cbae8d8"
  ],
  "healthy": true,
  "datacentres": 1
}, {
  "uuid": "be227788-74f1-4e5b-a85f-b5c71cbae8d8",
  "id": "wordpress",
  "name": "Wordpress",
  ...
},
{
  ...
}]

```

### Implementation

`TopologyGraph` utilises d3's forceSimulation, which is a physics engine. ForceSimulation generates a layout for nodes taking into account how they are linked together.

D3's forceSimulation layout creates an object with two properties:
* an array of nodes `[{index: index, x: number, y: number, ...}, {...}, ...]`
* an array of links `[{source: node-index, target: node-index} {...}, ...]`

This simulation layout object is then stored on `TopologyGraph`'s state.

`TopologyGraph` renders an `<svg />` within which it renders `<GraphNode />` and `<GraphLink />` React components, which render svg elements, based on `props` received from `TopologyGraph`. (`<GraphNode />` relies on further sub-components in its render.)

`TopologyGraph` converts positioning data from its forceSimulation state object and then passes it to `<GraphNode />`s and `<GraphLink />`s so these components can position themselves.

The data that `TopologyGraph` passes to `<GraphNode />`s is a combination of data coming from its forceSimulation state object and its own `props` service data - this is because metrics / instance count / etc may get updated without the need to update the layout itself.

* example props received by <GraphNode />:

```js
{
   data:{
      uuid: "be227788-74f1-4e5b-a85f-b5c71cbae8d8",
      id: "be227788-74f1-4e5b-a85f-b5c71cbae8d8",
      name: "Wordpress",
      project: "e0ea0c02-55cc-45fe-8064-3e5176a59401",
      instances: 2,
      metrics: [...],
      connections: [...],
      healthy: true,
      datacentres: 2,
      index: 1,

      x: 626.4155281167791,
      y: 430.4554112920734,
      vy: 0.0011519611289911413,
      vx: 0.0967880576807743
   },
   index: 1,
   connected: true
}
```

The data that `TopologyGraph` passes to `<GraphLinks />`s is the data objects of the source and target nodes.

* example props received by <GraphLink />:

```js
{
   data:{
      source:{
         ...other GraphNode props...,
         index: 1,
         x: 626.4155281167791,
         y: 430.4554112920734,
         vy: 0.0011519611289911413,
         vx: 0.0967880576807743
      },
      target:{
         ...other GraphNode props...,
         index: 2,
         x: 625.0731301883645,
         y: 760.3262939485471,
         vy: 0.0040879364850683305,
         vx: 0.0952729803806392
      }
   }
}
```

### Roadmap

#### TODO
