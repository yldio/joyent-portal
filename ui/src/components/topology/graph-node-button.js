import React from 'react';
import { Baseline } from '../../shared/composers';
import { colors } from '../../shared/constants';
import styled from 'styled-components';

const StyledButton = styled.rect`
  opacity: 0;
  cursor: pointer;
`;

const StyledButtonCircle = styled.circle`
  fill: ${props => props.connected ? colors.base.white : colors.base.secondary};
`;

const GraphNodeButton = ({
  connected,
  buttonRect,
  onButtonClick,
  index
}) => {

  const buttonCircleRadius = 2;
  const buttonCircleSpacing = 2;
  const buttonCircleY =
    (buttonRect.height - buttonCircleRadius*4 - buttonCircleSpacing*2)/2;
  const buttonCircles = [1,2,3].map((item, index) => (
    <StyledButtonCircle
      cx={buttonRect.width/2}
      cy={buttonCircleY + (buttonCircleRadius*2 + buttonCircleSpacing)*index}
      key={index}
      r={2}
      connected={connected}
    />
  ));

  return (
    <g transform={`translate(${buttonRect.x}, ${buttonRect.y})`}>
      <StyledButton
        height={buttonRect.height}
        onClick={onButtonClick}
        onKeyDown={onButtonClick}
        width={buttonRect.width}
        role='button'
        tabIndex={100 + index}
      />
      {buttonCircles}
    </g>
  );
};

GraphNodeButton.propTypes = {
  buttonRect: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number
  }).isRequired,
  connected: React.PropTypes.bool,
  index: React.PropTypes.number.isRequired,
  onButtonClick: React.PropTypes.func.isRequired
};

export default Baseline(
  GraphNodeButton
);
