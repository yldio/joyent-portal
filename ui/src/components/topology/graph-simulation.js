import { forceSimulation, forceLink, forceCollide, forceCenter } from 'd3';
import Constants from './constants';

const hypotenuse = (a, b) =>
  Math.sqrt(a*a + b*b);

const rectRadius = (size) => {

  const {
    width,
    height
  } = size;

  return Math.round(hypotenuse(width, height)/2);
};

const createLinks = (services) =>
  services.reduce((acc, service, index) =>
    service.connections ?
      acc.concat(
        service.connections.map((connection, index) => ({
          source: service.uuid,
          target: connection
        }))
      ) : acc
  , []);

const createSimulation = (
  services,
  svgSize,
  onTick,
  onEnd
) => {
  // This is not going to work given that as well as the d3 layout stuff, other things might be at play too
  // We should pass two objects to the components - one for positioning and one for data
  const nodes = services.map((service, index) => ({
    id: service.uuid,
    index: index
  }));

  const links = createLinks(services);

  const {
    width,
    height
  } = svgSize;

  const nodeRadius = rectRadius(Constants.nodeSizeWithChildren);

  return ({
    simulation: forceSimulation(nodes)
      .force('link', forceLink(links).id(d => d.id))
      .force('collide', forceCollide(nodeRadius))
      .force('center', forceCenter(width/2, height/2))
      .on('tick', onTick)
      .on('end', onEnd),
    nodes: nodes,
    links: links
  });
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
      return service.uuid === n.id ? n : acc;
    }, null);

    return simNode ? {
      id: simNode.id,
      // fx: simNode.x,
      // fy: simNode.y,
      index: index
    } : {
      id: service.uuid,
      index: index
    };
  });

  const links = createLinks(services);

  const {
    width,
    height
  } = svgSize;

  const nodeRadius = rectRadius(Constants.nodeSizeWithChildren);

  return ({
    simulation: forceSimulation(nodes)
      .force('link', forceLink(links).id(d => d.id))
      .force('collide', forceCollide(nodeRadius))
      .force('center', forceCenter(width/2, height/2))
      .on('tick', onTick)
      .on('end', onEnd),
    nodes: nodes,
    links: links
  });
};

export {
  createSimulation,
  updateSimulation
};

/*
const simulation = forceSimulation(dataNodes)
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
