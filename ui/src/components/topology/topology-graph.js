import styled from 'styled-components';
import { Baseline } from '../../shared/composers';
import { createSimulation, updateSimulation } from './graph-simulation';
import GraphNode from './graph-node';
import GraphLink from './graph-link';
import React from 'react';

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

let dragInfo = {
  dragging: false,
  nodeId: null,
  position: null
};

class TopologyGraph extends React.Component {
  componentWillMount() {
    const services = this.props.services;

    const simulationData = createSimulation(
      services,
      nodeSize,
      svgSize//,
      //() => this.forceUpdate(),
      //() => this.forceUpdate()
    );

    const simulation = simulationData.simulation;

    const n = Math.ceil(
      Math.log(
        simulation.alphaMin()) / Math.log(
          1 - simulation.alphaDecay()));
    for (var i = 0; i < n; ++i) {
      simulation.tick();
    }

    this.setState(simulationData);
  }

  componentWillReceiveProps(nextProps) {
    // either, we'll have more services
    // or, we'll have less services
    // or, data of services had changed =>
    //  do shallow check on objects and links, if no change, don't do rerender
    //  otherwise, redo them bitches = by what I mean to update the simulation
    //  try freezing exisiting ones... then adding another

    const {
      nodes,
      links
    } = this.state;

    const services = nextProps.services;
    // TODO this here means we'll need to evaluate whether to we have more links!

    // this is tmp for the compare above
    if(services !== nodes.length) {
      const simulation = this.state.simulation;
      const nextSimulationData = updateSimulation(
        simulation,
        services,
        nodes,
        links,
        nodeSize,
        svgSize,
        () => this.forceUpdate(),
        () => this.forceUpdate()
      );

      const nextSimulation = nextSimulationData.simulation;
      // console.log('nextSimulationData.nodes = ', nextSimulationData.nodes);

      const n = Math.ceil(
        Math.log(
          nextSimulation.alphaMin()) / Math.log(
            1 - nextSimulation.alphaDecay())) - 200;
      for (var i = 0; i < n; ++i) {
        nextSimulation.tick();
      }

      //this.state.simulation.nodes().forEach((node, index) => {
      //  delete node.fx;
      //  delete node.fy;
      //});

      this.setState(nextSimulationData);
    }
  }

  render() {

    const services = this.props.services;

    const {
      nodes,
      links
    } = this.state;

    const node = (nodeId) =>
      nodes.reduce((acc, simNode, index) => {
        return simNode.id === nodeId ? simNode : acc;
      }, {});

    const nodesData = services.map((service, index) => ({
      ...service,
      ...node(service.uuid)
    }));

    const linksData = links.map((link, index) => ({
      source: node(link.source.id),
      target: node(link.target.id)
    }));

    const onDragStart = (evt, nodeId) => {
      // it's this node's position that we'll need to update
      dragInfo.dragging = true;
      dragInfo.nodeId = nodeId;
      if(evt.changedTouches) {
        dragInfo.position = {
          x: evt.changedTouches[0].pageX,
          y: evt.changedTouches[0].pageY
        };
      }
      else {
        dragInfo.position = {
          x: evt.clientX,
          y: evt.clientY
        };
      }
    };

    const onDragMove = (evt) => {

      if(dragInfo.dragging) {

        let offset = {};
        if(evt.changedTouches) {
          offset = {
            x: evt.changedTouches[0].pageX - dragInfo.position.x,
            y: evt.changedTouches[0].pageY - dragInfo.position.y
          };
        }
        else {
          offset = {
            x: evt.clientX - dragInfo.position.x,
            y: evt.clientY - dragInfo.position.y
          };
        }

        const dragNodes = nodes.map((simNode, index) => {
          if(simNode.id === dragInfo.nodeId) {
            return ({
              ...simNode,
              x: simNode.x + offset.x,
              y: simNode.y + offset.y
            });
          }
          return ({
            ...simNode
          });
        });

        this.setState({
          nodes: dragNodes
        });

        if(evt.changedTouches) {
          dragInfo.position = {
            x: evt.changedTouches[0].pageX,
            y: evt.changedTouches[0].pageY
          };
        }
        else {
          dragInfo.position = {
            x: evt.clientX,
            y: evt.clientY
          };
        }
      }
    };

    const onDragEnd = (evt) => {
      dragInfo = {
        dragging: false,
        nodeId: null,
        position: null
      };
    };

    const renderedNodes = nodesData.map((n, index) => (
      <GraphNode
        key={index}
        data={n}
        index={index}
        size={nodeSize}
        onDragStart={onDragStart}
        connected
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
      <StyledSvg
        onMouseMove={onDragMove}
        onTouchMove={onDragMove}
        onMouseUp={onDragEnd}
        onTouchEnd={onDragEnd}
        onTouchCancel={onDragEnd}
      >
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
  services: React.PropTypes.array
};

export default Baseline(
  TopologyGraph
);
