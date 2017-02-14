const React = require('react');
const Styled = require('styled-components');
const GraphSimulation = require('./graph-simulation');
const GraphNode = require('./graph-node');
const GraphLink = require('./graph-link');

const {
  default: styled
} = Styled;

const {
  createSimulation,
  updateSimulation
} = GraphSimulation;

const StyledSvg = styled.svg`
  width: 1024px;
  height: 860px;
  border: 1px solid #ff0000;
`;

const nodeSize = {
  width: 180,
  height: 156
};

const svgSize = {
  width: 1024,
  height: 860
};

class TopologyGraph extends React.Component {

  componentWillMount() {

    const {
      nodes,
      links
    } = this.props.data;

    const simulation = createSimulation(
      nodes,
      links,
      nodeSize,
      svgSize,
      () => this.forceUpdate(),
      () => this.forceUpdate()
    );

    const n = Math.ceil(
      Math.log(
        simulation.alphaMin()) / Math.log(
          1 - simulation.alphaDecay()));
    for (var i = 0; i < n; ++i) {
      simulation.tick();
    }

    this.setState({
      simulation: simulation
    });
  }

  componentWillReceiveProps(nextProps) {
    // either, we'll have more services
    // or, we'll have less services
    // or, data of services had changed =>
    //  do shallow check on objects and links, if no change, don't do rerender
    //  otherwise, redo them bitches = by what I mean to update the simulation
    //  try freezing exisiting ones... then adding another

    const {
      nodes: nextNodes,
      links: nextLinks
    } = nextProps.data;

    const {
      nodes,
      links
    } = this.props.data;

    // this is tmp for the compare above
    if(nextNodes.length !== nodes.length || nextLinks.length !== links.length) {
      const simulation = this.state.simulation;
      const nextSimulation = updateSimulation(
        simulation,
        nodes,
        links,
        nextNodes,
        nextLinks,
        nodeSize,
        svgSize,
        () => this.forceUpdate(),
        () => this.forceUpdate()
      );
      this.setState({
        simulation: nextSimulation
      });

      const n = Math.ceil(
        Math.log(
          nextSimulation.alphaMin()) / Math.log(
            1 - nextSimulation.alphaDecay())) - 200;
      for (var i = 0; i < n; ++i) {
        nextSimulation.tick();
      }
    }
  }

  render() {

    const {
      nodes,
      links
    } = this.props.data;

    const simulationNodes = this.state.simulation.nodes();

    const nodesData = nodes.map((node, index) => ({
      ...node,
      ...simulationNodes.reduce((acc, simNode, index) =>
        simNode.id === node.id ? simNode : acc)
    }));

    const linksData = links.map((link, index) => ({
      source: simulationNodes.reduce((acc, simNode, index) =>
        simNode.id === link.source ? simNode : acc),
      target: simulationNodes.reduce((acc, simNode, index) =>
        simNode.id === link.target ? simNode : acc)
    }));

    const renderedNodes = nodesData.map((n, index) => (
      <GraphNode
        key={index}
        data={n}
        index={index}
        size={nodeSize}
      />
    ));

    const renderedLinks = linksData.map((l, index) => (
      <GraphLink
        key={index}
        data={l}
        index={index}
        nodeSize={nodeSize}
      />
    ));

    return (
      <StyledSvg>
        <g>
          {renderedNodes}
        </g>
        <g>
          {renderedLinks}
        </g>
      </StyledSvg>
    );
  }
}

TopologyGraph.propTypes = {
  data: React.PropTypes.shape({
    nodes: React.PropTypes.array,
    links: React.PropTypes.array
  })
};

module.exports = TopologyGraph;
