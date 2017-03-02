import React from 'react';
import { Baseline } from '../../../shared/composers';
import Constants from '../constants';
import { GraphLine, GraphButtonRect, GraphButtonCircle } from './shapes';

const GraphNodeButton = ({
  connected,
  onButtonClick,
  index
}) => {

  const {
    x,
    y,
    width,
    height
  } = Constants.buttonRect;

  const buttonCircleRadius = 2;
  const buttonCircleSpacing = 2;
  const buttonCircleY =
    (height - buttonCircleRadius*4 - buttonCircleSpacing*2)/2;
  const buttonCircles = [1,2,3].map((item, index) => (
    <GraphButtonCircle
      cx={width/2}
      cy={buttonCircleY + (buttonCircleRadius*2 + buttonCircleSpacing)*index}
      key={index}
      r={2}
      connected={connected}
    />
  ));

  return (
    <g transform={`translate(${x}, ${y})`}>
      <GraphLine
        x1={0}
        y1={0}
        x2={0}
        y2={height}
        connected={connected}
      />
      <GraphButtonRect
        height={height}
        onClick={onButtonClick}
        onKeyDown={onButtonClick}
        width={width}
        role='button'
        tabIndex={100 + index}
      />
      {buttonCircles}
    </g>
  );
};

GraphNodeButton.propTypes = {
  connected: React.PropTypes.bool,
  index: React.PropTypes.number.isRequired,
  onButtonClick: React.PropTypes.func.isRequired
};

export default Baseline(
  GraphNodeButton
);
