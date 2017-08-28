import React from 'react';
import PropTypes from 'prop-types';
import Constants from '../constants';
import { getContentRect } from '../functions';
import GraphNodeTitle from './title';
import GraphNodeButton from './button';
import GraphNodeContent from './content';
import { GraphNodeRect, GraphShadowRect } from './shapes';
import Baseline from '../../baseline';

const GraphNode = ({
  data,
  index,
  onDragStart,
  onNodeTitleClick,
  onQuickActions
}) => {
  const { left, top, width, height } = data.nodeRect;
  const { connected, id, children, instancesActive, isConsul } = data;

  let x = data.x;
  let y = data.y;

  if (connected) {
    x = data.x + left;
    y = data.y + top;
  }

  const onButtonClick = evt => {
    const tooltipPosition = {
      x: data.x + Constants.buttonRect.x + Constants.buttonRect.width / 2,
      y: data.y + Constants.buttonRect.y + Constants.buttonRect.height
    };

    if (connected) {
      tooltipPosition.x += left;
      tooltipPosition.y += top;
    }

    const d = {
      service: data,
      position: {
        left: tooltipPosition.x,
        top: tooltipPosition.y
      }
    };

    onQuickActions(evt, d);
  };

  const onTitleClick = evt => onNodeTitleClick(evt, { service: data });

  const onStart = evt => {
    evt.preventDefault();
    onDragStart(evt, id);
  };

  const nodeRectEvents = connected
    ? {
        onMouseDown: onStart,
        onTouchStart: onStart
      }
    : {};

  const nodeContent = children ? (
    children.reduce(
      (acc, d, i) => {
        acc.children.push(
          <GraphNodeContent key={i} child data={d} index={i} y={acc.y} />
        );
        acc.y += getContentRect(d, true).height;
        return acc;
      },
      { y: Constants.contentRect.y, children: [] }
    ).children
  ) : (
    <GraphNodeContent data={data} />
  );

  const nodeShadow = instancesActive ? (
    <GraphShadowRect
      x={0}
      y={3}
      width={width}
      height={height}
      consul={isConsul}
      active={instancesActive}
    />
  ) : null;

  return (
    <g transform={`translate(${x}, ${y})`}>
      {nodeShadow}
      <GraphNodeRect
        x={0}
        y={0}
        width={width}
        height={height}
        consul={isConsul}
        active={instancesActive}
        connected={connected}
        {...nodeRectEvents}
      />
      <GraphNodeTitle data={data} onNodeTitleClick={onTitleClick} />
      <GraphNodeButton
        index={index}
        onButtonClick={onButtonClick}
        isConsul={isConsul}
        instancesActive={instancesActive}
      />
      {nodeContent}
    </g>
  );
};

GraphNode.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onDragStart: PropTypes.func,
  onNodeTitleClick: PropTypes.func,
  onQuickActions: PropTypes.func
};

export default Baseline(GraphNode);
