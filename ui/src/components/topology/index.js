const constants = require('../../shared/constants');
const React = require('react');
const Styled = require('styled-components');
const d3 = require('d3');

const {
  colors
} = constants;

const {
  default: styled
} = Styled;

/* eslint-disable */
function rightRoundedRect(x, y, width, height, radius) {
  return 'M' + x + ',' + y // Move to top left (absolute)
       + 'h ' + (width - 2 * radius) // Horizontal line to (relative)
       + 'a ' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + radius // Relative arc
       + 'v ' + (height - 2 * radius) // Vertical line to (relative)
       + 'a ' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + radius // Relative arch
       + 'h ' + (2 * radius - width) // Horizontal lint to (relative)
       + 'z '; // path back to start
}
/* eslint-enable */

/* eslint-disable */
function leftRoundedRect(x, y, width, height, radius) {
  return 'M' + (x + width) + ',' + y // Move to (absolute) start at top-right
       + 'v ' + height // Vertical line to (relative)
       + 'h ' + (2 * radius - width) // Horizontal line to (relative)
       + 'a ' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + -radius // Relative arc
       + 'v ' + -(height - 2 * radius) // Vertical line to (relative)
       + 'a ' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius // Relative arch
       + 'z '; // path back to start
}
/* eslint-enable */

function topRoundedRect(x, y, width, height, radius) {
  return 'M' + x + ',' + -(y - height) // Move to (absolute) start at bottom-left
       + 'v ' + -(height - radius) // Vertical line to (relative)
       + 'a ' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius // Relative arc
       + 'h ' + -(2 * radius  - width) // Horizontal line to (relative)
       + 'a ' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + radius // Relative arc
       + 'v ' + (height - radius) // Vertical line to (relative)
       + 'h ' + (2 * radius - width) // Horizontal line to (relative)
       + 'z '; // path back to start
}

function bottomRoundedRect(x, y, width, height, radius) {
  return 'M' + x + ',' + -(y - (height - 2 * radius)) // Move to (absolute) start at bottom-right
       + 'v ' + -(height - 2 * radius) // Vertical line to (relative)
       + 'h ' + (width) // Horizontal line to (relative)
       + 'v ' + (height - 2 * radius) // Vertical line to (relative)
       + 'a ' + -radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + radius // Relative arc
       + 'h ' + (2 * radius - width) // Horizontal line to (relative)
       + 'a ' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + -radius // Relative arc
       + 'z '; // path back to start
}

/* eslint-disable */
function rect(x, y, width, height) {
  return 'M' + x + ',' + -(y - height) // Move to (absolute) start at bottom-right
       + 'v ' + -(height) // Vertical line to (relative)
       + 'h ' + width // Horizontal line to (relative)
       + 'v ' + height // Vertical line to (relative)
       + 'h ' + -(width) // Horizontal line to (relative)
       + 'z '; // path back to start
}
/* eslint-enable */

const StyledSVGContainer = styled.svg`
  & {
    .links line {
      stroke: #343434;
      stroke-opacity: 1;
    }

    .health, .health_warn {
      font-family: "Libre Franklin";
      font-size: 12px;
      font-weight: bold;
      font-style: normal;
      font-stretch: normal;
      text-align: center;
    }

    .health_warn {
      font-size: 15px;
    }

    .stat {
      font-family: "Libre Franklin";
      font-size: 12px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.5;
    }

    .node_statistics {
      font-family: "Libre Franklin";
      font-size: 12px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.5;
    }

    .node_statistics p {
      margin: 0 0 0 0;
      color: rgba(255, 255, 255, 0.8);
    }

    .primary, .secondary {
      font-family: "Libre Franklin";
      font-size: 12px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.5;
    }

    .info_text {
      font-family: "Libre Franklin";
      font-size: 16px;
      font-weight: 600;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.5;
    }
  }
`;

class TopologyGraph extends React.Component {
  constructor(props) {
    super(props);

    this.svg = null;

    const {
      width,
      height,
    } = props;

    this.simulation = d3.forceSimulation()
      .force('charge', d3.forceManyBody()
        .strength(() => -50)
        .distanceMin(() => 30))
      .force('link', d3.forceLink().distance(() => 200).id((d) => d.id))
      // TODO manually handle looking for collisions in the tick, we then get the BBox
      // and keep moving things for a while to try to get a fit.
      .force('collide',
        d3.forceCollide().radius((d) => 220 + 0.5).iterations(15))
      .force('center', d3.forceCenter(width * 1/3, height * 1/3));
  }

