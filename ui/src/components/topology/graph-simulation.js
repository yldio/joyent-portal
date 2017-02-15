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

const createSimulation = (
  nodes,
  links,
  nodeSize,
  svgSize,
  onTick,
  onEnd
) => {
  // This is not going to work given that as well as the d3 layout stuff, other things might be at play too
  // We should pass two objects to the components - one for positioning and one for data
  const mappedNodes = nodes.map((node, index) => ({
    id: node.id,
    index: index
  }));
  const mappedLinks = links.map((link, index) => ({
    ...link
  }));

  const {
    width,
    height
  } = svgSize;

  const nodeRadius = rectRadius(nodeSize);

  return ({
    simulation: d3.forceSimulation(mappedNodes)
      .force('link', d3.forceLink(mappedLinks).id(d => d.id))
      .force('collide', d3.forceCollide(nodeRadius))
      .force('center', d3.forceCenter(width/2, height/2))
      .on('tick', onTick)
      .on('end', onEnd),
    nodes: mappedNodes,
    links: mappedLinks
  });
};

    // TODO we need to kill the previous simulation
const updateSimulation = (
  simulation,
  nextNodes,
  nextLinks,
  simNodes,
  simLinks,
  nodeSize,
  svgSize,
  onTick,
  onEnd
) => {
  const mappedNodes = nextNodes.map((nextNode, index) => {
    const simNode = simNodes.reduce((acc, n, i) => {
      return nextNode.id === n.id ? n : acc;
    }, null);

    return simNode ? {
      id: simNode.id,
      // fx: simNode.x,
      // fy: simNode.y,
      index: index
    } : {
      id: nextNode.id,
      index: index
    };
  });

  const mappedLinks = nextLinks.map((nextLink, index) => {
    const simLink = simLinks.reduce((acc, l, i) => {
      return nextLink.source === l.source && nextLink.target === l.target ?
        l : acc;
    }, {});
    return simLink ? {
      ...simLink
    } : {
      ...nextLink
    };
  });

  const {
    width,
    height
  } = svgSize;

  const nodeRadius = rectRadius(nodeSize);

  return ({
    simulation: d3.forceSimulation(mappedNodes)
      .force('link', d3.forceLink(mappedLinks).id(d => d.id))
      .force('collide', d3.forceCollide(nodeRadius))
      .force('center', d3.forceCenter(width/2, height/2))
      .on('tick', onTick)
      .on('end', onEnd),
    nodes: mappedNodes,
    links: mappedLinks
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
