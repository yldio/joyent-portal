const React = require('react');
const composers = require('../../shared/composers');
const Styled = require('styled-components');

const {
  default: styled
} = Styled;

const {
  Baseline
} = composers;

const StyledButton = styled.rect`
  opacity: 0;
  cursor: pointer;
`;

const StyledButtonCircle = styled.circle`
  fill: white;
`;

const GraphNodeButton = ({
  buttonRect,
  onButtonClick
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
    />
  ));

  return (
    <g transform={`translate(${buttonRect.x}, ${buttonRect.y})`}>
      <StyledButton
        height={buttonRect.height}
        onClick={onButtonClick}
        width={buttonRect.width}
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
  onButtonClick: React.PropTypes.func.isRequired
};

module.exports = Baseline(
  GraphNodeButton
);
