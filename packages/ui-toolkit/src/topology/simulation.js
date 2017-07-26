import { forceSimulation, forceLink, forceCollide, forceCenter } from 'd3';
import Constants from './constants';

const hypotenuse = (a, b) => Math.sqrt(a * a + b * b);

const rectRadius = ({ width, height }) =>
  Math.round(hypotenuse(width, height) / 2);

const forcePlayAnimation = (simulation, animationTicks) => {
  const n =
    Math.ceil(
      Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())
    ) + 100; // - animationTicks;

  for (let i = 0; i < n; ++i) {
    simulation.tick();
  }
};

const createLinks = services =>
  services.reduce(
    (acc, service, index) =>
      service.connections
        ? acc.concat(
            service.connections.reduce((connections, connection, index) => {
              const targetExists = services.filter(
                service => service.id === connection
              ).length;
              if (targetExists) {
                connections.push({
                  source: service.id,
                  target: connection
                });
              }
              return connections;
            }, [])
          )
        : acc,
    []
  );

const createSimulation = (services, svgSize, animationTicks = 0) => {
  // This is not going to work given that as well as the d3 layout stuff, other things might be at play too
  // We should pass two objects to the components - one for positioning and one for data
  const nodes = services.map((service, index) => {
    return {
      id: service.id,
      index
    };
  });

  const links = createLinks(services);

  const { width, height } = svgSize;

  const nodeRadius = rectRadius(Constants.nodeSizeWithChildren);

  const simulation = forceSimulation(nodes)
    .force('link', forceLink(links).id(d => d.id))
    .force('collide', forceCollide(nodeRadius))
    .force('center', forceCenter(width / 2, height / 2));

  forcePlayAnimation(simulation, animationTicks);

  return {
    nodes,
    links,
    simulation
  };
};

// TODO we need to kill the previous simulation
const updateSimulation = (
  simulation,
  services,
  simNodes,
  simLinks,
  svgSize,
  onTick,
  onEnd
) => {
  const nodes = services.map((service, index) => {
    const simNode = simNodes.reduce((acc, n, i) => {
      return service.id === n.id ? n : acc;
    }, null);

    return simNode
      ? {
          id: simNode.id,
          // Fx: simNode.x,
          // fy: simNode.y,
          index
        }
      : {
          id: service.id,
          index
        };
  });

  const links = createLinks(services);

  const { width, height } = svgSize;

  const nodeRadius = rectRadius(Constants.nodeSizeWithChildren);

  return {
    simulation: forceSimulation(nodes)
      .force('link', forceLink(links).id(d => d.id))
      .force('collide', forceCollide(nodeRadius))
      .force('center', forceCenter(width / 2, height / 2))
      .on('tick', onTick)
      .on('end', onEnd),
    nodes,
    links
  };
};

export { createSimulation, updateSimulation };

/*
Const simulation = forceSimulation(dataNodes)
  // .alpha(1).alphaDecay(0.1)
  // .force('charge', forceManyBody())
  .force('link', forceLink(dataLinks)
    //.distance(() => linkDistance)
    .id(d => d.id))
  .force('collide', forceCollide(nodeRadius))
  .force('center', forceCenter(1024/2, 860/2))
  .on('tick', () => {
    console.log('SIMULATION TICK');
    console.log('tickCounter = ', tickCounter);
    tickCounter++;
    this.forceUpdate();
  })
  .on('end', () => {
    console.log('SIMULATION END');
    console.log('tickCounter = ', tickCounter);
    // this.forceUpdate();
  })
*/
