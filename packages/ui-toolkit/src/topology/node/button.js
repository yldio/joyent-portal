import React from 'react';
import PropTypes from 'prop-types';
import Baseline from '../../baseline';
import Constants from '../constants';
import { GraphLine, GraphButtonRect, GraphButtonCircle } from './shapes';

const NodeButton = ({ connected, onButtonClick, index }) => {
  const { x, y, width, height } = Constants.buttonRect;

  const buttonCircleRadius = 2;
  const buttonCircleSpacing = 2;
  const buttonCircleY =
    (height - buttonCircleRadius * 4 - buttonCircleSpacing * 2) / 2;

  const buttonCircles = [1, 2, 3].map((item, index) => (
    <GraphButtonCircle
      cx={width / 2}
      cy={
        buttonCircleY + (buttonCircleRadius * 2 + buttonCircleSpacing) * index
      }
      key={index}
      r={2}
      connected={connected}
    />
  ));

  return (
    <g transform={`translate(${x}, ${y})`}>
      <GraphLine x1={0} y1={0} x2={0} y2={height} connected={connected} />
      <GraphButtonRect
        height={height}
        onClick={onButtonClick}
        onKeyDown={onButtonClick}
        width={width}
        role="button"
        tabIndex={100 + index}
      />
      {buttonCircles}
    </g>
  );
};

NodeButton.propTypes = {
  connected: PropTypes.bool,
  index: PropTypes.number.isRequired,
  onButtonClick: PropTypes.func.isRequired
};

export default Baseline(NodeButton);
