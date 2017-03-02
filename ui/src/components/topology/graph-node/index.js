import React from 'react';
import { Baseline } from '../../../shared/composers';
import Constants from '../constants';
import GraphNodeTitle from './title';
import GraphNodeButton from './button';
import GraphNodeContent from './content';
import {
    GraphNodeRect,
    GraphShadowRect
} from './shapes';

const GraphNode = ({
  connected,
  data,
  index,
  onDragStart
}) => {

  const {
    width,
    height
  } = data.children ?
    Constants.nodeSizeWithChildren :
    Constants.nodeSize;

  const halfWidth = width/2;
  const halfHeight = height/2;

  let x = 0;
  let y = 0;
  if(connected) {
    x = data.x-halfWidth;
    y = data.y-halfHeight;
  }

  const onButtonClick = (evt) => {
    // console.log('Rect clicked!!!');
  };

  const onStart = (evt) => {
    evt.preventDefault();
    onDragStart(evt, data.id);
  };

  const nodeRectEvents = connected ? {
    onMouseDown: onStart,
    onTouchStart: onStart
  } : {};

  const nodeContent = data.children ?
    data.children.map((d, i) => (
      <GraphNodeContent
        key={i}
        child
        connected={connected}
        data={d}
        index={i}
      />
    )) : (
      <GraphNodeContent
        connected={connected}
        data={data}
      />
    );

  return (
    <g transform={`translate(${x}, ${y})`}>
      <GraphShadowRect
        x={0}
        y={3}
        width={width}
        height={height}
        connected={connected}
      />
      <GraphNodeRect
        x={0}
        y={0}
        width={width}
        height={height}
        connected={connected}
        {...nodeRectEvents}
      />
      <GraphNodeTitle
        connected={connected}
        data={data}
      />
      <GraphNodeButton
        connected={connected}
        index={index}
        onButtonClick={onButtonClick}
      />
      {nodeContent}
    </g>
  );
};

GraphNode.propTypes = {
  connected: React.PropTypes.bool,
  data: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  onDragStart: React.PropTypes.func
};

export default Baseline(
  GraphNode
);
