const d3 = require('d3');

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
  nodeSize,
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

  const nodeRadius = rectRadius(nodeSize);

  return ({
    simulation: d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id))
      .force('collide', d3.forceCollide(nodeRadius))
      .force('center', d3.forceCenter(width/2, height/2))
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
  nodeSize,
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

  const nodeRadius = rectRadius(nodeSize);

  return ({
    simulation: d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id))
      .force('collide', d3.forceCollide(nodeRadius))
      .force('center', d3.forceCenter(width/2, height/2))
      .on('tick', onTick)
      .on('end', onEnd),
    nodes: nodes,
    links: links
  });
};

module.exports = {
  createSimulation,
  updateSimulation
};

/*
const simulation = d3.forceSimulation(dataNodes)
  // .alpha(1).alphaDecay(0.1)
  // .force('charge', d3.forceManyBody())
  .force('link', d3.forceLink(dataLinks)
    //.distance(() => linkDistance)
    .id(d => d.id))
  .force('collide', d3.forceCollide(nodeRadius))
  .force('center', d3.forceCenter(1024/2, 860/2))
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