  componentDidMount() {
    const component = this;

    const {
      simulation,
    } = this;

    const svg = d3.select(this._refs.svg);
    const {
      width,
      height,
      graph = {
        nodes: [],
        links: []
      },
    } = this.props;

    // Drawing the links between nodes
    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(graph.links)
      .enter().append('line')
        .attr('stroke-width', '2px');

    // And svg group, to contain all of the attributes in @antonas' first prototype
    svg.selectAll('.node')
      .data(graph.nodes)
      .enter()
      .append('g')
      .attr('class', 'node_group');

    svg.selectAll('.node_group').each(function(d) {
      // Create different type of node for services with Primaries + Secondaries
      // We could extend this further to allow us to have as many nested services
      // as wanted.
      // TODO handle this per prop
      // if (d.id === 'Percona') {
      //   createExtendedNode(d3.select(this));
      // } else {
      component.createServiceNodes(d, d3.select(this));
      // }
    });

    simulation
        .nodes(graph.nodes)
        .on('tick', ticked);

    simulation.force('link')
        .links(graph.links);

    function contrain(dimension, r, z) {
      return Math.max(0, Math.min(dimension - r, z));
    }

    function ticked() {
      // TODO: Think of a common way of extracting the bounding boxes for each
      // item and to grab the x{1,2} and y{1,2} values.
      link
        .attr('x1', function(d) {
          let x;
          svg.selectAll('.node_group').each(function(_, i) {
            if (i !== d.source.index) return;
            x = d3.select(this).node().getBBox().width;
          });
          return contrain(width, x, d.source.x) + 80;
        })
        .attr('y1', function(d) {
          let y;
          svg.selectAll('.node_group').each(function(_, i) {
            if (i !== d.source.index) return;
            y = d3.select(this).node().getBBox().height;
          });
          return contrain(height, y, d.source.y) + 24;
        })
        .attr('x2', function(d) {
          let x;
          svg.selectAll('.node_group').each(function(_, i) {
            if (i !== d.target.index) return;
            x = d3.select(this).node().getBBox().width;
          });
          return contrain(width, x, d.target.x) + 80;
        })
        .attr('y2', function(d) {
          let y;
          svg.selectAll('.node_group').each(function(_, i) {
            if (i !== d.target.index) return;
            y = d3.select(this).node().getBBox().height;
          });
          return contrain(height, y, d.target.y) + 24;
        });

      svg.selectAll('.node_group')
         .attr('transform', function(d) {
           const x = d3.select(this).node().getBBox().width;
           const y = d3.select(this).node().getBBox().height;
           return 'translate(' + contrain(width, x, d.x) + ','
             + contrain(height, y, d.y) + ')';
         });
    }
  }

  createHealthCheckBadge(element, x, y) {
    const paddingLeft = 30;
    const health = element.append('g');

    // TODO: replace these element with the designed SVG elements from
    // @antonasdeduchovas' designs with full svg elements.

    health.append('circle')
      .attr('class', 'alert')
      .attr('cx',  function() {
        return element
          .node()
          .getBBox()
          .width + paddingLeft;
      })
      .attr('cy', '24')
      .attr('stroke-width', '0px')
      .attr('fill', (d) =>
        d.id === 'Memcached' ? 'rgb(217, 77, 68)' : 'rgb(0,175,102)')
      .attr('r', '9px');

    // An icon or label that exists within the circle, inside the infobox
    health.append('text')
    .attr('class', 'health')
      .attr('x', function() {
        return element
          .node()
          .getBBox()
          .width + 3;
      })
      .attr('y', '29')
      .attr('text-anchor', 'middle')
      .attr('fill', colors.brandPrimaryColor)
      .text((d) => d.id === 'Memcached' ? '!' : '❤');
  }

  createServiceNodeBody(data, element, d) {
    const stats = element.append('g');
    stats.append('path')
    .attr('class', 'node')
      .attr('d', d)
      .attr('stroke', '#343434')
      .attr('stroke-width', '1px')
      .attr('fill', '#464646');

    const html = stats
      .append('switch')
      .append('foreignObject')
        .attr('requiredFeatures',
          'http://www.w3.org/TR/SVG11/feature#Extensibility')
        .attr('x', 12)
        .attr('y', 57)
        .attr('width', 160)
        .attr('height', 70)
        // From here everything will be rendered with react using a ref.
        // However for now these values are hard-coded.
      .append('xhtml:div')
        .attr('class', 'node_statistics');
        // Remove with react + dyanmic data.

    html.selectAll('.node_statistics').data(data.metrics).enter()
      .append('p')
        .text((d) => `${d.name}: ${d.stat}`);
  }

  createServiceNodes(data, elm) {
    const component = this;

    const {
      dragged,
      dragstarted,
      dragended,
    } = this;

    const width = 170;
    const topHeight = 47;
    const radius = 4;

    // Box where label will live
    elm.append('path')
    .attr('class', 'node')
      .attr('d', topRoundedRect('0', '0', width, topHeight, radius))
      .attr('stroke', colors.topologyBackground)
      .attr('stroke-width', '1px')
      .attr('fill', colors.brandSecondaryColor);

    const text = elm.append('g');

    text.append('text')
    .attr('class', 'info_text')
      .attr('x', '12')
      .attr('y', '30')
      .attr('text-anchor', 'start')
      .attr('fill', colors.brandPrimaryColor)
      .text(d => d.id);

    // if (service is registered twice in the scheduler) {
    //   Do not show healthcheck in the header
    // } else {
    this.createHealthCheckBadge(text);
    // }

    // if (service is registered twice in the scheduler) {
    //   this.createServiceNodeBody(data, elm, rect('0',`-${topHeight}`, width, 78, 4));
    // } else {
    this.createServiceNodeBody(data, elm,
      bottomRoundedRect('0', `-${topHeight}`, width, 78, 4));
    // }

    // <==== END ====>

    // Set up movement for service nodes
    elm.call(d3.drag()
            .on('start', dragstarted.bind(component))
            .on('drag', dragged.bind(component))
            .on('end', dragended.bind(component)));
  }


  dragstarted(d) {
    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  dragended(d) {
    if (!d3.event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  ref(name) {
    this._refs = this._refs || {};

    return (el) => {
      this._refs[name] = el;
    };
  }

  render() {
    return (
      <StyledSVGContainer
        innerRef={this.ref('svg')}
        {...this.props}
      />
    );
  }

}

TopologyGraph.propTypes = {
  graph: React.PropTypes.object,
  height: React.PropTypes.number,
  width: React.PropTypes.number,
};

module.exports = TopologyGraph;
