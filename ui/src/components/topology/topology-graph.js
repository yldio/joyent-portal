const React = require('react');
const d3 = require('d3');
const Styled = require('styled-components');
const GraphNode = require('./graph-node');
const GraphLink = require('./graph-link');

const {
  default: styled
} = Styled;

const StyledSvg = styled.svg`
  width: 1024px;
  height: 860px;
  border: 1px solid #ff0000;
`;

/*const nodeSize = {
  width: 180,
  height: 156
};*/

const mapData = (data, withIndex=false) => {
  return data.map((d, index) => {
    const r = {
      ...d
    };
    if(withIndex) {
      r.index = index;
    }
    return r;
  });
};

class TopologyGraph extends React.Component {

  componentWillMount() {

    const {
      data,
      nodeSize
    } = this.props;

    this.setState(
      this.createSimulation(data, nodeSize)
    );
  }

  componentWillReceiveProps(nextProps) {
    const {
      data,
      nodeSize
    } = nextProps;

    this.setState(
      this.createSimulation(data, nodeSize)
    );
  }

  createSimulation(data, nodeSize) {

    const dataNodes = mapData(data.nodes, true);
    const dataLinks = mapData(data.links);

    const {
      width,
      height
    } = nodeSize;
    const nodeRadius = Math.round(Math.sqrt(width*width + height*height)/2);
    // const linkDistance = nodeRadius*2 + 20;
    // console.log('nodeRadius = ', nodeRadius);
    // console.log('linkDistance = ', linkDistance);
    const simulation = d3.forceSimulation(dataNodes)
      .force('charge', d3.forceManyBody())
      .force('link', d3.forceLink(dataLinks)
        /*.distance(() => linkDistance)*/
        .id(d => d.id))
      .force('collide', d3.forceCollide(nodeRadius))
      .force('center', d3.forceCenter(1024/2, 860/2))
      .on('tick', () => {
        this.forceUpdate();
      })
      .on('end', () => {
        // console.log('SIMULATION END');
      });

    return {
      dataNodes,
      dataLinks,
      simulation
    };
  }

  renderNodes(nodeSize) {
    return this.state.dataNodes.map((n, index) => (
      <GraphNode
        key={index}
        data={n}
        index={index}
        size={nodeSize}
      />
    ));
  }

  renderLinks(nodeSize) {
    return this.state.dataLinks.map((l, index) => (
      <GraphLink
        key={index}
        data={l}
        index={index}
        nodeSize={nodeSize}
      />
    ));
  }

  render() {
    const {
      nodeSize
    } = this.props;

    return (
      <StyledSvg>
        <g>
          {this.renderNodes(nodeSize)}
        </g>
        <g>
          {this.renderLinks(nodeSize)}
        </g>
      </StyledSvg>
    );
  }
}

TopologyGraph.propTypes = {
  data: React.PropTypes.shape({
    nodes: React.PropTypes.array,
    links: React.PropTypes.array
  }),
  nodeSize: React.PropTypes.shape({
    width: React.PropTypes.number,
    height: React.PropTypes.number
  })
};

module.exports = TopologyGraph;
