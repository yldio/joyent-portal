import React from 'react';
import { Svg } from 'normalized-styled-components';
import PropTypes from 'prop-types';
import difference from 'lodash.difference';
import differenceBy from 'lodash.differenceby';

import Baseline from '../baseline';
import Constants from './constants';
import { createSimulation } from './simulation';
import TopologyNode from './node';
import TopologyLink from './link';
import TopologyLinkArrow from './link/arrow';
import { getNodeRect, calculateLineLayout } from './functions';

const StyledSvg = Svg.extend`
  width: 100%;
  height: 1000px;
`;

/**
 * @example ./usage.md
 */
class Topology extends React.Component {
  componentWillMount() {
    this.create(this.props);
  }

  componentDidMount() {
    this.boundResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.boundResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.boundResize);
  }

  shouldComponentUpdate() {
    return false;
  }

  getChangedConnections(services, nextServices) {
    return nextServices.reduce((changed, nextService) => {
      if(changed.added || changed.removed) {
        return changed;
      }
      const service = services.filter(service => service.id === nextService.id).shift();
      const connectionsAdded = difference(nextService.connections, service.connections).length;
      // there's a new connection, we need to redraw
      if(connectionsAdded) {
        return ({ added: true });
      }
      const connectionsRemoved = difference(service.connections, nextService.connections).length;
      // we'll need to remove the offending connections from links
      if(connectionsRemoved) {
        return ({ removed: true});
      }
      return changed;
    }, {});
  }

  getNextLinks(nextServices) {
    const links = this.state.links;
    return links.reduce((nextLinks, link) => {
      const sourceExists = nextServices.filter(nextService =>
        nextService.id === link.source.id);
      if(sourceExists.length) {
        const source = sourceExists.shift();
        const targetExists = nextServices.filter(nextService =>
          nextService.id === link.target.id).length;
        const connectionExists = source.connections.filter(connection =>
          connection === link.target.id).length;
        if(targetExists && connectionExists) {
          nextLinks.push(link);
        }
      }
      return nextLinks;
    }, []);
  }

  getNextNodes(nextServices) {
    const nodes = this.state.nodes;
    let notConnectedX = 0;
    return nodes.reduce((nextNodes, node) => {
      const keep = nextServices.filter(nextService => nextService.id === node.id).length;
      if(keep) {
        nextNodes.push(node);
      }
      return nextNodes;
    }, []);
  }

  componentWillReceiveProps(nextProps) {
    // if we remove a node, it should just be removed from the simulation nodes and links
    // if we add a node, then we should recreate the damn thing
    // on other updates, we should update the services on the state and that's it
    // we should forceUpdate once the state has been updated
    const nextServices = nextProps.services.sort();
    const connectedNextServices = nextServices.filter(service => service.connected);
    const notConnectedNextServices = nextServices.filter(service => !service.connected);

    const { services, nodes } = this.state;
    if(nextServices.length > services.length) {
      // new service added, we need to redraw
      this.create(nextProps);
    }
    else if(nextServices.length <= services.length) {

      const servicesRemoved = differenceBy(services, nextServices, 'id');
      const servicesChanged = differenceBy(nextServices, services, 'id');
      if(servicesChanged.length ||
        servicesRemoved.length !== services.length - nextServices.length) {
          this.create(nextProps);
      }
      else {
        // check whether there are new connections. if so, we need to redraw
        // if we just dropped one, we need to remove it from links
        // comparison to yield 3 possible outcomes; no change, added, dropped
        const changedConnections = this.getChangedConnections(services, nextServices);
        // if connections are added, we'll need to redraw
        if(changedConnections.added) {
          this.create(nextProps);
        }
        else if(servicesRemoved.length || changedConnections.removed) {

          const nextNodes = this.getNextNodes(connectedNextServices);
          const notConnectedNodes = this.getNotConnectedNodes(notConnectedNextServices);
          const nextLinks = this.getNextLinks(nextServices);

          this.setState({
            services: nextServices,
            links: nextLinks,
            nodes: nextNodes,
            notConnectedNodes
          }, () => this.forceUpdate());
        }
        else {
          // we've got the same services, no links changed, so we just need to set them to the state
          this.setState({ services: nextServices }, () => this.forceUpdate());
        }
      }
    }
  }

  getNotConnectedNodes(notConnectedServices) {
    return notConnectedServices.map((notConnectedService, index) => {
      const svgSize = this.getSvgSize();
      const x = notConnectedService.isConsul
        ? svgSize.width - Constants.nodeSize.width
        : (Constants.nodeSize.width + 10)*index;

      return ({
        id: notConnectedService.id,
        x,
        y: 0
      })
    });
  }

  handleResize(evt) {
    this.create(this.props);
    // resize should just rejig the positions
  }

  create(props) {
    // other updates should also just update the services rather than recreate the simulation
    const services = props.services.sort();
    const connectedServices = services.filter(service => service.connected);
    const notConnectedServices = services.filter(service => !service.connected);
    const svgSize = this.getSvgSize();

    const { nodes, links, simulation } = createSimulation(connectedServices, svgSize);
    const notConnectedNodes = this.getNotConnectedNodes(notConnectedServices);

    this.setState({
      notConnectedNodes,
      nodes,
      links,
      simulation,
      services
    }, () => {
      this.forceUpdate();
    });
  }

  getSvgSize() {
    if (document.getElementById('topology-svg')) {
      return document.getElementById('topology-svg').getBoundingClientRect();
    }

    const windowWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    return {
      width: windowWidth - 2 * 24,
      height: 1000
    };
  }

  constrainNodePosition(x, y, children = false) {
    const svgSize = this.getSvgSize();

    const nodeRect = children
      ? Constants.nodeRectWithChildren
      : Constants.nodeRect;

    if (x < nodeRect.right + 2) {
      x = nodeRect.right + 2;
    } else if (x > svgSize.width + nodeRect.left - 2) {
      x = svgSize.width + nodeRect.left - 2;
    }

    if (y < -nodeRect.top + 2) {
      y = -nodeRect.top + 2;
    } else if (y > svgSize.height - nodeRect.bottom - 2) {
      y = svgSize.height - nodeRect.bottom - 2;
    }

    return {
      x,
      y
    };
  }

  findNode(nodeId) {
    return this.state.nodes.reduce(
      (acc, simNode, index) => (simNode.id === nodeId ? simNode : acc),
      {}
    );
  }

  getConstrainedNodePosition(nodeId, children = false) {
    const node = this.findNode(nodeId);
    return this.constrainNodePosition(node.x, node.y, children);
  }

  getNotConnectedNodePosition(nodeId) {
    return this.state.notConnectedNodes.filter(ncn =>
      ncn.id === nodeId).shift();
  }

  findNodeData(nodesData, nodeId) {
    return nodesData.filter(nodeData => nodeData.id === nodeId).shift();
  }

  setDragInfo(dragging, nodeId = null, position = {}) {
    this.dragInfo = {
      dragging,
      nodeId,
      position
    };
  }

  render() {
    const { onQuickActionsClick, onNodeTitleClick } = this.props;

    const { nodes, links, services } = this.state;

    const nodesData = services.map((service, index) => {
      const nodePosition = service.connected
        ? this.getConstrainedNodePosition(service.id, service.children)
        : this.getNotConnectedNodePosition(service.id);

      const nodeRect = getNodeRect(service);

      return {
        ...service,
        ...nodePosition,
        nodeRect
      };
    });

    // TODO links will need to know whether a service has children
    // if it does, the height of it will be different
    const linksData = links
      .map((link, index) => ({
        source: this.findNodeData(nodesData, link.source.id),
        target: this.findNodeData(nodesData, link.target.id)
      }))
      .map((linkData, index) => {
        return calculateLineLayout(linkData, index)
      });

    const onDragStart = (evt, nodeId) => {
      // It's this node's position that we'll need to update

      const x = evt.changedTouches ? evt.changedTouches[0].pageX : evt.clientX;
      const y = evt.changedTouches ? evt.changedTouches[0].pageY : evt.clientY;

      this.setDragInfo(true, nodeId, {
        x,
        y
      });
    };

    const onDragMove = evt => {
      if (this.dragInfo && this.dragInfo.dragging) {
        const x = evt.changedTouches
          ? evt.changedTouches[0].pageX
          : evt.clientX;
        const y = evt.changedTouches
          ? evt.changedTouches[0].pageY
          : evt.clientY;

        const offset = {
          x: x - this.dragInfo.position.x,
          y: y - this.dragInfo.position.y
        };

        const dragNodes = nodes.map((simNode, index) => {
          if (simNode.id === this.dragInfo.nodeId) {
            return {
              ...simNode,
              x: simNode.x + offset.x,
              y: simNode.y + offset.y
            };
          }
          return {
            ...simNode
          };
        });

        this.setState({
          nodes: dragNodes
        }, () => this.forceUpdate());

        this.setDragInfo(true, this.dragInfo.nodeId, {
          x,
          y
        });
      }
    };

    const onDragEnd = evt => {
      this.setDragInfo(false);
    };

    const renderedNode = (n, index) =>
      <TopologyNode
        key={index}
        data={n}
        index={index}
        onDragStart={onDragStart}
        onNodeTitleClick={onNodeTitleClick}
        onQuickActions={onQuickActionsClick}
      />;

    const renderedLink = (l, index) =>
      <TopologyLink key={index} data={l} index={index} />;

    const renderedLinkArrow = (l, index) =>
      <TopologyLinkArrow key={index} data={l} index={index} />;

    const renderedNodes = this.dragInfo && this.dragInfo.dragging
      ? nodesData
          .filter((n, index) => n.id !== this.dragInfo.nodeId)
          .map((n, index) => renderedNode(n, index))
      : nodesData.map((n, index) => renderedNode(n, index));

    const renderedLinks = linksData.map((l, index) => renderedLink(l, index));

    const renderedLinkArrows = this.dragInfo && this.dragInfo.dragging
      ? linksData
          .filter((l, index) => l.target.id !== this.dragInfo.nodeId)
          .map((l, index) => renderedLinkArrow(l, index))
      : linksData.map((l, index) => renderedLinkArrow(l, index));

    const dragNode = !this.dragInfo || !this.dragInfo.dragging
      ? null
      : renderedNode(
          nodesData.reduce((dragNode, n, index) => {
            if (n.id === this.dragInfo.nodeId) {
              return n;
            }
            return dragNode;
          }, {})
        );

    const dragLinkArrow = !this.dragInfo ||
      !this.dragInfo.dragging ||
      renderedLinkArrows.length === renderedLinks.length
      ? null
      : renderedLinkArrow(
          linksData.reduce((dragLinkArrow, l, index) => {
            if (l.target.id === this.dragInfo.nodeId) {
              return l;
            }
            return dragLinkArrow;
          }, {})
        );

    return (
      <StyledSvg
        onMouseMove={onDragMove}
        onTouchMove={onDragMove}
        onMouseUp={onDragEnd}
        onTouchEnd={onDragEnd}
        onTouchCancel={onDragEnd}
        id="topology-svg"
      >
        <g>
          {renderedNodes}
        </g>
        <g>
          {renderedLinks}
        </g>
        <g>
          {renderedLinkArrows}
        </g>
        <g>
          {dragNode}
        </g>
        <g>
          {dragLinkArrow}
        </g>
      </StyledSvg>
    );
  }
}

Topology.propTypes = {
  onQuickActionsClick: PropTypes.func,
  onNodeTitleClick: PropTypes.func,
  services: PropTypes.array
};

export default Baseline(Topology);

export { default as TopologyNode } from './node';
export { default as TopologyLink } from './link';
