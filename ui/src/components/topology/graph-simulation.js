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

  return d3.forceSimulation(mappedNodes)
    .force('link', d3.forceLink(mappedLinks).id(d => d.id))
    .force('collide', d3.forceCollide(nodeRadius))
    .force('center', d3.forceCenter(width/2, height/2))
    .on('tick', onTick)
    .on('end', onEnd);
};

    // TODO we need to kill the previous simulation
const updateSimulation = (
  simulation,
  nodes,
  links,
  nextNodes,
  nextLinks,
  nodeSize,
  svgSize,
  onTick,
  onEnd
) => {
  // want to copy all the existing nodes that we still need and freeze them
  // want to copy all the existing links we still need
  // if we have any new nodes / links, we should add them
  // this is going to be messy!!! maybe not so much!!! :D <3
  const mappedNodes = nextNodes.map((nextNode, index) => {
    const node = nodes.reduce((acc, n, i) =>
      nextNode.id === n.id ? n : acc ? null : acc);
    return node ? {
      id: node.id,
      fx: node.x,
      fy: node.y,
      index: index
    } : {
      id: nextNode.id,
      index: index
    };
  });

  const mappedLinks = nextLinks.map((nextLink, index) => {
    const link = links.reduce((acc, l, i) =>
      nextLink.source === l.source && nextLink.target === l.target ?
        l : acc ? null : acc);
    return link ? {
      ...link
    } : {
      ...nextLink
    };
  });

  const {
    width,
    height
  } = svgSize;

  const nodeRadius = rectRadius(nodeSize);

  return d3.forceSimulation(mappedNodes)
    .force('link', d3.forceLink(mappedLinks).id(d => d.id))
    .force('collide', d3.forceCollide(nodeRadius))
    .force('center', d3.forceCenter(width/2, height/2))
    .on('tick', onTick)
    .on('end', onEnd);
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
